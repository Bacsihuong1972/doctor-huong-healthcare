"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Minus, ArrowRight, Phone } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  { label: "16 video bài giảng nền tảng",       c1: true,              c2: true,              c3: true },
  { label: "Truy cập khóa học trong 90 ngày",   c1: true,              c2: true,              c3: true },
  { label: "Bộ tài liệu thực hành tải về",      c1: true,              c2: true,              c3: true },
  { label: "Bài kiểm tra sau từng chặng học",   c1: true,              c2: true,              c3: true },
  { label: "Giấy ghi nhận hoàn thành khoá",     c1: true,              c2: true,              c3: true },
  { label: "Quyền tham gia cộng đồng học viên", c1: true,              c2: true,              c3: true },
  { label: "Lộ trình tự chăm sóc 28 ngày",      c1: false,             c2: true,              c3: true },
  { label: "Đánh giá tình trạng ban đầu",        c1: false,             c2: true,              c3: "Chuyên sâu" },
  { label: "Tư vấn riêng với chuyên gia",        c1: false,             c2: "6 buổi / 90 ngày", c3: "7 buổi / 12 tuần" },
  { label: "Khung bữa ăn cá nhân hóa",          c1: false,             c2: "01 khung nền",    c3: "Thiết kế theo tuần" },
  { label: "Điều chỉnh bữa ăn",                  c1: false,             c2: "02 lần",          c3: "Tối đa 01 lần / tuần" },
  { label: "Nhận xét nhật ký đường huyết",       c1: false,             c2: "Trong buổi tư vấn", c3: "Mỗi tuần" },
  { label: "Hỗ trợ hỏi đáp qua Zalo",           c1: false,             c2: "5 lần / tháng",   c3: "5 lần / tuần" },
  { label: "Người thân cùng tham gia",           c1: false,             c2: false,             c3: "01 người thân" },
  { label: "Báo cáo tổng kết cá nhân",           c1: false,             c2: "Cuối 90 ngày",    c3: "Chuyên sâu cuối 12 tuần" },
  { label: "Quyền ưu tiên gói duy trì",          c1: false,             c2: true,              c3: true },
  { label: "Số lượng học viên",                  c1: "Không giới hạn",  c2: "Giới hạn theo lịch", c3: "Tối đa 10 / khoá" },
];

const COURSES = [
  {
    id: "co-ban",
    tag: "Tự học",
    name: "Hiểu Đúng\nTiểu Đường",
    price: "799.000",
    unit: "đ",
    desc: "Nền tảng kiến thức và tài liệu thực hành để tự quản lý tại nhà.",
    highlights: [
      "16 video bài giảng khoa học",
      "90 ngày truy cập không giới hạn",
      "10 tài liệu PDF tải về",
      "Bài kiểm tra sau mỗi chặng",
      "Chứng chỉ hoàn thành khoá",
      "Cộng đồng học viên",
    ],
    cta: "Bắt đầu ngay",
    ctaHref: "/tham-gia",
    ctaStyle: "border",
    featured: false,
    slots: "Không giới hạn học viên",
  },
  {
    id: "90-ngay",
    tag: "Phổ biến nhất",
    name: "Kiểm Soát\nChủ Động 90 Ngày",
    price: "2.999.000",
    unit: "đ",
    desc: "Kết hợp tự học và tư vấn 1-1 cùng chuyên gia — có kế hoạch ăn uống cá nhân.",
    highlights: [
      "Tất cả quyền lợi gói Tự học",
      "Lộ trình tự chăm sóc 28 ngày",
      "6 buổi tư vấn riêng / 90 ngày",
      "Đánh giá tình trạng ban đầu",
      "01 khung bữa ăn cá nhân hóa",
      "Hỗ trợ Zalo 5 lần / tháng",
      "Báo cáo tổng kết cuối khoá",
    ],
    cta: "Đặt lịch tư vấn",
    ctaHref: "/lien-he",
    ctaStyle: "filled",
    featured: true,
    slots: "Giới hạn theo lịch tư vấn",
  },
  {
    id: "chuyen-sau",
    tag: "Cao cấp",
    name: "Đồng Hành\nChuyên Sâu 12 Tuần",
    price: "10.299.000",
    unit: "đ",
    desc: "Chương trình cá nhân hóa toàn diện — Bác sĩ Hương đồng hành trực tiếp mỗi tuần.",
    highlights: [
      "Tất cả quyền lợi gói 90 Ngày",
      "7 buổi tư vấn / 12 tuần",
      "Thực đơn thiết kế riêng theo tuần",
      "Điều chỉnh bữa ăn tối đa 1 lần/tuần",
      "Nhận xét nhật ký đường huyết mỗi tuần",
      "Hỗ trợ Zalo 5 lần / tuần",
      "01 người thân cùng tham gia",
      "Tối đa 10 học viên / khoá",
    ],
    cta: "Liên hệ đăng ký",
    ctaHref: "/lien-he",
    ctaStyle: "accent",
    featured: false,
    slots: "Tối đa 10 học viên / khoá",
  },
];

// ─── Feature cell ─────────────────────────────────────────────────────────────

function Cell({ value, dark }: { value: boolean | string; dark?: boolean }) {
  const muted = dark ? "text-cream/40" : "text-muted/50";
  const text  = dark ? "text-cream/80 text-xs" : "text-muted text-xs";
  const check = dark ? "text-accent" : "text-primary";

  if (value === true)  return <Check className={`w-4 h-4 mx-auto ${check}`} />;
  if (value === false) return <Minus className={`w-3 h-3 mx-auto ${muted}`} />;
  return <span className={`${text} leading-snug text-center block`}>{value}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChuongTrinhPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-heading/8">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-12 md:mb-16">
            <div className="eyebrow text-muted">№ — Chương trình khoá học</div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted">
              <span className="w-2 h-2 rounded-full bg-primary" />3 cấp độ học tập
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                className="font-display text-5xl md:text-6xl lg:text-[80px] text-heading leading-[1.05] tracking-tight">
                Chọn chương trình
                <br />
                phù hợp với
                <br />
                <span className="text-primary">cô chú</span>
              </motion.h1>
            </div>
            <div className="lg:col-span-5 lg:pb-3">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display italic text-xl lg:text-2xl text-heading leading-snug mb-6 tracking-tight">
                Ba cấp độ — từ tự học có hướng dẫn đến đồng hành cá nhân hóa trực tiếp cùng Bác sĩ Hương.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 pt-6 border-t border-heading/10">
                <Phone className="w-4 h-4 text-muted shrink-0" />
                <p className="text-sm text-muted">Cần tư vấn thêm? <Link href="/lien-he" className="text-heading underline underline-offset-2">Liên hệ Bác sĩ Hương</Link></p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 Course Cards ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {COURSES.map((course, i) => {
              const isFeatured = course.featured;
              return (
                <motion.div key={course.id}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`relative rounded-3xl overflow-hidden flex flex-col ${
                    isFeatured
                      ? "bg-heading text-cream shadow-premium ring-2 ring-heading"
                      : "bg-paper border border-heading/10 shadow-card"
                  }`}
                >
                  {/* Top accent bar */}
                  <div className={`h-1 w-full ${isFeatured ? "bg-accent" : "bg-primary/30"}`} />

                  <div className="p-8 flex flex-col flex-1">
                    {/* Tag */}
                    <div className="mb-5">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-600 ${
                        isFeatured ? "bg-accent text-cream" : "bg-heading/8 text-heading"
                      }`}>
                        {course.tag}
                      </span>
                    </div>

                    {/* Name */}
                    <h2 className={`font-display text-2xl lg:text-3xl leading-tight tracking-tight mb-4 whitespace-pre-line ${
                      isFeatured ? "text-cream" : "text-heading"
                    }`}>
                      {course.name}
                    </h2>

                    {/* Price */}
                    <div className={`flex items-baseline gap-1 mb-4 pb-6 border-b ${
                      isFeatured ? "border-cream/15" : "border-heading/10"
                    }`}>
                      <span className={`font-display text-4xl lg:text-5xl leading-none ${
                        isFeatured ? "text-cream" : "text-heading"
                      }`}>
                        {course.price}
                      </span>
                      <span className={`text-lg ${isFeatured ? "text-cream/70" : "text-muted"}`}>{course.unit}</span>
                    </div>

                    {/* Desc */}
                    <p className={`text-sm leading-relaxed mb-6 ${isFeatured ? "text-cream/75" : "text-muted"}`}>
                      {course.desc}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {course.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isFeatured ? "text-accent" : "text-primary"}`} />
                          <span className={`text-sm leading-snug ${isFeatured ? "text-cream/85" : "text-text"}`}>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Slots note */}
                    <p className={`text-xs mb-6 ${isFeatured ? "text-cream/50" : "text-muted/60"}`}>
                      {course.slots}
                    </p>

                    {/* CTA */}
                    <Link href={course.ctaHref}
                      className={`group flex items-center justify-center gap-3 h-[52px] rounded-full font-600 text-[14px] transition-colors ${
                        course.ctaStyle === "filled"
                          ? "bg-accent text-cream hover:bg-accent/85"
                          : course.ctaStyle === "accent"
                          ? "bg-primary text-cream hover:bg-primary/85"
                          : "bg-cream text-heading hover:bg-cream/85 border border-heading/15"
                      }`}>
                      <span>{course.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison table ─────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-28 border-t border-heading/8 pt-16">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mb-10">
            <div className="eyebrow text-muted mb-3">So sánh chi tiết</div>
            <h2 className="font-display text-3xl md:text-4xl text-heading tracking-tight">
              Bảng quyền lợi đầy đủ
            </h2>
          </div>

          <div className="rounded-3xl border border-heading/8 overflow-hidden bg-paper">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-heading/8">
                    <th className="text-left px-6 py-4 text-sm font-600 text-muted w-[40%]">Quyền lợi</th>
                    <th className="px-4 py-4 text-center">
                      <div className="text-xs font-600 text-muted uppercase tracking-wider">Hiểu Đúng</div>
                      <div className="font-display text-lg text-heading mt-0.5">799.000đ</div>
                    </th>
                    <th className="px-4 py-4 text-center bg-heading rounded-t-none">
                      <div className="text-xs font-600 text-accent uppercase tracking-wider">Phổ biến nhất</div>
                      <div className="font-display text-lg text-cream mt-0.5">2.999.000đ</div>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <div className="text-xs font-600 text-muted uppercase tracking-wider">Chuyên Sâu</div>
                      <div className="font-display text-lg text-heading mt-0.5">10.299.000đ</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((f, i) => (
                    <tr key={i} className={`border-b border-heading/6 last:border-0 ${i % 2 === 0 ? "" : "bg-heading/[0.02]"}`}>
                      <td className="px-6 py-4 text-sm text-text">{f.label}</td>
                      <td className="px-4 py-4 text-center"><Cell value={f.c1} /></td>
                      <td className="px-4 py-4 text-center bg-heading/5"><Cell value={f.c2} /></td>
                      <td className="px-4 py-4 text-center"><Cell value={f.c3} /></td>
                    </tr>
                  ))}
                  <tr className="bg-heading/[0.02]">
                    <td className="px-6 py-5 text-sm font-600 text-heading">Mức giá</td>
                    <td className="px-4 py-5 text-center">
                      <span className="font-display text-xl text-heading">799.000đ</span>
                    </td>
                    <td className="px-4 py-5 text-center bg-heading">
                      <span className="font-display text-xl text-cream">2.999.000đ</span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className="font-display text-xl text-heading">10.299.000đ</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Link href="/tham-gia"
              className="flex items-center justify-center h-[52px] rounded-full border border-heading/20 text-heading font-600 text-[14px] hover:bg-heading/5 transition-colors">
              Bắt đầu ngay — 799.000đ
            </Link>
            <Link href="/lien-he"
              className="flex items-center justify-center h-[52px] rounded-full bg-heading text-cream font-600 text-[14px] hover:bg-heading/85 transition-colors">
              Đặt lịch tư vấn — 2.999.000đ
            </Link>
            <Link href="/lien-he"
              className="flex items-center justify-center h-[52px] rounded-full bg-primary text-cream font-600 text-[14px] hover:bg-primary/85 transition-colors">
              Liên hệ đăng ký — 10.299.000đ
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
