"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Tôi có cần bỏ hoàn toàn cơm không?",
    a: "Không. Khóa học không yêu cầu cô chú bỏ cơm. Mục tiêu là học cách ăn cơm đúng thứ tự (rau trước, cơm sau), đúng lượng, và kết hợp với rau xanh và đạm.",
  },
  {
    q: "Tôi đang uống thuốc có học theo được không?",
    a: "Hoàn toàn có thể. Khóa học được thiết kế cho người đang điều trị tiểu đường. Tuy nhiên, hãy chia sẻ với bác sĩ những gì cô chú học được để điều chỉnh phù hợp.",
  },
  {
    q: "Tôi dùng insulin có nên đi bộ sau ăn không?",
    a: "Đi bộ nhẹ sau ăn rất tốt, nhưng người dùng insulin cần thận trọng. Hãy đo đường huyết trước, mang theo kẹo đề phòng và trao đổi với bác sĩ về liều insulin phù hợp.",
  },
  {
    q: "Tôi có cần đăng nhập mới học được không?",
    a: "Có. Đăng nhập giúp khóa học lưu tiến độ của cô chú, đánh dấu bài đã hoàn thành và tiếp tục đúng chỗ cô chú dừng lại. Đăng ký hoàn toàn miễn phí và không quảng cáo.",
  },
  {
    q: "Tôi có thể nghe bài học bằng giọng nói không?",
    a: "Có. Mỗi bài học có nút Nghe bài này — sử dụng giọng đọc tiếng Việt của trình duyệt. Cô chú có thể vừa làm việc nhà vừa nghe, không cần đọc chữ.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 border-t border-heading/8" id="faq">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow text-muted mb-3">№ 06 — Hỏi đáp</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] text-heading leading-[1.1] tracking-tight mb-8">
                Những thắc mắc phổ biến
              </h2>
              <p className="text-lg text-text leading-relaxed mb-8">
                Câu trả lời ngắn gọn cho những băn khoăn khi mới bắt đầu.
              </p>
              <Link
                href="/lien-he"
                className="text-heading font-600 link-underline"
              >
                Còn câu hỏi khác? Liên hệ với Bác sĩ Hương →
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="border-t border-heading/10">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="border-b border-heading/10"
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full flex items-start justify-between gap-6 py-7 md:py-8 text-left group"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${idx}`}
                    >
                      <div className="flex items-start gap-5">
                        <span className="font-display text-muted text-base mt-2 tabular shrink-0">
                          0{idx + 1}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl text-heading leading-tight tracking-tight">
                          {faq.q}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "w-10 h-10 rounded-full border border-heading/15 flex items-center justify-center shrink-0 mt-1 transition-all duration-500",
                          isOpen
                            ? "bg-heading text-cream border-heading rotate-45"
                            : "text-heading group-hover:border-heading/40"
                        )}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="pb-8 pl-11 pr-12">
                            <p className="text-text leading-relaxed">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
