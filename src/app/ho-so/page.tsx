"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User as UserIcon, Phone, LogOut, Edit3, Save,
  BookOpen, Award, Calendar, ArrowUpRight
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { lessons } from "@/data/lessons";

export default function HoSoPage() {
  const router = useRouter();
  const { user, loading, logout, update } = useAuth();
  const { completedCount } = useProgress();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    condition: "type2" as "type2" | "prediabetes" | "elderly" | "other",
    usesMedication: false,
    usesInsulin: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/tham-gia");
    }
    if (user) {
      setForm({
        name: user.name ?? "",
        phone: user.phone ?? "",
        age: user.age ? String(user.age) : "",
        condition: (user.condition as typeof form.condition) ?? "type2",
        usesMedication: !!user.usesMedication,
        usesInsulin: !!user.usesInsulin,
      });
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-muted">Đang tải...</div>;
  }

  const handleSave = () => {
    update({
      name: form.name,
      phone: form.phone,
      age: form.age ? parseInt(form.age) : undefined,
      condition: form.condition,
      usesMedication: form.usesMedication,
      usesInsulin: form.usesInsulin,
    });
    setEditing(false);
  };

  const conditionLabel = {
    type2: "Tiểu đường type 2",
    prediabetes: "Tiền tiểu đường",
    elderly: "Người cao tuổi - phòng ngừa",
    other: "Khác",
  };

  const totalLessons = lessons.length;
  const percentage = Math.round((completedCount / totalLessons) * 100);
  const daysJoined = Math.max(
    1,
    Math.floor((Date.now() - new Date(user.createdAt).getTime()) / 86400000)
  );

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-12 md:py-20">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="eyebrow text-muted mb-4">№ — Hồ sơ</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[88px] text-heading leading-[1.05] tracking-tight">
            Xin chào,
            <br />
            {user.name}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Stats sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="bg-heading text-cream rounded-3xl p-8 md:p-10">
              <Award className="w-8 h-8 text-accent mb-6" />
              <div className="font-display text-7xl tabular leading-none mb-2">
                {completedCount}<span className="text-cream/40 text-5xl">/{totalLessons}</span>
              </div>
              <div className="text-sm text-cream/70 mb-6">Bài đã hoàn thành</div>
              <div className="h-1 bg-cream/15 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-cream"
                />
              </div>
              <div className="text-xs text-cream/50 mt-2">{percentage}%</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-paper rounded-2xl p-6 border border-heading/8">
                <Calendar className="w-5 h-5 text-primary mb-3" />
                <div className="font-display text-3xl text-heading">{daysJoined}</div>
                <div className="text-xs text-muted mt-1">Ngày đồng hành</div>
              </div>
              <Link
                href="/khoa-hoc"
                className="bg-paper hover:bg-card rounded-2xl p-6 border border-heading/8 group transition-colors"
              >
                <BookOpen className="w-5 h-5 text-primary mb-3" />
                <div className="font-display text-lg text-heading leading-tight">Tiếp tục học</div>
                <div className="text-xs text-muted mt-1 flex items-center gap-1">
                  Vào dashboard <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Profile form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-heading/8 shadow-soft">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="eyebrow text-muted mb-2">Thông tin cá nhân</div>
                  <h2 className="font-display text-3xl text-heading">Hồ sơ</h2>
                </div>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-heading/12 hover:border-heading/30 transition-colors text-sm font-600"
                  >
                    <Edit3 className="w-4 h-4" /> Chỉnh sửa
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start py-4 border-b border-heading/8">
                  <div className="eyebrow text-muted mt-1">
                    <UserIcon className="w-4 h-4 inline mr-1.5 mb-0.5" />
                    Họ và tên
                  </div>
                  {editing ? (
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="md:col-span-2 h-12 px-4 rounded-xl border border-heading/15 bg-white focus:outline-none focus:border-heading"
                    />
                  ) : (
                    <p className="md:col-span-2 font-display text-xl text-heading">{user.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start py-4 border-b border-heading/8">
                  <div className="eyebrow text-muted mt-1">
                    <Phone className="w-4 h-4 inline mr-1.5 mb-0.5" />
                    Số điện thoại
                  </div>
                  {editing ? (
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="md:col-span-2 h-12 px-4 rounded-xl border border-heading/15 bg-white focus:outline-none focus:border-heading"
                    />
                  ) : (
                    <p className="md:col-span-2 font-display text-xl text-heading">{user.phone}</p>
                  )}
                </div>

                {/* Age */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start py-4 border-b border-heading/8">
                  <div className="eyebrow text-muted mt-1">Tuổi</div>
                  {editing ? (
                    <input
                      type="number"
                      min="18"
                      max="120"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      placeholder="65"
                      className="md:col-span-2 h-12 px-4 rounded-xl border border-heading/15 bg-white focus:outline-none focus:border-heading"
                    />
                  ) : (
                    <p className="md:col-span-2 font-display text-xl text-heading">
                      {user.age ?? <span className="text-muted not-italic">Chưa cập nhật</span>}
                    </p>
                  )}
                </div>

                {/* Condition */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start py-4 border-b border-heading/8">
                  <div className="eyebrow text-muted mt-1">Tình trạng</div>
                  {editing ? (
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(conditionLabel).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setForm({ ...form, condition: key as typeof form.condition })}
                          className={`h-11 px-4 rounded-full border text-sm font-500 transition-colors ${
                            form.condition === key
                              ? "bg-heading text-cream border-heading"
                              : "border-heading/15 text-heading hover:border-heading/30"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="md:col-span-2 font-display text-xl text-heading">
                      {user.condition ? conditionLabel[user.condition] : <span className="text-muted not-italic">Chưa cập nhật</span>}
                    </p>
                  )}
                </div>

                {/* Medication checkboxes - only in edit mode */}
                {editing && (
                  <div className="py-4 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.usesMedication}
                        onChange={(e) => setForm({ ...form, usesMedication: e.target.checked })}
                        className="w-5 h-5 accent-primary"
                      />
                      <span>Đang dùng thuốc tiểu đường</span>
                    </label>
                    {form.usesMedication && (
                      <label className="flex items-center gap-3 cursor-pointer ml-8">
                        <input
                          type="checkbox"
                          checked={form.usesInsulin}
                          onChange={(e) => setForm({ ...form, usesInsulin: e.target.checked })}
                          className="w-5 h-5 accent-primary"
                        />
                        <span>Đang dùng insulin</span>
                      </label>
                    )}
                  </div>
                )}

                {editing && (
                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-heading text-cream font-600 hover:bg-heading/90 transition-colors"
                    >
                      <Save className="w-4 h-4" /> Lưu thay đổi
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="h-12 px-6 rounded-full border border-heading/15 text-heading hover:bg-paper transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Logout */}
            <div className="mt-6">
              <button
                onClick={() => { logout(); router.push("/"); }}
                className="inline-flex items-center gap-2 text-sm text-warning hover:underline"
              >
                <LogOut className="w-4 h-4" /> Thoát tài khoản
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
