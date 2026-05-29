import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Shield, ArrowUpRight } from "lucide-react";
import { CourseLink } from "@/components/ui/CourseLink";

export const metadata: Metadata = {
  title: "Liên hệ",
};

export default function LienHePage() {
  return (
    <div className="bg-cream">
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 border-b border-heading/8">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="eyebrow text-muted mb-3">№ — Liên hệ</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[96px] text-heading leading-[1.05] tracking-tight max-w-3xl not-italic" style={{ fontWeight: 800 }}>
            Bác sĩ Hương lắng nghe cô chú
          </h1>
          <p className="mt-8 text-lg text-text max-w-2xl leading-relaxed">
            Có câu hỏi về khóa học hoặc cần hỗ trợ kỹ thuật? Hãy liên hệ với Bác sĩ Hương.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="eyebrow text-muted mb-4">Cách liên hệ</div>
              <div className="space-y-0 border-t border-heading/10">
                {[
                  { icon: Phone, label: "Điện thoại", value: "0900 000 000", href: "tel:+84000000000" },
                  { icon: Mail, label: "Email", value: "hello@doctorhong.vn", href: "mailto:hello@doctorhong.vn" },
                  { icon: Clock, label: "Giờ hỗ trợ", value: "Thứ Hai – Sáu · 8:00–17:00" },
                  { icon: MapPin, label: "Văn phòng", value: "Thành phố Hồ Chí Minh, Việt Nam" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href || "#"}
                    className={`group flex items-center justify-between gap-6 py-7 border-b border-heading/10 ${item.href ? "hover:bg-paper -mx-4 px-4 rounded-xl" : ""}`}
                  >
                    <div className="flex items-center gap-5">
                      <item.icon className="w-5 h-5 text-muted" />
                      <div>
                        <div className="eyebrow text-muted mb-1">{item.label}</div>
                        <div className="font-display text-xl md:text-2xl text-heading not-italic" style={{ fontWeight: 600 }}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                    {item.href && (
                      <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-heading group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-heading text-cream rounded-3xl p-8 md:p-10 mb-6">
                <div className="eyebrow text-accent mb-4">Lưu ý quan trọng</div>
                <div className="flex items-start gap-4 mb-6">
                  <Shield className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <p className="font-display text-2xl text-cream leading-snug not-italic" style={{ fontWeight: 700 }}>
                    Đây là nền tảng giáo dục — không phải dịch vụ khám bệnh.
                  </p>
                </div>
                <p className="text-cream/70 text-sm leading-relaxed">
                  Nếu cô chú có câu hỏi về tình trạng sức khỏe cụ thể, thuốc men hay chỉ số đường huyết — hãy liên hệ trực tiếp bác sĩ điều trị hoặc cơ sở y tế gần nhất.
                </p>
              </div>

              <div className="border-l-2 border-warning pl-5 py-2">
                <div className="eyebrow text-warning mb-2">Trường hợp khẩn cấp</div>
                <p className="text-text leading-relaxed text-sm">
                  Khi có dấu hiệu hạ đường huyết nghiêm trọng (run rẩy, vã mồ hôi, chóng mặt, mất ý thức): gọi <strong className="text-heading">115</strong> hoặc đến bệnh viện ngay.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-heading/10">
                <CourseLink
                  to="/khoa-hoc"
                  className="text-heading font-600 link-underline"
                >
                  Quay lại khóa học →
                </CourseLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
