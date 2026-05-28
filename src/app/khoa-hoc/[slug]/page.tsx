"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft, ArrowUpRight, Check, Printer, ChevronDown, AlertTriangle, ArrowLeft
} from "lucide-react";
import { SafetyAlert } from "@/components/lesson/SafetyAlert";
import { Quiz } from "@/components/lesson/Quiz";
import { AudioButton } from "@/components/lesson/AudioButton";
import { AuthGate } from "@/components/auth/AuthGate";
import { LessonIllustration } from "@/components/illustrations/LessonIllustration";
import { getLessonBySlug, lessons } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

function BodyText({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const content = line.slice(2);
          return (
            <div key={i} className="flex gap-3">
              <span className="text-accent mt-2 shrink-0">•</span>
              <span
                className="text-text leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: content.replace(/\*\*(.+?)\*\*/g, '<strong class="text-heading">$1</strong>'),
                }}
              />
            </div>
          );
        }
        return (
          <p
            key={i}
            className="text-text leading-[1.75]"
            dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-heading">$1</strong>'),
            }}
          />
        );
      })}
    </div>
  );
}

function LessonContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const lesson = getLessonBySlug(slug);
  const { getStatus, markComplete, markInProgress } = useProgress();
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [completed, setCompleted] = useState(false);

  const status = getStatus(slug);

  useEffect(() => {
    // Mỗi lần chuyển bài → cuộn lên đầu mượt mà
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (lesson && status === "not-started") {
      markInProgress(slug);
    }
    setCompleted(status === "completed");
  }, [slug, status, lesson, markInProgress]);

  // Build TTS text from the lesson content
  const ttsText = useMemo(() => {
    if (!lesson?.content) return lesson?.title ?? "";
    const parts: string[] = [
      lesson.title,
      lesson.content.openingLine,
      lesson.content.simpleSummary,
      ...lesson.content.body.map((p) => p.replace(/\*\*/g, "").replace(/\n/g, ". ")),
      "Làm ngay hôm nay: " + lesson.content.actionToday,
    ];
    return parts.filter(Boolean).join(". ");
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-heading mb-4">Không tìm thấy bài học</h1>
        <Link
          href="/khoa-hoc"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          Quay lại danh sách bài học
        </Link>
      </div>
    );
  }

  const lessonIndex = lessons.findIndex((l) => l.slug === slug);
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  const handleComplete = () => {
    markComplete(slug);
    setCompleted(true);
  };

  const handlePrint = () => window.print();

  return (
    <article className="bg-cream pb-24">
      {/* Top bar */}
      <div className="no-print sticky top-[72px] z-30 bg-cream/85 backdrop-blur-xl border-b border-heading/8">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/khoa-hoc"
              className="flex items-center gap-2 text-sm text-muted hover:text-heading transition-colors"
              aria-label="Quay lại danh sách bài học"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Tất cả bài học</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 text-xs text-muted tabular">
              <span>Bài {String(lesson.id).padStart(2, "0")}</span>
              <span className="mx-2">·</span>
              <span>{lessonIndex + 1} trên {lessons.length}</span>
            </div>

            <button
              onClick={handlePrint}
              className="text-sm text-muted hover:text-heading flex items-center gap-1.5 transition-colors"
              aria-label="In bài này"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:block">In bài</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-heading/8">
            <div
              className="h-full bg-heading transition-all duration-700"
              style={{ width: `${((lessonIndex + 1) / lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Editorial header */}
      <header className="pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 lg:px-10">
          {/* Meta */}
          <div className="flex items-center justify-center gap-3 mb-10 text-xs">
            <span className="eyebrow text-accent">Bài {String(lesson.id).padStart(2, "0")}</span>
            <span className="w-1 h-1 rounded-full bg-muted/40" />
            <span className="text-muted">{lesson.estimatedMinutes} phút đọc</span>
            <span className="w-1 h-1 rounded-full bg-muted/40" />
            <span className="text-muted">
              {lesson.chapter === "hieu-duong-huyet" && "Hiểu đường huyết"}
              {lesson.chapter === "nguy-co-va-theo-doi" && "Nhận diện nguy cơ"}
              {lesson.chapter === "thuc-hanh-bua-an" && "Thực hành bữa ăn"}
              {lesson.chapter === "ke-hoach-ca-nhan" && "Kế hoạch riêng"}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-[64px] text-heading text-center leading-[1.05] tracking-tight mb-10">
            {lesson.title}
          </h1>

          {/* Audio + completed indicator */}
          <div className="flex items-center justify-center gap-3 flex-wrap no-print">
            <AudioButton text={ttsText} title={lesson.title} />
            {completed && (
              <span className="inline-flex items-center gap-1.5 text-xs font-600 text-primary bg-primary/10 px-3 py-2 rounded-full">
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                Đã hoàn thành
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero image */}
      {lesson.content?.illustrationAlt && (
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 lg:px-10 mb-16">
          <LessonIllustration type={slug} alt={lesson.content.illustrationAlt} />
        </div>
      )}

      {/* Content */}
      {lesson.content ? (
        <>
          {/* Lede paragraph */}
          <section className="max-w-[760px] mx-auto px-5 sm:px-8 lg:px-10 mb-16">
            <p className="font-display text-2xl md:text-3xl text-heading leading-snug italic tracking-tight">
              {lesson.content.openingLine}
            </p>
          </section>

          {/* Body */}
          <section className="max-w-[680px] mx-auto px-5 sm:px-8 lg:px-10 mb-16 lesson-body">
            <div className="space-y-7 text-[18px] md:text-[19px]">
              {lesson.content.body.map((paragraph, idx) => (
                <BodyText key={idx} text={paragraph} />
              ))}
            </div>
          </section>

          {/* Pull quote — Simple Summary */}
          <section className="max-w-[820px] mx-auto px-5 sm:px-8 lg:px-10 mb-16">
            <div className="border-l-2 border-accent pl-8 py-2">
              <div className="eyebrow text-accent mb-3">Hiểu đơn giản</div>
              <p className="font-display text-2xl md:text-3xl text-heading italic leading-snug tracking-tight">
                {lesson.content.simpleSummary}
              </p>
            </div>
          </section>

          {/* Action today */}
          <section className="max-w-[820px] mx-auto px-5 sm:px-8 lg:px-10 mb-16">
            <div className="bg-heading text-cream rounded-3xl p-8 md:p-12">
              <div className="eyebrow text-accent mb-4">Làm ngay hôm nay</div>
              <p className="font-display text-2xl md:text-3xl leading-snug tracking-tight">
                {lesson.content.actionToday}
              </p>
            </div>
          </section>

          {/* Safety alerts */}
          {lesson.content.safetyAlerts && lesson.content.safetyAlerts.length > 0 && (
            <section className="max-w-[760px] mx-auto px-5 sm:px-8 lg:px-10 mb-16 space-y-4">
              {lesson.content.safetyAlerts.map((alert, idx) => (
                <SafetyAlert key={idx} alert={alert} />
              ))}
            </section>
          )}

          {/* Quiz */}
          {lesson.content.quiz.length > 0 && (
            <section className="max-w-[760px] mx-auto px-5 sm:px-8 lg:px-10 mb-16">
              <Quiz questions={lesson.content.quiz} onComplete={handleComplete} />
            </section>
          )}


          {/* Sources accordion */}
          <section className="max-w-[760px] mx-auto px-5 sm:px-8 lg:px-10 no-print">
            <button
              onClick={() => setSourcesOpen(!sourcesOpen)}
              className="w-full flex items-center justify-between gap-3 py-6 border-y border-heading/10 text-left group"
              aria-expanded={sourcesOpen}
            >
              <div>
                <div className="eyebrow text-muted mb-1">Nguồn</div>
                <div className="font-display text-xl text-heading italic">
                  Tham khảo của bài học này
                </div>
              </div>
              <ChevronDown
                className={cn("w-5 h-5 text-muted transition-transform", sourcesOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {sourcesOpen && (
              <div className="py-6">
                <ol className="space-y-3">
                  {lesson.content.sources.map((src, idx) => (
                    <li key={idx} className="text-sm text-muted flex gap-3 leading-relaxed">
                      <span className="font-display italic text-accent shrink-0 tabular">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{src}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 p-4 bg-paper rounded-xl text-xs text-muted flex gap-2 leading-relaxed">
                  <AlertTriangle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  Hình ảnh tham khảo bản quyền. Hiện hiển thị hình minh họa thay thế cho mục đích giáo dục.
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 py-16 text-center">
          <p className="font-display text-2xl text-heading italic mb-3">Bài học đang được chuẩn bị</p>
          <p className="text-muted">{lesson.previewText}</p>
        </section>
      )}

      {/* Footer navigation */}
      <nav
        className="max-w-[1080px] mx-auto px-5 sm:px-8 lg:px-10 mt-20 pt-12 border-t border-heading/10 no-print"
        aria-label="Điều hướng bài học"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevLesson ? (
            <Link
              href={`/khoa-hoc/${prevLesson.slug}`}
              scroll={false}
              className="group flex items-center gap-4 p-6 rounded-2xl border border-heading/10 hover:border-heading/30 hover:bg-paper transition-all"
            >
              <span className="w-11 h-11 rounded-full border border-heading/15 group-hover:border-heading flex items-center justify-center shrink-0 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <div className="eyebrow text-muted mb-1">Bài trước</div>
                <div className="font-display text-base text-heading truncate">
                  {prevLesson.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson && (
            <Link
              href={`/khoa-hoc/${nextLesson.slug}`}
              scroll={false}
              className="group flex items-center gap-4 p-6 rounded-2xl bg-heading text-cream hover:bg-heading/90 transition-colors md:flex-row-reverse md:text-right"
            >
              <span className="w-11 h-11 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center shrink-0 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="eyebrow text-cream/60 mb-1">Bài tiếp theo</div>
                <div className="font-display text-base truncate">{nextLesson.title}</div>
              </div>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}

export default function LessonPage() {
  return (
    <AuthGate>
      <LessonContent />
    </AuthGate>
  );
}
