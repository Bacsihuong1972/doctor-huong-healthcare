"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CourseLink } from "@/components/ui/CourseLink";
import { useAuth } from "@/hooks/useAuth";

export function Hero() {
  const { user } = useAuth();
  return (
    <section className="relative bg-cream pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-accent/[0.04] blur-3xl pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-16 md:mb-24"
        >
          <div className="eyebrow text-muted">№ 01 — Khóa học sức khỏe</div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Đang nhận học viên mới
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-[38px] sm:text-[52px] lg:text-[72px] xl:text-[88px] text-heading leading-[1.1] tracking-[-0.03em] mb-10"
            >
              Đường huyết
              <br />
              ổn định,
              <br />
              cuộc sống
              <br />
              <span className="text-primary">nhẹ nhõm.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              {user ? (
                <CourseLink
                  to="/khoa-hoc"
                  className="group inline-flex items-center gap-3 h-[60px] pl-7 pr-3 rounded-full bg-heading text-cream font-500 text-[15px] hover:bg-heading/90 transition-colors"
                >
                  <span>Vào khóa học của tôi</span>
                  <span className="w-11 h-11 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </CourseLink>
              ) : (
                <>
                  <Link
                    href="/tham-gia"
                    className="group inline-flex items-center gap-3 h-[60px] pl-7 pr-3 rounded-full bg-heading text-cream font-500 text-[15px] hover:bg-heading/90 transition-colors"
                  >
                    <span>Tham gia khóa học</span>
                    <span className="w-11 h-11 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </Link>
                  <p className="mt-5 text-sm text-muted max-w-md">
                    Chỉ cần tên và số điện thoại — không cần mật khẩu, không quảng cáo.
                  </p>
                </>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-display italic text-2xl lg:text-3xl text-heading leading-snug mb-10 tracking-tight">
                Bài học ngắn, dễ hiểu — áp dụng trong bữa cơm Việt Nam, dành cho cô chú bị tiểu đường hoặc tiền tiểu đường.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-heading/10">
                <div>
                  <div className="font-display text-3xl text-heading">20</div>
                  <div className="text-xs text-muted mt-1">Bài học</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-heading">5p</div>
                  <div className="text-xs text-muted mt-1">Mỗi bài</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-heading">100%</div>
                  <div className="text-xs text-muted mt-1">Miễn phí</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 md:mt-28"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-premium">
            <div className="aspect-[16/7] md:aspect-[21/8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1800&q=90&fit=crop&auto=format"
                alt="Bát ăn cân đối — rau xanh, đạm và tinh bột vừa phải"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-heading/85 via-heading/30 to-transparent">
                <div className="max-w-3xl">
                  <div className="eyebrow text-cream/70 mb-3">Phương pháp đơn giản</div>
                  <p className="font-display text-2xl md:text-4xl text-cream leading-tight">
                    &ldquo;Ăn rau trước, đạm tiếp theo, cơm sau cùng.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 pl-1">
            <p className="text-sm text-muted max-w-md">
              Thay đổi nhỏ trong thứ tự ăn — phương pháp được khoa học ủng hộ và phù hợp với bữa cơm Việt Nam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
