"use client";
import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, User as UserIcon, ArrowUpRight, Shield } from "lucide-react";
import { registerByPhone } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

function FormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/khoa-hoc";
  const { user, loading: authLoading } = useAuth();

  // Đã đăng nhập rồi → về khóa học ngay
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/khoa-hoc");
    }
  }, [user, authLoading, router]);

  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 11;
  };

  const canSubmit = form.name.trim().length >= 2 && isValidPhone(form.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!canSubmit) {
      if (form.name.trim().length < 2) {
        setError("Vui lòng nhập tên của cô chú");
      } else if (!isValidPhone(form.phone)) {
        setError("Số điện thoại chưa đúng định dạng");
      }
      return;
    }
    setLoading(true);

    // Save locally first (instant)
    registerByPhone(form.name, form.phone);

    // Send to Google Sheet in background (non-blocking)
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name.trim(), phone: form.phone.trim() }),
    }).catch(() => {/* silent — localStorage is the primary store */});

    // Small delay for UX feel, then navigate
    setTimeout(() => {
      router.push(next);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] grid lg:grid-cols-5 bg-cream">
      {/* Left editorial visual */}
      <div className="hidden lg:flex lg:col-span-2 relative bg-heading items-center justify-center px-12 py-16 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-md text-cream"
        >
          <div className="eyebrow text-accent mb-8">
            Doctor Hương Healthcare
          </div>

          <h1 className="font-display text-5xl xl:text-6xl mb-10 leading-[1.1] tracking-tight">
            Khóa học
            <br />
            tiểu đường
            <br />
            cùng Bác sĩ Hương
          </h1>

          <p className="text-cream/70 text-lg leading-relaxed">
            Cô chú lưu ý mỗi số điện thoại chỉ được đăng ký một lần để hệ thống nhớ được tiến độ của cô chú.
          </p>

          <div className="mt-16 pt-8 border-t border-cream/15">
            <div className="flex items-start gap-4">
              <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-cream/65 text-sm leading-relaxed">
                Thông tin của cô chú chỉ dùng để cá nhân hóa khóa học và liên hệ tư vấn khi cần.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="lg:col-span-3 flex items-center justify-center px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[460px]"
        >
          <div className="mb-10">
            <div className="eyebrow text-muted mb-4">Tham gia khóa học</div>
            <h2 className="font-display text-5xl lg:text-6xl text-heading mb-4 tracking-tight leading-[1.05]">
              Tên của cô chú là gì?
            </h2>
            <p className="text-muted text-base">
              Điền thông tin một lần — sau đó vào học bất cứ lúc nào.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-[13px] font-600 text-heading mb-2 tracking-wide"
              >
                Họ và tên <span className="text-warning">*</span>
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" aria-hidden="true" />
                <input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(null); }}
                  placeholder="Cô Lan / Chú Hùng..."
                  className="w-full h-[60px] pl-12 pr-4 rounded-2xl border border-heading/15 bg-white text-[17px] focus:outline-none focus:border-heading focus:ring-2 focus:ring-heading/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-[13px] font-600 text-heading mb-2 tracking-wide"
              >
                Số điện thoại <span className="text-warning">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" aria-hidden="true" />
                <input
                  id="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => { setForm({ ...form, phone: e.target.value }); setError(null); }}
                  placeholder="0900 000 000"
                  className="w-full h-[60px] pl-12 pr-4 rounded-2xl border border-heading/15 bg-white text-[17px] focus:outline-none focus:border-heading focus:ring-2 focus:ring-heading/10 transition-all"
                />
              </div>
              <p className="text-xs text-muted mt-2 ml-1">
                Nếu cần liên lạc tư vấn, đội ngũ sẽ gọi đến số này.
              </p>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-warning/20 px-4 py-3 text-sm text-warning">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="group w-full h-[60px] mt-3 rounded-full bg-heading text-cream font-500 text-[15px] hover:bg-heading/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Đang chuẩn bị khóa học..."
              ) : (
                <>
                  <span>Bắt đầu vào học</span>
                  <span className="w-11 h-11 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-heading/10">
            <p className="text-sm text-muted leading-relaxed">
              Bằng cách điền thông tin, cô chú đồng ý rằng đây là{" "}
              <strong className="text-heading">tài liệu giáo dục sức khỏe</strong>, không thay thế bác sĩ điều trị.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ThamGiaPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <FormInner />
    </Suspense>
  );
}
