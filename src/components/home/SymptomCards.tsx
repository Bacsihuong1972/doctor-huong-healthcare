"use client";
import { motion } from "framer-motion";

const symptoms = [
  { num: "01", text: "Hay buồn ngủ sau bữa ăn?" },
  { num: "02", text: "Nhanh đói dù vừa ăn xong?" },
  { num: "03", text: "Phân vân giữa cơm, bún và trái cây?" },
  { num: "04", text: "Muốn ổn định đường huyết nhưng chưa biết bắt đầu?" },
];

export function SymptomCards() {
  return (
    <section id="trieu-chung" className="py-24 md:py-32 border-t border-heading/8">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-3">
            <div className="eyebrow text-muted mb-3">№ 02 — Bắt đầu</div>
            <h2 className="font-display text-3xl text-heading">Đầu tiên</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl lg:text-[64px] text-heading leading-[1.1] tracking-tight"
            >
              Cô chú có từng gặp những điều này không?
            </motion.h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-heading/10">
          {symptoms.map((s, idx) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`lg:col-span-6 group py-8 md:py-10 border-b border-heading/10 ${
                idx % 2 === 0 ? "lg:border-r lg:pr-12" : "lg:pl-12"
              }`}
            >
              <div className="flex items-start gap-6 md:gap-8">
                <div className="font-display text-xl md:text-2xl text-accent italic shrink-0 mt-1 tabular">
                  {s.num}
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-2xl md:text-3xl lg:text-4xl text-heading leading-[1.15] tracking-tight">
                    {s.text}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
