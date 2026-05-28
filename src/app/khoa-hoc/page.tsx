"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { LessonCard } from "@/components/lesson/LessonCard";
import { AuthGate } from "@/components/auth/AuthGate";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { lessons, chapters } from "@/data/lessons";
import type { LessonChapter, Lesson } from "@/types";

const chapterKeys = Object.keys(chapters) as LessonChapter[];

function findNextLesson(progress: Record<string, string>): Lesson {
  // Featured = first not-completed lesson, or lesson 1 if all done
  const next = lessons.find((l) => progress[l.slug] !== "completed");
  return next ?? lessons[0];
}

function CourseContent() {
  const searchParams = useSearchParams();
  const filterChapter = searchParams.get("chuong") as LessonChapter | null;
  const { getStatus, progress, completedCount } = useProgress();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="min-h-[60vh]" />;
  }

  const filteredLessons = filterChapter
    ? lessons.filter((l) => l.chapter === filterChapter)
    : lessons;

  const featured = findNextLesson(progress);
  const percentage = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="bg-cream">
      {/* Hero header */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-20 border-b border-heading/8">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="eyebrow text-muted">№ — Khóa học</div>
            <Link
              href="/ho-so"
              className="text-sm text-muted hover:text-heading flex items-center gap-2"
            >
              Hồ sơ của tôi →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">
            <div className="lg:col-span-7">
              <h1 className="font-display text-5xl md:text-6xl lg:text-[96px] text-heading leading-[1.05] tracking-tight">
                Chào {user?.name ?? "cô chú"},
                <br />
                hôm nay học gì?
              </h1>
            </div>

            <div className="lg:col-span-5 lg:pb-3">
              <div className="bg-paper rounded-3xl p-7 border border-heading/8">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="eyebrow text-muted">Tiến độ của cô chú</div>
                  <div className="font-display text-3xl text-heading italic tabular">
                    {completedCount}<span className="text-muted text-2xl">/{lessons.length}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-heading/8 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-heading rounded-full transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-muted">
                  {completedCount === 0
                    ? "Bắt đầu với bài bên dưới — chỉ 4 phút."
                    : completedCount === lessons.length
                    ? "Cô chú đã hoàn thành toàn bộ khóa học."
                    : `${percentage}% — Tiếp tục từ bài đang học.`}
                </p>
              </div>
            </div>
          </div>

          {/* Featured lesson — the one to continue */}
          <LessonCard
            lesson={featured}
            status={getStatus(featured.slug)}
            variant="featured"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="pt-16 md:pt-20">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <div className="eyebrow text-muted mb-3">Tất cả bài học</div>
              <h2 className="font-display text-4xl md:text-5xl text-heading tracking-tight leading-tight">
                {filterChapter ? chapters[filterChapter].title : "Hai mươi bài học"}
              </h2>
            </div>
          </div>

          {/* Chapter pills */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-heading/10" role="group" aria-label="Lọc theo chương">
            <Link
              href="/khoa-hoc"
              scroll={false}
              className={`h-10 px-5 rounded-full text-sm font-500 flex items-center transition-colors ${
                !filterChapter
                  ? "bg-heading text-cream"
                  : "border border-heading/15 text-heading hover:border-heading/30"
              }`}
            >
              Tất cả · {lessons.length}
            </Link>
            {chapterKeys.map((key) => {
              const ch = chapters[key];
              const count = ch.lessonIds.length;
              const active = filterChapter === key;
              return (
                <Link
                  key={key}
                  href={`/khoa-hoc?chuong=${key}`}
                  scroll={false}
                  className={`h-10 px-5 rounded-full text-sm font-500 flex items-center transition-colors ${
                    active
                      ? "bg-heading text-cream"
                      : "border border-heading/15 text-heading hover:border-heading/30"
                  }`}
                >
                  {ch.title} · {count}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lessons grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          {filterChapter ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
              {filteredLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={getStatus(lesson.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-20 md:space-y-24">
              {chapterKeys.map((key) => {
                const ch = chapters[key];
                const chapterLessons = lessons.filter((l) => l.chapter === key);
                const done = chapterLessons.filter((l) => getStatus(l.slug) === "completed").length;

                return (
                  <section key={key} aria-labelledby={`chapter-${key}`}>
                    <div className="flex items-end justify-between gap-6 mb-10 pb-6 border-b border-heading/10">
                      <div>
                        <div className="eyebrow text-muted mb-2">Chương · {done}/{chapterLessons.length} hoàn thành</div>
                        <h3
                          id={`chapter-${key}`}
                          className="font-display text-3xl md:text-4xl text-heading tracking-tight"
                        >
                          {ch.title}
                        </h3>
                      </div>
                      <Link
                        href={`/khoa-hoc?chuong=${key}`}
                        scroll={false}
                        className="hidden md:flex items-center gap-2 text-sm text-heading font-600 link-underline"
                      >
                        Xem chương →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
                      {chapterLessons.map((lesson) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={lesson}
                          status={getStatus(lesson.slug)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {completedCount === lessons.length && (
            <div className="mt-20 bg-heading text-cream rounded-3xl p-10 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <Check className="w-5 h-5 text-accent" />
                <span className="eyebrow text-accent">Hoàn thành</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                Cô chú đã <span className="italic">hoàn thành</span> khóa học
              </h2>
              <p className="text-cream/70 max-w-xl mx-auto mb-8">
                Tiếp tục áp dụng những thói quen mỗi ngày — và đừng quên chia sẻ với bác sĩ trong lần tái khám tới.
              </p>
              <Link
                href="/ho-so"
                className="inline-flex items-center gap-3 h-[56px] pl-6 pr-2 rounded-full bg-cream text-heading font-600 text-[15px] hover:bg-cream/90"
              >
                Xem hồ sơ của tôi
                <span className="w-10 h-10 rounded-full bg-heading text-cream flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function KhoaHocPage() {
  return (
    <AuthGate>
      <Suspense
        fallback={
          <div className="max-w-6xl mx-auto px-4 py-12 text-center text-muted">
            Đang tải...
          </div>
        }
      >
        <CourseContent />
      </Suspense>
    </AuthGate>
  );
}
