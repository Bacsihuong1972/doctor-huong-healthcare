"use client";
import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, User as UserIcon, Mail, Lock,
  ArrowUpRight, Shield, Eye, EyeOff,
} from "lucide-react";
import {
  registerUser, loginUser, isPhoneRegistered,
} from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

// ─── Duplicate-phone popup ─────────────────────────────────────────────────────

function DuplicatePopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-heading/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-3xl shadow-premium p-8 max-w-sm w-full text-center"
        role="alertdialog"
        aria-modal="true"
        aria-label="Số điện thoại đã đăng ký"
      >
        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-5">
          <Phone className="w-6 h-6 text-accent" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl text-heading mb-3">
          Số điện thoại đã đăng ký
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-6">
          Số điện thoại này đã được đăng ký. Vui lòng sử dụng tab{" "}
          <strong className="text-heading">Đăng nhập</strong> để vào khóa học.
        </p>
        <button
          onClick={onClose}
          className="w-full h-[52px] rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/90 transition-colors"
        >
          Đã hiểu — chuyển sang đăng nhập
        </button>
      </motion.div>
    </div>
  );
}

// ─── Inner form (needs useSearchParams inside Suspense) ───────────────────────

function FormInner() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Already signed in → go straight to lessons
  useEffect(() => {
    if (!authLoading && user) router.replace("/khoa-hoc");
  }, [user, authLoading, router]);

  const [tab, setTab] = useState<"register" | "login">("register");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDuplicate, setShowDuplicate] = useState(false);

  // Password visibility
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Register fields
  const [reg, setReg] = useState({
    name: "", phone: "", email: "", password: "", confirm: "",
  });

  // Login fields
  const [lgn, setLgn] = useState({ phone: "", password: "" });

  const isValidPhone = (p: string) => {
    const d = p.replace(/\D/g, "");
    return d.length >= 9 && d.length <= 11;
  };
  const clearErr = () => setError(null);

  // ── Register ──────────────────────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErr();

    if (reg.name.trim().length < 2) {
      setError("Vui lòng nhập họ và tên của cô chú"); return;
    }
    if (!isValidPhone(reg.phone)) {
      setError("Số điện thoại chưa đúng định dạng"); return;
    }
    if (reg.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự"); return;
    }
    if (reg.password !== reg.confirm) {
      setError("Mật khẩu nhập lại không khớp"); return;
    }

    // Sync pre-check (fast path)
    if (isPhoneRegistered(reg.phone)) {
      setShowDuplicate(true); return;
    }

    setSubmitting(true);
    const result = await registerUser(
      reg.name, reg.phone, reg.password, reg.confirm,
      reg.email || undefined,
    );
    setSubmitting(false);

    if (!result.ok) {
      if (result.error === "phone_taken") { setShowDuplicate(true); return; }
      if (result.error === "password_mismatch") { setError("Mật khẩu nhập lại không khớp"); return; }
      setError("Có lỗi xảy ra, vui lòng thử lại");
      return;
    }

    // Background: sync to Google Sheet
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: reg.name.trim(),
        phone: reg.phone.trim(),
        email: reg.email.trim(),
      }),
    }).catch(() => {});

    router.push("/khoa-hoc");
  };

  // ── Login ─────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErr();

    if (!isValidPhone(lgn.phone)) {
      setError("Số điện thoại chưa đúng định dạng"); return;
    }
    if (!lgn.password) {
      setError("Vui lòng nhập mật khẩu"); return;
    }

    setSubmitting(true);
    const result = await loginUser(lgn.phone, lgn.password);
    setSubmitting(false);

    if (!result.ok) {
      setError(
        result.error === "not_found"
          ? "Số điện thoại này chưa được đăng ký"
          : "Mật khẩu không đúng, vui lòng thử lại"
      );
      return;
    }

    router.push("/khoa-hoc");
  };

  // When closing the duplicate popup → switch to login + prefill phone
  const closeDuplicate = () => {
    setShowDuplicate(false);
    setTab("login");
    setLgn((prev) => ({ ...prev, phone: reg.phone }));
    clearErr();
  };

  // Input base classes
  const inputCls =
    "w-full h-[56px] pl-11 pr-4 rounded-2xl border border-heading/15 bg-white text-[16px] focus:outline-none focus:border-heading focus:ring-2 focus:ring-heading/10 transition-all placeholder:text-muted/50";
  const inputClsR = inputCls.replace("pr-4", "pr-12"); // right padding for eye button

  return (
    <>
      <AnimatePresence>
        {showDuplicate && <DuplicatePopup onClose={closeDuplicate} />}
      </AnimatePresence>

      <div className="min-h-[calc(100vh-72px)] grid lg:grid-cols-5 bg-cream">

        {/* ── Left editorial ─────────────────────────────────────────────── */}
        <div className="hidden lg:flex lg:col-span-2 relative bg-heading items-center justify-center px-12 py-16 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative max-w-md text-cream"
          >
            <div className="eyebrow text-accent mb-8">Doctor Hương Healthcare</div>
            <h1 className="font-display text-5xl xl:text-6xl mb-10 leading-[1.1] tracking-tight">
              Khóa học<br />tiểu đường<br />cùng Bác sĩ Hương
            </h1>
            <p className="text-cream/70 text-lg leading-relaxed">
              Mỗi số điện thoại chỉ đăng ký một lần — hệ thống sẽ ghi nhớ tiến độ học của cô chú.
            </p>
            <div className="mt-16 pt-8 border-t border-cream/15 flex items-start gap-4">
              <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-cream/65 text-sm leading-relaxed">
                Thông tin của cô chú chỉ dùng để cá nhân hóa khóa học và liên hệ tư vấn khi cần.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Right form ────────────────────────────────────────────────── */}
        <div className="lg:col-span-3 flex items-start justify-center px-6 py-12 lg:py-16 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[460px]"
          >
            {/* Heading */}
            <div className="mb-8">
              <div className="eyebrow text-muted mb-4">Khóa học 1 · 799.000đ</div>
              <h2 className="font-display text-4xl lg:text-5xl text-heading mb-3 tracking-tight leading-[1.05]">
                {tab === "register" ? "Tạo tài khoản" : "Đăng nhập"}
              </h2>
              <p className="text-muted text-base">
                {tab === "register"
                  ? "Điền thông tin một lần — sau đó vào học bất cứ lúc nào."
                  : "Dùng số điện thoại và mật khẩu đã đăng ký."}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex p-1 rounded-2xl bg-heading/6 mb-8" role="tablist">
              {(["register", "login"] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => { setTab(t); clearErr(); }}
                  className={`flex-1 h-11 rounded-xl text-[14px] font-600 transition-all ${
                    tab === t
                      ? "bg-white text-heading shadow-sm"
                      : "text-muted hover:text-heading"
                  }`}
                >
                  {t === "register" ? "Đăng ký" : "Đăng nhập"}
                </button>
              ))}
            </div>

            {/* ── Register form ── */}
            {tab === "register" && (
              <form onSubmit={handleRegister} className="space-y-4" noValidate>
                {/* Họ và tên */}
                <div>
                  <label htmlFor="reg-name" className="block text-[13px] font-600 text-heading mb-2">
                    Họ và tên <span className="text-warning">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                    <input
                      id="reg-name" type="text" required autoFocus
                      value={reg.name}
                      onChange={(e) => { setReg({ ...reg, name: e.target.value }); clearErr(); }}
                      placeholder="Cô Lan / Chú Hùng..."
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Số điện thoại */}
                <div>
                  <label htmlFor="reg-phone" className="block text-[13px] font-600 text-heading mb-2">
                    Số điện thoại <span className="text-warning">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                    <input
                      id="reg-phone" type="tel" required inputMode="numeric"
                      value={reg.phone}
                      onChange={(e) => { setReg({ ...reg, phone: e.target.value }); clearErr(); }}
                      placeholder="0900 000 000"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Email Gmail (optional) */}
                <div>
                  <label htmlFor="reg-email" className="block text-[13px] font-600 text-heading mb-2">
                    Email Gmail{" "}
                    <span className="text-muted font-400">(Nếu có)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                    <input
                      id="reg-email" type="email"
                      value={reg.email}
                      onChange={(e) => { setReg({ ...reg, email: e.target.value }); clearErr(); }}
                      placeholder="cochu@gmail.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Mật khẩu */}
                <div>
                  <label htmlFor="reg-password" className="block text-[13px] font-600 text-heading mb-2">
                    Mật khẩu <span className="text-warning">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                    <input
                      id="reg-password"
                      type={showRegPass ? "text" : "password"}
                      required
                      value={reg.password}
                      onChange={(e) => { setReg({ ...reg, password: e.target.value }); clearErr(); }}
                      placeholder="Ít nhất 6 ký tự"
                      className={inputClsR}
                    />
                    <button
                      type="button" tabIndex={-1}
                      onClick={() => setShowRegPass(!showRegPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-heading transition-colors"
                      aria-label={showRegPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showRegPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Nhập lại mật khẩu */}
                <div>
                  <label htmlFor="reg-confirm" className="block text-[13px] font-600 text-heading mb-2">
                    Nhập lại mật khẩu <span className="text-warning">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                    <input
                      id="reg-confirm"
                      type={showRegConfirm ? "text" : "password"}
                      required
                      value={reg.confirm}
                      onChange={(e) => { setReg({ ...reg, confirm: e.target.value }); clearErr(); }}
                      placeholder="Nhập lại mật khẩu"
                      className={inputClsR}
                    />
                    <button
                      type="button" tabIndex={-1}
                      onClick={() => setShowRegConfirm(!showRegConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-heading transition-colors"
                      aria-label={showRegConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showRegConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-warning/20 px-4 py-3 text-sm text-warning" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full h-[56px] mt-2 rounded-full bg-heading text-cream font-500 text-[15px] hover:bg-heading/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Đang tạo tài khoản..." : (
                    <>
                      <span>Đăng ký và vào học</span>
                      <span className="w-10 h-10 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ── Login form ── */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4" noValidate>
                {/* Số điện thoại */}
                <div>
                  <label htmlFor="login-phone" className="block text-[13px] font-600 text-heading mb-2">
                    Số điện thoại <span className="text-warning">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                    <input
                      id="login-phone" type="tel" required inputMode="numeric" autoFocus
                      value={lgn.phone}
                      onChange={(e) => { setLgn({ ...lgn, phone: e.target.value }); clearErr(); }}
                      placeholder="0900 000 000"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Mật khẩu */}
                <div>
                  <label htmlFor="login-password" className="block text-[13px] font-600 text-heading mb-2">
                    Mật khẩu <span className="text-warning">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
                    <input
                      id="login-password"
                      type={showLoginPass ? "text" : "password"}
                      required
                      value={lgn.password}
                      onChange={(e) => { setLgn({ ...lgn, password: e.target.value }); clearErr(); }}
                      placeholder="Mật khẩu của cô chú"
                      className={inputClsR}
                    />
                    <button
                      type="button" tabIndex={-1}
                      onClick={() => setShowLoginPass(!showLoginPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-heading transition-colors"
                      aria-label={showLoginPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-warning/20 px-4 py-3 text-sm text-warning" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full h-[56px] mt-2 rounded-full bg-heading text-cream font-500 text-[15px] hover:bg-heading/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Đang đăng nhập..." : (
                    <>
                      <span>Đăng nhập và vào học</span>
                      <span className="w-10 h-10 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-muted pt-1">
                  Chưa có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() => { setTab("register"); clearErr(); }}
                    className="text-heading font-600 underline underline-offset-2 hover:no-underline transition-all"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              </form>
            )}

            {/* Disclaimer */}
            <div className="mt-6 pt-6 border-t border-heading/10">
              <p className="text-sm text-muted leading-relaxed">
                Bằng cách đăng ký, cô chú đồng ý rằng đây là{" "}
                <strong className="text-heading">tài liệu giáo dục sức khỏe</strong>
                , không thay thế bác sĩ điều trị.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function ThamGiaPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <FormInner />
    </Suspense>
  );
}
