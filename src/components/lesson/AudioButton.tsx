"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Square, Loader2, Mic2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  title: string;
  className?: string;
}

// Male voice name patterns across Vietnamese TTS providers
const MALE_PATTERNS = [
  /\bnam\b/i,
  /\bmale\b/i,
  /\bman\b/i,
  /standard-b/i,
  /standard-d/i,
  /wavenet-b/i,
  /wavenet-d/i,
  /neural-b/i,
  /neural-d/i,
  /huy/i,
  /hieu/i,
  /quang/i,
  /minh/i,
];

const FEMALE_HINTS = [/female/i, /\bnu\b/i, /linh/i, /hoai/i, /lan/i];

/**
 * Score a voice for our use case — higher = better.
 * Prefer: Vietnamese > male > enhanced/neural > default.
 */
function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name.toLowerCase();
  if (v.lang?.toLowerCase().startsWith("vi")) score += 100;
  if (MALE_PATTERNS.some((p) => p.test(v.name))) score += 50;
  if (FEMALE_HINTS.some((p) => p.test(v.name))) score -= 20;
  if (/enhanced|premium|neural|wavenet/i.test(name)) score += 25;
  if (v.default) score += 5;
  return score;
}

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;
  return [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}

/**
 * Pre-process Vietnamese text for warmer, more expressive reading:
 * - Expand abbreviations so TTS reads them naturally
 * - Inject short pauses (commas/ellipses) between clauses
 * - Split very long sentences into shorter phrases
 * - Normalize numbers and ranges
 */
function preprocess(raw: string): string {
  return raw
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/mmol\/L/gi, "mi-mon trên lít")
    .replace(/HbA1c/gi, "Hê bê a một xê")
    .replace(/type\s*2/gi, "tuýp hai")
    .replace(/type\s*1/gi, "tuýp một")
    .replace(/\b(\d+)\s*[–-]\s*(\d+)\b/g, "$1 đến $2")
    // Inject micro-pauses before transition words (sounds more like a presenter)
    .replace(/\s(và|nhưng|tuy nhiên|hơn nữa|đặc biệt|vì vậy|do đó|ngoài ra|tiếp theo)\b/gi, ", $1")
    // Longer pause after attention-grabbing openings
    .replace(/^(Cô chú|Hãy|Bây giờ|Đầu tiên|Tiếp theo|Cuối cùng)/gm, "$1, ")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .trim();
}

/**
 * Split text into phrase-level chunks (sentences + comma clauses)
 * so the engine produces natural breath/pause cadence rather than a flat read.
 */
function splitIntoChunks(text: string, maxLen = 140): string[] {
  // First split by sentences
  const sentences = text.split(/(?<=[.!?:])\s+/).map((s) => s.trim()).filter(Boolean);

  const chunks: string[] = [];
  for (const sentence of sentences) {
    if (sentence.length <= maxLen) {
      chunks.push(sentence);
      continue;
    }
    // For long sentences, split by comma; recombine to <= maxLen
    const parts = sentence.split(/,\s+/).map((p) => p.trim()).filter(Boolean);
    let buf = "";
    for (const part of parts) {
      const joined = buf ? buf + ", " + part : part;
      if (joined.length > maxLen && buf) {
        chunks.push(buf + (buf.endsWith(",") ? "" : ","));
        buf = part;
      } else {
        buf = joined;
      }
    }
    if (buf) chunks.push(buf);
  }
  return chunks;
}

export function AudioButton({ text, title, className }: Props) {
  const [supported, setSupported] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showVoicePicker, setShowVoicePicker] = useState(false);

  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);
  const elapsedBeforePauseRef = useRef<number>(0);
  const chunksRef = useRef<string[]>([]);
  const chunkIdxRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const vi = all.filter((v) => v.lang?.toLowerCase().startsWith("vi"));
      setVoices(vi.length > 0 ? vi : all);
      setVoice(pickBestVoice(all));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const clean = preprocess(text);
    // Vietnamese reading at ~140 wpm × ~5 chars/word ≈ 700 chars/min → ~11.5 chars/sec
    setDuration(Math.max(8, Math.round(clean.length / 11.5)));
  }, [text]);

  const startTimer = () => {
    startedAtRef.current = Date.now();
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startedAtRef.current) / 1000 + elapsedBeforePauseRef.current;
      setProgress(Math.min(99, (elapsed / Math.max(duration, 1)) * 100));
    }, 200);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const speakChunk = (idx: number) => {
    const chunk = chunksRef.current[idx];
    if (!chunk) {
      setPlaying(false);
      setPaused(false);
      setProgress(100);
      stopTimer();
      setTimeout(() => setProgress(0), 700);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunk);
    if (voice) utterance.voice = voice;
    utterance.lang = "vi-VN";

    // Per-chunk subtle pitch & rate variation so the read sounds less robotic.
    // Sentences ending with "?" lift slightly. Statements get a warm low pitch.
    const isQuestion = chunk.endsWith("?");
    const isStrong = /^(Cô chú|Hãy|Quan trọng|Lưu ý)/i.test(chunk);
    const wave = Math.sin(idx * 0.7) * 0.04; // ±0.04 per chunk

    utterance.rate = isStrong ? 0.83 : 0.88;           // slower for emphasis lines
    utterance.pitch = isQuestion ? 0.96 + wave : 0.88 + wave; // questions rise; rest stays warm/low
    utterance.volume = 1.0;

    utterance.onstart = () => {
      if (idx === 0) {
        setLoading(false);
        setPlaying(true);
        setPaused(false);
        elapsedBeforePauseRef.current = 0;
        startTimer();
      }
    };

    utterance.onend = () => {
      chunkIdxRef.current = idx + 1;
      // Small breath between sentences for natural cadence
      const breath = chunk.match(/[.!?:]$/) ? 220 : 120;
      window.setTimeout(() => speakChunk(idx + 1), breath);
    };

    utterance.onerror = () => {
      setPlaying(false);
      setPaused(false);
      setLoading(false);
      stopTimer();
      setProgress(0);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (!supported) return;
    setLoading(true);
    window.speechSynthesis.cancel();

    const processed = preprocess(text);
    chunksRef.current = splitIntoChunks(processed, 140);
    chunkIdxRef.current = 0;

    speakChunk(0);
  };

  const handlePauseResume = () => {
    if (!supported) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      startTimer();
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
      stopTimer();
      elapsedBeforePauseRef.current += (Date.now() - startedAtRef.current) / 1000;
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
    setPaused(false);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    chunkIdxRef.current = 0;
    stopTimer();
  };

  if (!supported) {
    return (
      <div className={cn("text-xs text-muted italic", className)}>
        Trình duyệt này không hỗ trợ đọc giọng nói
      </div>
    );
  }

  // Classify current voice for friendly label
  const voiceLabel = voice
    ? MALE_PATTERNS.some((p) => p.test(voice.name))
      ? "Giọng nam"
      : "Giọng đọc"
    : "Chưa có giọng";

  return (
    <div className={cn("inline-flex items-center gap-2 no-print flex-wrap", className)}>
      <div
        className={cn(
          "inline-flex items-center gap-3 px-2 py-1.5 rounded-full border border-heading/12 bg-white shadow-soft transition-all",
          playing && "border-primary/40 shadow-card"
        )}
        role="group"
        aria-label={`Nghe bài: ${title}`}
      >
        {!playing ? (
          <button
            onClick={handlePlay}
            disabled={loading}
            className="flex items-center gap-2 min-h-[40px] pl-2 pr-4 rounded-full bg-heading text-cream hover:bg-heading/85 transition-colors text-sm font-600"
            aria-label="Phát giọng đọc"
          >
            <span className="w-8 h-8 rounded-full bg-cream/15 flex items-center justify-center">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </span>
            <span>Nghe bài này</span>
          </button>
        ) : (
          <>
            <button
              onClick={handlePauseResume}
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
              aria-label={paused ? "Tiếp tục đọc" : "Tạm dừng"}
            >
              {paused ? (
                <Play className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Pause className="w-3.5 h-3.5 fill-current" />
              )}
            </button>
            <div className="flex items-center gap-2 min-w-[140px] pr-1">
              <div className="flex-1 h-1 bg-heading/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[11px] font-600 text-muted tabular w-9 text-right">
                {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}
              </span>
            </div>
            <button
              onClick={handleStop}
              className="w-9 h-9 rounded-full border border-heading/15 text-muted hover:text-warning hover:border-warning/40 transition-colors flex items-center justify-center mr-1"
              aria-label="Dừng đọc"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>
          </>
        )}
      </div>

      {/* Voice picker — important so users can switch to a male voice if their system has one */}
      <div className="relative">
        <button
          onClick={() => setShowVoicePicker(!showVoicePicker)}
          className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full border border-heading/12 bg-white hover:border-heading/30 text-xs text-muted hover:text-heading transition-colors"
          aria-label="Chọn giọng đọc"
        >
          <Mic2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">{voiceLabel}</span>
          <ChevronDown
            className={cn("w-3 h-3 transition-transform", showVoicePicker && "rotate-180")}
          />
        </button>

        {showVoicePicker && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setShowVoicePicker(false)}
              aria-hidden="true"
            />
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-card border border-heading/8 overflow-hidden z-40 max-h-[320px] overflow-y-auto">
              <div className="p-4 border-b border-heading/8">
                <div className="text-xs font-700 text-heading uppercase tracking-wider">Chọn giọng đọc</div>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Trên máy Windows, giọng "Microsoft Nam" là giọng nam tiếng Việt tự nhiên nhất.
                </p>
              </div>
              {voices.length === 0 && (
                <div className="p-4 text-xs text-muted">Không tìm thấy giọng đọc nào.</div>
              )}
              {voices.map((v) => {
                const isMale = MALE_PATTERNS.some((p) => p.test(v.name));
                const isSelected = voice?.name === v.name;
                return (
                  <button
                    key={v.name + v.lang}
                    onClick={() => {
                      setVoice(v);
                      setShowVoicePicker(false);
                      if (playing) handleStop();
                    }}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-paper transition-colors border-b border-heading/5 last:border-b-0",
                      isSelected && "bg-paper"
                    )}
                  >
                    <div className="min-w-0">
                      <div className="font-600 text-heading truncate">{v.name}</div>
                      <div className="text-[11px] text-muted">
                        {isMale ? "Giọng nam" : "Giọng đọc"} · {v.lang}
                      </div>
                    </div>
                    {isSelected && <span className="text-xs text-primary shrink-0">Đang dùng</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
