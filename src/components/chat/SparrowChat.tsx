"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X } from "lucide-react";
import Link from "next/link";
import { getLessonBySlug, lessons } from "@/data/lessons";

// ── Types ─────────────────────────────────────────────────────────────────────

type Message = { role: "user" | "assistant"; content: string };

// ── Client-side AI engine ─────────────────────────────────────────────────────

const MEDICAL_KEYWORDS = [
  "toa thuốc","đơn thuốc","uống thuốc bao nhiêu","liều lượng thuốc",
  "tiêm insulin","liều insulin","loại insulin","điều chỉnh insulin",
  "hba1c của tôi","a1c của tôi","chỉ số của tôi","kết quả xét nghiệm của tôi",
  "mmol/l của tôi","đường huyết của tôi bao nhiêu",
  "ngưng thuốc","đổi thuốc","bỏ thuốc","tác dụng phụ thuốc",
  "metformin","glipizide","empagliflozin","sitagliptin",
  "chẩn đoán cho tôi",
];

const MEDICAL_REPLY =
  "Câu hỏi này cần được Bác sĩ Hương giải đáp trực tiếp ạ. Mèo Con không thể tư vấn về thuốc, chỉ số hay tình trạng sức khỏe cá nhân — để đảm bảo an toàn cho cô chú. Cô chú có thể đặt lịch tư vấn 1-1 với Bác sĩ Hương tại mục Liên hệ nhé 🐱";

const STOP = new Set([
  "và","là","của","có","không","được","cho","với","trong","từ","đến",
  "này","đó","một","các","những","hay","hoặc","thì","mà","khi","nên",
  "vì","do","nhưng","tôi","cô","chú","bài","bạn","ạ","nhé","ơi",
  "sao","gì","nào","thế","vậy","như","tại","rằng","đây","hôm","đó",
  "cho","rất","lắm","quá","cũng","đã","sẽ","đang","bị","được","vẫn",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?;:*"'()\[\]]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP.has(w));
}

function detectIntent(q: string): "define" | "why" | "how" | "food" | "general" {
  const s = q.toLowerCase();
  if (/là gì|nghĩa là|thế nào là|tức là|hiểu như/.test(s)) return "define";
  if (/tại sao|vì sao|lý do|nguyên nhân|sao lại/.test(s)) return "why";
  if (/ăn|uống|thực phẩm|món|cơm|bữa|thức ăn|kiêng/.test(s)) return "food";
  if (/làm thế nào|làm sao|cách|hướng dẫn|thực hiện|áp dụng/.test(s)) return "how";
  return "general";
}

function intentIntro(intent: string): string {
  switch (intent) {
    case "define": return "Để giải thích cho cô chú:\n\n";
    case "why":    return "Lý do là:\n\n";
    case "food":   return "Về ăn uống, Mèo Con tìm thấy:\n\n";
    case "how":    return "Cách thực hiện:\n\n";
    default:       return "Về câu hỏi của cô chú:\n\n";
  }
}

type SearchUnit = { text: string; lessonTitle: string; isCurrentLesson: boolean };

function buildSearchUnits(currentSlug: string): SearchUnit[] {
  const units: SearchUnit[] = [];
  for (const lesson of lessons) {
    if (!lesson.content) continue;
    const isCurrent = lesson.slug === currentSlug;
    const parts: string[] = [
      lesson.content.openingLine ?? "",
      lesson.content.simpleSummary ?? "",
      lesson.content.actionToday ?? "",
      ...lesson.content.body,
      ...lesson.content.quiz.map((q) => `${q.question} — ${q.explanation}`),
    ];
    for (const part of parts) {
      const clean = part.replace(/\*\*/g, "").trim();
      if (clean.length > 30) units.push({ text: clean, lessonTitle: lesson.title, isCurrentLesson: isCurrent });
    }
  }
  return units;
}

function clientAI(question: string, currentSlug: string): string {
  const q = question.toLowerCase();
  if (MEDICAL_KEYWORDS.some((kw) => q.includes(kw))) return MEDICAL_REPLY;

  const words = tokenize(question);
  if (words.length === 0) return "Cô chú vui lòng đặt câu hỏi cụ thể hơn để Mèo Con giải đáp được ạ 🐱";

  const intent = detectIntent(question);
  const units = buildSearchUnits(currentSlug);

  const scored = units.map((u) => {
    const lower = u.text.toLowerCase();
    const hits = words.filter((w) => lower.includes(w)).length;
    return { ...u, score: hits + (u.isCurrentLesson ? hits * 0.5 : 0) };
  }).filter((u) => u.score > 0).sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return "Mèo Con chưa tìm thấy nội dung phù hợp trong 16 bài học ạ. Cô chú thử hỏi theo cách khác, hoặc đặt lịch với Bác sĩ Hương để được tư vấn trực tiếp nhé 🐱";
  }

  const top = scored.slice(0, 2);
  let reply = intentIntro(intent);
  if (!top[0].isCurrentLesson) reply += `(Từ bài "${top[0].lessonTitle}")\n\n`;
  reply += top.map((u) => u.text).join("\n\n");
  reply += "\n\n🐱";
  return reply;
}

function isServerError(reply: string): boolean {
  return reply.includes("chưa được kết nối") || reply.includes("quản trị viên") || reply.trim() === "";
}

// ── Cat SVG icon ──────────────────────────────────────────────────────────────

function CatSVG({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
      {/* Left ear */}
      <path d="M6 20 L10 3 L19 15 Z" />
      {/* Right ear */}
      <path d="M34 20 L30 3 L21 15 Z" />
      {/* Inner left ear */}
      <path d="M9 19 L12 7 L17.5 15 Z" fill="white" opacity="0.35" />
      {/* Inner right ear */}
      <path d="M31 19 L28 7 L22.5 15 Z" fill="white" opacity="0.35" />
      {/* Head */}
      <circle cx="20" cy="24" r="13" />
      {/* Left eye white */}
      <circle cx="14.5" cy="22" r="3.2" fill="white" />
      {/* Left pupil (vertical slit) */}
      <ellipse cx="14.5" cy="22" rx="1.2" ry="2.4" fill="#0a2218" />
      {/* Left eye shine */}
      <circle cx="15.5" cy="20.8" r="0.8" fill="white" />
      {/* Right eye white */}
      <circle cx="25.5" cy="22" r="3.2" fill="white" />
      {/* Right pupil */}
      <ellipse cx="25.5" cy="22" rx="1.2" ry="2.4" fill="#0a2218" />
      {/* Right eye shine */}
      <circle cx="26.5" cy="20.8" r="0.8" fill="white" />
      {/* Nose */}
      <path d="M18.8 26.5 L21.2 26.5 L20 28.2 Z" fill="#ffaacc" />
      {/* Mouth */}
      <path d="M18.5 28.5 Q20 30.5 21.5 28.5" fill="none" stroke="white" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      {/* Left whiskers */}
      <path d="M4 24 L13.5 25" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M4 26.5 L13.5 26" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Right whiskers */}
      <path d="M36 24 L26.5 25" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M36 26.5 L26.5 26" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}

// ── Loading dots ──────────────────────────────────────────────────────────────

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 150, 300].map((delay) => (
        <span key={delay} className="w-2 h-2 rounded-full bg-muted/60 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props { lessonSlug: string }

const WELCOME: Message = {
  role: "assistant",
  content: "Xin chào cô chú! Mèo Con ở đây để giải đáp thắc mắc về bài học này ạ 🐱 Cô chú muốn hỏi gì về nội dung vừa học không?",
};

export function SparrowChat({ lessonSlug }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const lesson = getLessonBySlug(lessonSlug);

  const lessonContext = lesson?.content
    ? [
        lesson.content.openingLine,
        lesson.content.simpleSummary,
        ...lesson.content.body,
        "Hành động ngay hôm nay: " + lesson.content.actionToday,
        ...lesson.content.quiz.map((q) => `${q.question} — ${q.explanation}`),
      ].filter(Boolean).join("\n\n")
    : lesson?.previewText ?? "";

  useEffect(() => { setMessages([WELCOME]); setInput(""); }, [lessonSlug]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 180); }, [open]);

  const getReply = useCallback(
    async (text: string, history: Message[]): Promise<string> => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            lessonSlug,
            lessonTitle: lesson?.title ?? lessonSlug,
            lessonContent: lessonContext,
            history: history.slice(1).map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        if (!res.ok) throw new Error("non-200");
        const data = await res.json();
        const reply = (data.reply as string) ?? "";
        if (isServerError(reply)) return clientAI(text, lessonSlug);
        return reply;
      } catch {
        return clientAI(text, lessonSlug);
      }
    },
    [lessonSlug, lesson, lessonContext]
  );

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const reply = await getReply(text, updated);
      setMessages([...updated, { role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Chat panel ─────────────────────────────────────────────────────── */}
      {open && (
        <div className="no-print fixed bottom-[88px] right-4 sm:right-6 z-50 flex flex-col w-[340px] sm:w-[380px] h-[500px] bg-cream rounded-3xl shadow-2xl border border-heading/10 overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-heading text-cream shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
              <CatSVG size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-600 text-[13px] leading-none mb-0.5">Trợ lý Mèo Con</p>
              <p className="text-[11px] text-cream/55 truncate">{lesson?.title ?? "Bài học"}</p>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full hover:bg-cream/10 flex items-center justify-center transition-colors" aria-label="Đóng">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="bg-accent/8 border-b border-accent/15 px-4 py-2 shrink-0">
            <p className="text-[10px] text-muted leading-snug">
              Mèo Con giải đáp thắc mắc về bài học. Câu hỏi y khoa, thuốc, chỉ số xét nghiệm sẽ được chuyển đến{" "}
              <Link href="/lien-he" className="underline underline-offset-2 text-accent">Bác sĩ Hương</Link>.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary text-cream flex items-center justify-center shrink-0 mt-0.5">
                    <CatSVG size={16} />
                  </div>
                )}
                <div className={`max-w-[82%] px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-heading text-cream rounded-2xl rounded-tr-sm"
                    : "bg-paper border border-heading/8 text-text rounded-2xl rounded-tl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-primary text-cream flex items-center justify-center shrink-0 mt-0.5">
                  <CatSVG size={16} />
                </div>
                <div className="bg-paper border border-heading/8 px-4 py-2 rounded-2xl rounded-tl-sm">
                  <LoadingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick-action */}
          <div className="px-4 py-2 border-t border-heading/6 shrink-0">
            <Link href="/lien-he" className="text-[11px] text-accent hover:text-accent/75 transition-colors font-500">
              📅 Đặt lịch tư vấn 1-1 với Bác sĩ Hương
            </Link>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 pb-3 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Hỏi Mèo Con về bài học..."
              className="flex-1 h-10 px-4 rounded-full bg-paper border border-heading/12 text-[13px] text-text placeholder:text-muted/60 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-full bg-primary text-cream flex items-center justify-center hover:bg-primary/85 disabled:opacity-35 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
              aria-label="Gửi"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating button ──────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`no-print fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2.5 h-14 rounded-full bg-primary text-cream shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all active:scale-95 ${open ? "px-4" : "pl-4 pr-5"}`}
        aria-label={open ? "Đóng Trợ lý Mèo Con" : "Mở Trợ lý Mèo Con"}
      >
        <div className={`transition-transform duration-300 ${open ? "rotate-12 scale-90" : ""}`}>
          <CatSVG size={26} />
        </div>
        {!open && <span className="text-[13px] font-600 whitespace-nowrap pr-0.5">Trợ lý Mèo Con</span>}
      </button>
    </>
  );
}
