import Link from "next/link";
import { Clock, Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lesson, LessonStatus } from "@/types";

// Map lesson slug to a hero image
const lessonImages: Record<string, string> = {
  "truoc-khi-bat-dau": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=85&fit=crop&auto=format",
  "duong-huyet-la-gi": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=85&fit=crop&auto=format",
  "com-khoai-banh-trai-cay": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=85&fit=crop&auto=format",
  "sau-khi-an-thuc-an-di-dau": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=85&fit=crop&auto=format",
  "do-che-bien-san-va-duong-huyet": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=85&fit=crop&auto=format",
  "hieu-duong-cong-duong-huyet": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85&fit=crop&auto=format",
  "co-the-lam-viec-vat-va-hon": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=85&fit=crop&auto=format",
  "met-sau-an-bien-chung-lau-dai": "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&q=85&fit=crop&auto=format",
  "an-theo-thu-tu": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=85&fit=crop&auto=format",
  "them-dia-rau-nho": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=85&fit=crop&auto=format",
  "khong-chi-nhin-calo": "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=800&q=85&fit=crop&auto=format",
  "bua-sang-no-lau": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=85&fit=crop&auto=format",
  "mat-ong-duong-phen-van-la-duong": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=85&fit=crop&auto=format",
  "neu-an-mon-ngot": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=85&fit=crop&auto=format",
  "giam-trong-bua-an": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=85&fit=crop&auto=format",
  "sau-an-van-dong-nhe": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=85&fit=crop&auto=format",
  "bua-phu-thong-minh": "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=800&q=85&fit=crop&auto=format",
  "dung-an-tinh-bot-mot-minh": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85&fit=crop&auto=format",
  "lich-7-ngay-thuc-hanh": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=85&fit=crop&auto=format",
  "tai-kham-hoi-bac-si": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=85&fit=crop&auto=format",
};

interface Props {
  lesson: Lesson;
  status?: LessonStatus;
  variant?: "default" | "featured";
}

export function LessonCard({ lesson, status = "not-started", variant = "default" }: Props) {
  const image = lessonImages[lesson.slug] ?? lessonImages["duong-huyet-la-gi"];
  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  if (variant === "featured") {
    return (
      <Link
        href={`/khoa-hoc/${lesson.slug}`}
        className="group block relative rounded-3xl overflow-hidden aspect-[16/10] md:aspect-[21/9] shadow-card hover-lift"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-heading via-heading/60 to-heading/20" />

        <div className="relative h-full flex flex-col justify-between p-8 md:p-12 text-cream">
          <div className="flex items-center justify-between">
            <div className="eyebrow text-cream/70">Bài {lesson.id} · {lesson.estimatedMinutes} phút</div>
            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/15 backdrop-blur text-xs font-600">
                <Check className="w-3 h-3" /> Đã hoàn thành
              </span>
            )}
            {isInProgress && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/90 text-xs font-600">
                Đang học
              </span>
            )}
          </div>

          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
              {lesson.title}
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-6 max-w-xl">
              {lesson.previewText}
            </p>
            <div className="inline-flex items-center gap-3 group/btn">
              <span className="text-base font-600">
                {isCompleted ? "Xem lại bài này" : isInProgress ? "Tiếp tục học" : "Bắt đầu bài này"}
              </span>
              <span className="w-12 h-12 rounded-full bg-cream text-heading flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/khoa-hoc/${lesson.slug}`}
      className="group block hover-lift"
      aria-label={`Bài ${lesson.id}: ${lesson.title}`}
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-heading/30 to-transparent" />

        {/* Number badge */}
        <div className="absolute top-5 left-5 font-display italic text-3xl text-cream">
          {String(lesson.id).padStart(2, "0")}
        </div>

        {/* Status badge */}
        {isCompleted && (
          <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-cream/95 backdrop-blur flex items-center justify-center">
            <Check className="w-4 h-4 text-primary" />
          </div>
        )}
        {isInProgress && (
          <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-accent text-cream text-[10px] font-700 uppercase tracking-wider">
            Đang học
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
          <Clock className="w-3 h-3" />
          <span>{lesson.estimatedMinutes} phút</span>
        </div>
        <h3
          className={cn(
            "font-display text-xl md:text-2xl text-heading leading-tight tracking-tight mb-2 group-hover:italic transition-all duration-500"
          )}
        >
          {lesson.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {lesson.previewText}
        </p>
      </div>
    </Link>
  );
}
