"use client";
import { motion } from "framer-motion";
import { SimpleGlucoseChart } from "./SimpleGlucoseChart";

export function GlucoseExplainer() {
  return (
    <section className="py-24 md:py-32 border-t border-heading/8 bg-paper">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Editorial text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] text-heading leading-[1.1] tracking-tight mb-8 not-italic" style={{ fontWeight: 800 }}>
              Hai bữa ăn,
              <br />
              hai đường cong
            </h2>
            <div className="space-y-5 text-text leading-relaxed">
              <p>
                Đường huyết tăng sau bữa ăn là chuyện <em className="font-display not-italic text-heading font-600">bình thường</em>. Cơ thể cần năng lượng, glucose vào máu — điều ấy phải xảy ra.
              </p>
              <p>
                Điều cô chú có thể thay đổi là <strong className="text-heading">độ cao và độ dốc</strong> của đường cong ấy. Một bữa cân đối — có rau, có đạm, có cơm vừa phải — sẽ cho đường cong nhẹ nhàng hơn.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-heading/10">
              <div className="font-display text-5xl md:text-6xl text-primary">−40%</div>
              <div className="text-xs text-muted mt-2 max-w-[200px] leading-snug">
                Đỉnh đường huyết khi ăn rau trước cơm
              </div>
            </div>
          </motion.div>

          {/* Chart - editorial style */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-heading/6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="eyebrow text-muted mb-1">Hình</div>
                  <h3 className="font-display text-2xl text-heading">
                    Đường huyết theo thời gian
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl text-heading tabular">2h</div>
                  <div className="text-xs text-muted">sau bữa ăn</div>
                </div>
              </div>

              <SimpleGlucoseChart />

              <div className="mt-8 pt-6 border-t border-heading/10 grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-accent" />
                  <div>
                    <div className="font-600 text-heading text-sm">Nhiều tinh bột</div>
                    <div className="text-xs text-muted">Tăng vọt, hạ nhanh</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary" />
                  <div>
                    <div className="font-600 text-heading text-sm">Bữa cân đối</div>
                    <div className="text-xs text-muted">Êm và ổn định</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
