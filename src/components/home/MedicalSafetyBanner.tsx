"use client";
import { motion } from "framer-motion";

export function MedicalSafetyBanner() {
  return (
    <section
      className="py-24 md:py-32 border-t border-heading/8 bg-heading text-cream"
      aria-label="Thông báo an toàn y khoa"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-4">
            <div className="eyebrow text-accent mb-3">Lưu ý y khoa</div>
            <h2 className="font-display text-3xl text-cream/90 italic">An toàn trước hết</h2>
          </div>

          <div className="lg:col-span-8">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl text-cream leading-[1.15] tracking-tight">
              Khóa học không thay thế <span className="italic text-accent">bác sĩ điều trị</span>. Cô chú không tự ý ngưng thuốc, đổi liều hay thay đổi insulin khi chưa trao đổi với bác sĩ.
            </p>

            <div className="mt-10 pt-8 border-t border-cream/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-cream/70">
              <div>
                <div className="text-cream font-600 mb-1">Tái khám đúng lịch</div>
                <p>Duy trì lịch khám theo bác sĩ chỉ định.</p>
              </div>
              <div>
                <div className="text-cream font-600 mb-1">Báo bác sĩ khi đổi bữa ăn</div>
                <p>Đặc biệt nếu đang dùng insulin hay thuốc hạ đường huyết.</p>
              </div>
              <div>
                <div className="text-cream font-600 mb-1">Cấp cứu khi cần</div>
                <p>Gọi 115 nếu có dấu hiệu hạ/tăng đường huyết nghiêm trọng.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
