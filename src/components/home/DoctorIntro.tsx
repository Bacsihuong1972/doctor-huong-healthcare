"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── Credential badges ────────────────────────────────────────────────────────

const stats = [
  { number: "30+", label: "Quốc gia nghiên cứu dinh dưỡng" },
  { number: "50+", label: "Trường hợp tiểu đường hỗ trợ" },
  { number: "20+", label: "Năm kinh nghiệm lâm sàng" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function DoctorIntro() {
  return (
    <section className="bg-cream border-t border-heading/8 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] min-h-[640px]">

        {/* ── Left — text ─────────────────────────────────────────────────── */}
        <div className="flex items-center px-5 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-24 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="max-w-lg"
          >
            {/* Headline */}
            <h2 className="mb-8">
              <span className="block font-display font-300 text-base md:text-lg text-muted mb-4 tracking-[0.18em] uppercase">
                Xin chào, tôi là
              </span>
              <span className="block font-display font-700 text-[44px] md:text-[54px] lg:text-[64px] text-heading leading-[1.05] tracking-[-0.02em]">
                Ts.Bs. Lê Thị{" "}
                <span className="text-accent">Thu Hương</span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-text leading-[1.8] mb-10">
              Tiến sĩ tại <strong className="text-heading font-700">Đại học Y Hà Nội</strong>,
              {" "}đã đến hơn{" "}
              <strong className="text-heading font-700">30+ quốc gia</strong>{" "}
              để nghiên cứu về dinh dưỡng và chuyển hóa. Chuyên gia trong lĩnh vực
              dinh dưỡng lâm sàng, đã hỗ trợ kiểm soát hơn{" "}
              <strong className="text-heading font-700">50+ trường hợp tiểu đường</strong>{" "}
              thông qua thay đổi lối sống và chế độ ăn.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pb-10 border-b border-heading/10 mb-10">
              {stats.map((s) => (
                <div key={s.number}>
                  <div className="font-display text-4xl md:text-5xl text-heading leading-none mb-1">
                    {s.number}
                  </div>
                  <div className="text-xs text-muted leading-snug">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/chuong-trinh"
              className="group inline-flex items-center gap-3 h-[56px] pl-7 pr-3 rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/85 transition-colors"
            >
              <span>Học cùng Bác sĩ Hương</span>
              <span className="w-10 h-10 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ── Right — photo ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[520px] lg:h-auto order-1 lg:order-2 bg-heading/5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dr-huong.jpg"
            alt="Ts.Bs. Lê Thị Thu Hương — Bác sĩ dinh dưỡng tiểu đường"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Gradient overlay: trái sang để hoà với nền cream */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-transparent to-transparent lg:block hidden" />
          {/* Gradient dưới lên cho mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-cream/50 to-transparent lg:hidden" />
        </motion.div>

      </div>
    </section>
  );
}
