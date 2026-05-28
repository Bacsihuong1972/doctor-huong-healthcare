"use client";
import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import Link from "next/link";
import { getLessonBySlug } from "@/data/lessons";

// ── Types ─────────────────────────────────────────────────────────────────────

type Message = { role: "user" | "assistant"; content: string };

// ── Sparrow SVG icon ──────────────────────────────────────────────────────────

function SparrowSVG({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Tail */}
      <path d="M6 27 L10 22 L13 25 L10 30 Z" />
      {/* Body */}
      <ellipse cx="20" cy="25" rx="10" ry="7" />
      {/* Wing highlight */}
      <path
        d="M12 22 Q9 17 14 18 Q18 14 24 18 Q20 21 12 22Z"
        opacity="0.65"
      />
      {/* Head */}
      <circle cx="28" cy="17" r="7" />
      {/* Eye white */}
      <circle cx="30" cy="15.5" r="1.6" fill="white" />
      {/* Eye pupil */}
      <circle cx="30.4" cy="15.1" r="0.7" fill="#0a2218" />
      {/* Beak */}
      <path d="M34 17 L39 15.5 L36.5 19 Z" />
      {/* Feet */}
      <path
        d="M18 32 L17 35 M17 35 L15 35 M17 35 L17 37"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 32 L23 35 M23 35 L25 35 M23 35 L23 37"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// ── Loading dots ──────────────────────────────────────────────────────────────

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-2 h-2 rounded-full bg-muted/60 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  lessonSlug: string;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Xin chào cô chú! Chim Sẻ ở đây để giải đáp thắc mắc về bài học này ạ 🌿 Cô chú muốn hỏi gì về nội dung vừa học không?",
};

export function SparrowChat({ lessonSlug }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const lesson = getLessonBySlug(lessonSlug);

  // Flatten lesson content for system prompt context
  const lessonContext = lesson?.content
    ? [
        lesson.content.openingLine,
        lesson.content.simpleSummary,
        ...lesson.content.body,
        "Hành động ngay hôm nay: " + lesson.content.actionToday,
      ]
        .filter(Boolean)
        .join("\n\n")
    : lesson?.previewText ?? "";

  // Reset conversation when lesson changes
  useEffect(() => {
    setMessages([WELCOME]);
    setInput("");
  }, [lessonSlug]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 180);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          lessonSlug,
          lessonTitle: lesson?.title ?? lessonSlug,
          lessonContent: lessonContext,
          // Send only assistant/user history (not the initial welcome to save tokens)
          history: messages
            .slice(1)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      setMessages([
        ...updated,
        { role: "assistant", content: data.reply as string },
      ]);
    } catch {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content:
            "Xin lỗi, Chim Sẻ gặp sự cố kỹ thuật. Cô chú thử lại sau nhé ạ 🌿",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Chat panel ────────────────────────────────────────────────────── */}
      {open && (
        <div className="no-print fixed bottom-[88px] right-4 sm:right-6 z-50 flex flex-col w-[340px] sm:w-[380px] h-[500px] bg-cream rounded-3xl shadow-2xl border border-heading/10 overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-heading text-cream shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
              <SparrowSVG size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-600 text-[13px] leading-none mb-0.5">Trợ lý Chim Sẻ</p>
              <p className="text-[11px] text-cream/55 truncate">
                {lesson?.title ?? "Bài học"}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-cream/10 flex items-center justify-center transition-colors"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Disclaimer strip */}
          <div className="bg-accent/8 border-b border-accent/15 px-4 py-2 shrink-0">
            <p className="text-[10px] text-muted leading-snug">
              Chim Sẻ chỉ giải đáp thắc mắc về bài học. Câu hỏi y khoa, thuốc, chỉ số
              xét nghiệm sẽ được chuyển đến{" "}
              <Link href="/lien-he" className="underline underline-offset-2 text-accent">
                Bác sĩ Hương
              </Link>
              .
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary text-cream flex items-center justify-center shrink-0 mt-0.5">
                    <SparrowSVG size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-heading text-cream rounded-2xl rounded-tr-sm"
                      : "bg-paper border border-heading/8 text-text rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-primary text-cream flex items-center justify-center shrink-0 mt-0.5">
                  <SparrowSVG size={16} />
                </div>
                <div className="bg-paper border border-heading/8 px-4 py-2 rounded-2xl rounded-tl-sm">
                  <LoadingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick-action: book consultation */}
          <div className="px-4 py-2 border-t border-heading/6 shrink-0">
            <Link
              href="/lien-he"
              className="text-[11px] text-accent hover:text-accent/75 transition-colors font-500"
            >
              📅 Đặt lịch tư vấn 1-1 với Bác sĩ Hương
            </Link>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 pb-3 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Hỏi Chim Sẻ về bài học..."
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

      {/* ── Floating trigger button ────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`no-print fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2.5 h-14 rounded-full bg-primary text-cream shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all active:scale-95 ${
          open ? "px-4" : "pl-4 pr-5"
        }`}
        aria-label={open ? "Đóng Trợ lý Chim Sẻ" : "Mở Trợ lý Chim Sẻ"}
      >
        <div
          className={`transition-transform duration-300 ${open ? "rotate-12 scale-90" : ""}`}
        >
          <SparrowSVG size={26} />
        </div>
        {!open && (
          <span className="text-[13px] font-600 whitespace-nowrap pr-0.5">
            Trợ lý Chim Sẻ
          </span>
        )}
      </button>
    </>
  );
}
