"use client";
import { motion } from "framer-motion";

const habits = [
  {
    num: "I",
    title: "Ăn rau trước",
    intro: "Chất xơ trong rau tạo lớp đệm giúp glucose hấp thu chậm hơn.",
    quote: "Một đĩa rau nhỏ trước bữa chính.",
    slug: "them-dia-rau-nho",
    image:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200&q=90&fit=crop&auto=format",
  },
  {
    num: "II",
    title: "Bữa sáng có đạm",
    intro: "Thêm trứng hoặc đậu phụ giúp no lâu và đường huyết êm hơn.",
    quote: "Một quả trứng đổi cả buổi sáng.",
    slug: "bua-sang-no-lau",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=90&fit=crop&auto=format",
  },
  {
    num: "III",
    title: "Mười phút đi bộ",
    intro: "Vận động nhẹ sau ăn giúp cơ bắp sử dụng glucose hiệu quả.",
    quote: "Sau bữa tối, một vòng quanh nhà.",
    slug: "sau-an-van-dong-nhe",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=1200&q=90&fit=crop&auto=format",
  },
];

export function FirstThreeHabits() {
  return (
    <section className="py-24 md:py-32 border-t border-heading/8 bg-paper">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-3">
            <div className="eyebrow text-muted mb-3">№ 05 — Hành động</div>
            <h2 className="font-display text-3xl text-heading">Ba thói quen</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl lg:text-[64px] text-heading leading-[1.1] tracking-tight"
            >
              Bắt đầu từ điều nhỏ trong bữa cơm hôm nay
            </motion.h3>
          </div>
        </div>

        <div className="space-y-20 md:space-y-32">
          {habits.map((h, idx) => (
            <motion.div
              key={h.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-3xl aspect-[5/4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={h.image}
                    alt={h.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur font-display italic text-heading">
                    {h.num}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <h3 className="font-display text-5xl md:text-6xl text-heading leading-[1.1] tracking-tight mb-6">
                  {h.title}
                </h3>
                <p className="text-xl text-text leading-relaxed mb-8">
                  {h.intro}
                </p>
                <blockquote className="font-display italic text-2xl text-primary leading-snug border-l-2 border-primary pl-5">
                  &ldquo;{h.quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
