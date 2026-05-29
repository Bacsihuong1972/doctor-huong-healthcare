"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const stages = [
  {
    num: "01",
    title: "Hiểu đường huyết",
    count: "4 bài",
    description: "Cơ bản về glucose, insulin và cách cơ thể tiêu hóa thức ăn",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&q=85&fit=crop&auto=format",
  },
  {
    num: "02",
    title: "Nhận diện nguy cơ",
    count: "4 bài",
    description: "Dấu hiệu của đường cong đột biến và biến chứng lâu dài",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&q=85&fit=crop&auto=format",
  },
  {
    num: "03",
    title: "Thực hành bữa ăn",
    count: "4 bài",
    description: "Thứ tự ăn, bữa sáng, bữa phụ, vận động sau ăn",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1000&q=85&fit=crop&auto=format",
  },
  {
    num: "04",
    title: "Kế hoạch riêng",
    count: "4 bài",
    description: "Lịch 7 ngày thực hành và làm việc cùng bác sĩ",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1000&q=85&fit=crop&auto=format",
  },
];

export function LearningRoadmap() {
  return (
    <section className="py-24 md:py-32 border-t border-heading/8">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <div className="eyebrow text-muted mb-3">№ 04 — Lộ trình</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] text-heading leading-[1.1] tracking-tight not-italic" style={{ fontWeight: 800 }}>
              Bốn chặng đi
              <br />
              rõ ràng
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <p className="text-lg text-text leading-relaxed">
              Từ hiểu biết nền tảng đến hành động trong từng bữa ăn — đây là tổng quan giới thiệu để cô chú hình dung trước khi tham gia.
            </p>
          </div>
        </div>

        {/* Editorial grid — non-clickable introductory cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-20">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={idx % 2 === 1 ? "md:mt-24" : ""}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stage.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heading/40 via-transparent to-transparent" />

                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <div className="font-display text-5xl text-cream">{stage.num}</div>
                  <div className="px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur text-xs font-600 text-heading">
                    {stage.count}
                  </div>
                </div>
              </div>

              <h3 className="font-display text-3xl md:text-4xl text-heading leading-tight tracking-tight mb-3 not-italic" style={{ fontWeight: 800 }}>
                {stage.title}
              </h3>
              <p className="text-text leading-relaxed">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA — only path to access lessons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 md:mt-24 pt-12 border-t border-heading/10 text-center"
        >
          <p className="text-sm text-muted mb-5 max-w-md mx-auto">
            Để vào học toàn bộ 16 bài, cô chú vui lòng đăng ký hoặc đăng nhập tài khoản — Bác sĩ Hương sẽ ghi nhớ tiến độ học.
          </p>
          <Link
            href="/chuong-trinh"
            className="inline-flex items-center gap-3 h-[60px] pl-7 pr-3 rounded-full bg-heading text-cream font-500 text-[15px] hover:bg-heading/90 transition-colors group"
          >
            <span>Xem các khoá học</span>
            <span className="w-11 h-11 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
