"use client";
import Link from "next/link";
import { ArrowUpRight, Facebook, Youtube } from "lucide-react";
import { CourseLink } from "@/components/ui/CourseLink";
import { useAuth } from "@/hooks/useAuth";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61585399547400&locale=vi_VN";
const YOUTUBE_URL = "https://www.youtube.com/@BacsiHuongVN";

export function Footer() {
  const { user } = useAuth();
  return (
    <footer className="relative bg-heading text-cream" role="contentinfo">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-24 md:pt-32 pb-12">
        {/* Top — CTA editorial */}
        <div className="pb-20 border-b border-cream/15">
          <div className="eyebrow text-accent mb-8">Sẵn sàng bắt đầu</div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-[88px] leading-[1.1] tracking-tight mb-12">
            Một bữa ăn tốt hơn,
            <br />
            bắt đầu hôm nay.
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {user ? (
              <CourseLink
                to="/khoa-hoc"
                className="group inline-flex items-center gap-3 h-[60px] pl-7 pr-3 rounded-full bg-cream text-heading font-500 text-[15px] hover:bg-cream/90 transition-colors w-fit"
              >
                <span>Vào khóa học của tôi</span>
                <span className="w-11 h-11 rounded-full bg-heading text-cream group-hover:bg-heading/85 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </CourseLink>
            ) : (
              <>
                <Link
                  href="/tham-gia"
                  className="group inline-flex items-center gap-3 h-[60px] pl-7 pr-3 rounded-full bg-cream text-heading font-500 text-[15px] hover:bg-cream/90 transition-colors w-fit"
                >
                  <span>Tham gia khóa học</span>
                  <span className="w-11 h-11 rounded-full bg-heading text-cream group-hover:bg-heading/85 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
                <p className="text-sm text-cream/60">
                  Hoàn toàn miễn phí — chỉ cần tên và số điện thoại.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Middle — column links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-cream/15">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" aria-hidden="true">
                  <path d="M16 4 L16 28 M4 16 L28 16" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="16" cy="16" r="3" fill="#D97745" />
                </svg>
              </div>
              <div>
                <div className="font-700 text-cream text-[15px]">Doctor Hương</div>
                <div className="text-[11px] text-cream/60 tracking-wider uppercase">Healthcare</div>
              </div>
            </Link>
            <p className="text-cream/65 leading-relaxed max-w-sm mb-6">
              Nền tảng giáo dục sức khỏe tiếng Việt dành cho người mắc tiểu đường và tiền tiểu đường.
            </p>

            <div className="flex items-center gap-2">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-cream/15 hover:border-cream/40 hover:bg-cream/5 text-cream/85 hover:text-cream transition-colors text-sm font-500"
                aria-label="Facebook Bác sĩ Hương"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
                Facebook
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-cream/15 hover:border-cream/40 hover:bg-cream/5 text-cream/85 hover:text-cream transition-colors text-sm font-500"
                aria-label="YouTube Bác sĩ Hương"
              >
                <Youtube className="w-4 h-4" aria-hidden="true" />
                YouTube
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <div className="eyebrow text-cream/50 mb-5">Khóa học</div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-cream/75 hover:text-cream text-[15px] link-underline"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <CourseLink
                  to="/khoa-hoc"
                  className="text-cream/75 hover:text-cream text-[15px] link-underline"
                >
                  Toàn bộ bài học
                </CourseLink>
              </li>
              <li>
                <Link
                  href="/tham-gia"
                  className="text-cream/75 hover:text-cream text-[15px] link-underline"
                >
                  Tham gia khóa học
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <div className="eyebrow text-cream/50 mb-5">Thông tin</div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/lien-he"
                  className="text-cream/75 hover:text-cream text-[15px] link-underline"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/ho-so"
                  className="text-cream/75 hover:text-cream text-[15px] link-underline"
                >
                  Hồ sơ
                </Link>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/75 hover:text-cream text-[15px] link-underline"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/75 hover:text-cream text-[15px] link-underline"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical disclaimer */}
        <div className="py-12 border-b border-cream/15">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <div className="eyebrow text-accent">Lưu ý y khoa</div>
            </div>
            <div className="md:col-span-9">
              <p className="font-display text-2xl md:text-3xl text-cream/85 leading-snug tracking-tight">
                Website cung cấp thông tin giáo dục sức khỏe — không thay thế chẩn đoán hay điều trị y khoa.
              </p>
              <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-2xl">
                Không tự ý ngưng thuốc, thay đổi liều thuốc hoặc thay đổi insulin khi chưa trao đổi với bác sĩ điều trị. Cấp cứu: gọi 115.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Doctor Hương Healthcare. Nội dung giáo dục sức khỏe.</p>
          <p>Dành cho cô chú Việt Nam.</p>
        </div>
      </div>
    </footer>
  );
}
