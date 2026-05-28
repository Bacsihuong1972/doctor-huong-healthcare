"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

// ─── Protein foods (~20g protein each) ────────────────────────────────────────
// Nguồn tham khảo hàm lượng: USDA FoodData Central, Viện Dinh dưỡng Quốc gia VN

const PROTEIN_FOODS = [
  { emoji: "🥚", name: "3 quả trứng gà",             detail: "(khoảng 180g)" },
  { emoji: "🍗", name: "½ ức gà nạc",                detail: "(65g)" },
  { emoji: "🥩", name: "¾ phần thịt heo/bò nạc",    detail: "(75g)" },
  { emoji: "🐟", name: "1 khẩu phần cá",             detail: "(75g — cá thu, cá ngừ, cá hồi)" },
  { emoji: "🦐", name: "1 nắm tôm vừa",              detail: "(85g)" },
  { emoji: "🫘", name: "1 miếng đậu phụ lớn",       detail: "(250g — đậu phụ cứng)" },
  { emoji: "🥛", name: "1 hũ sữa chua không đường", detail: "(200g — loại đặc nguyên kem)" },
  { emoji: "🫛", name: "1 lon đậu lăng chín",        detail: "(220g — đã ráo nước)" },
  { emoji: "🥜", name: "3 muỗng canh bơ đậu phộng", detail: "(80–90g)" },
];

// ─── Scientific calculation ───────────────────────────────────────────────────
//
// Bước 1 — BMI
//   BMI = cân nặng (kg) / chiều cao² (m)
//   Phân loại WHO (2004, dành cho người châu Á):
//     < 18.5  Thiếu cân
//     18.5–22.9  Bình thường
//     23–27.4  Thừa cân
//     ≥ 27.5  Béo phì
//
// Bước 2 — Cân nặng lý tưởng (IBW — Ideal Body Weight)
//   Công thức Devine (1974), phiên bản mét:
//     Nam:  IBW = 50   + 0.9 × (chiều cao cm − 152)
//     Nữ:   IBW = 45.5 + 0.9 × (chiều cao cm − 152)
//   Nguồn: Devine BJ. Drug Intell Clin Pharm. 1974;8:650–655.
//
// Bước 3 — Cân nặng hiệu chỉnh (AdjBW) khi béo phì (BMI ≥ 27.5 châu Á)
//   AdjBW = IBW + 0.4 × (cân nặng thực − IBW)
//   Nguồn: ASPEN Clinical Guidelines. JPEN. 2016;40(2):159–211.
//
// Bước 4 — Cân nặng tham chiếu để tính đạm
//   BMI < 18.5  → dùng cân nặng thực (tránh hạn chế đạm khi thiếu cân)
//   BMI 18.5–27.4 → dùng cân nặng thực
//   BMI ≥ 27.5  → dùng AdjBW (tránh tính quá mức cho mỡ)
//
// Bước 5 — Hệ số đạm theo tuổi
//   18–50 tuổi: 0.83–1.0 g/kg/ngày   — WHO/FAO/UNU 2007
//   51–64 tuổi: 1.0–1.2 g/kg/ngày   — PROT-AGE Study Group 2013 (Eur J Clin Nutr)
//   ≥ 65 tuổi:  1.2–1.5 g/kg/ngày   — ESPEN Guidelines 2018 (Clin Nutr)

interface CalcResult {
  bmi: number;
  bmiCategory: string;
  ibw: number;
  refWeight: number;
  refWeightLabel: string;
  minProtein: number;
  maxProtein: number;
  tier: "adult" | "middle" | "senior";
  name: string;
}

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Thiếu cân";
  if (bmi < 23)   return "Bình thường";
  if (bmi < 27.5) return "Thừa cân";
  return "Béo phì";
}

function calculate(
  weight: number,
  height: number, // cm
  age: number,
  sex: string
): CalcResult {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const bmiCategory = getBmiCategory(bmi);

  // IBW (Devine 1974 — metric)
  const ibw = Math.round(
    (sex === "nu" ? 45.5 : 50) + 0.9 * (height - 152)
  );

  // Reference weight
  let refWeight: number;
  let refWeightLabel: string;
  if (bmi >= 27.5) {
    // Adjusted Body Weight (ASPEN)
    const adjBW = ibw + 0.4 * (weight - ibw);
    refWeight = Math.round(adjBW);
    refWeightLabel = "Cân nặng hiệu chỉnh (AdjBW)";
  } else {
    refWeight = weight;
    refWeightLabel = "Cân nặng thực tế";
  }

  // Protein factors by age
  let minFactor: number;
  let maxFactor: number;
  let tier: CalcResult["tier"];
  if (age >= 65) {
    minFactor = 1.2; maxFactor = 1.5; tier = "senior";
  } else if (age >= 51) {
    minFactor = 1.0; maxFactor = 1.2; tier = "middle";
  } else {
    minFactor = 0.83; maxFactor = 1.0; tier = "adult";
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    ibw,
    refWeight,
    refWeightLabel,
    minProtein: Math.round(minFactor * refWeight),
    maxProtein: Math.round(maxFactor * refWeight),
    tier,
    name: "",
  };
}

const TIER_NOTE: Record<string, string> = {
  adult:  "18–50 tuổi: 0.83–1.0 g đạm / kg / ngày — theo WHO/FAO/UNU 2007.",
  middle: "51–64 tuổi: 1.0–1.2 g đạm / kg / ngày — PROT-AGE Study Group 2013.",
  senior: "≥ 65 tuổi: 1.2–1.5 g đạm / kg / ngày — ESPEN Guidelines 2018, để phòng ngừa suy mòn cơ (sarcopenia).",
};

const BMI_COLOR: Record<string, string> = {
  "Thiếu cân":  "text-blue-600  bg-blue-50  border-blue-200",
  "Bình thường":"text-primary   bg-primary/6 border-primary/20",
  "Thừa cân":   "text-amber-600 bg-amber-50  border-amber-200",
  "Béo phì":    "text-warning   bg-red-50    border-warning/20",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TinhLuongDanPage() {
  const [form, setForm] = useState({
    name: "", weight: "", height: "", age: "", sex: "",
  });
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError]   = useState("");

  const set = (key: string, val: string) =>
    setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const weight = parseFloat(form.weight);
    const height = parseFloat(form.height);
    const age    = parseInt(form.age);

    if (!weight || weight < 20 || weight > 300)
      return setError("Cân nặng hợp lệ từ 20 – 300 kg.");
    if (!height || height < 100 || height > 230)
      return setError("Chiều cao hợp lệ từ 100 – 230 cm.");
    if (!age || age < 18 || age > 110)
      return setError("Tuổi hợp lệ từ 18 – 110.");
    if (!form.sex)
      return setError("Vui lòng chọn giới tính.");

    const res = calculate(weight, height, age, form.sex);
    res.name = form.name.trim() || "bạn";
    setResult(res);
  };

  const input =
    "w-full h-[52px] px-4 rounded-2xl border border-heading/15 bg-white " +
    "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 " +
    "text-heading text-[15px] transition-all placeholder:text-muted/50";

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-12 md:pt-20 md:pb-16 border-b border-heading/8">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 text-center">
          <div className="eyebrow text-muted mb-5">№ — Công cụ dinh dưỡng</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[64px] text-heading leading-[1.08] tracking-tight mb-5">
            Tính lượng đạm
            <br />
            cần thiết mỗi ngày
          </h1>
          <p className="text-base text-muted max-w-sm mx-auto leading-relaxed">
            Tính theo cân nặng, chiều cao và độ tuổi — dựa trên công thức Devine (1974),
            ASPEN và khuyến nghị WHO, ESPEN.
          </p>
        </div>
      </section>

      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20">
        <div className="max-w-[600px] mx-auto px-5 sm:px-8">
          <AnimatePresence mode="wait">

            {/* ── Form ── */}
            {!result && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="bg-paper rounded-3xl border border-heading/8 shadow-card p-8 md:p-10"
              >
                <h2 className="font-display text-2xl md:text-3xl text-heading text-center mb-8">
                  Thông tin của cô chú
                </h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Tên */}
                  <div>
                    <label className="block text-sm font-600 text-heading mb-2">
                      Tên <span className="text-muted font-400">(để cá nhân hóa)</span>
                    </label>
                    <input type="text" value={form.name}
                      onChange={e => set("name", e.target.value)}
                      placeholder="Cô Lan / Chú Hùng..."
                      className={input} />
                  </div>

                  {/* Cân nặng + Chiều cao */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-600 text-heading mb-2">
                        Cân nặng (kg) <span className="text-warning">*</span>
                      </label>
                      <input type="number" inputMode="decimal"
                        value={form.weight} onChange={e => set("weight", e.target.value)}
                        placeholder="60" min={20} max={300}
                        className={input} />
                    </div>
                    <div>
                      <label className="block text-sm font-600 text-heading mb-2">
                        Chiều cao (cm) <span className="text-warning">*</span>
                      </label>
                      <input type="number" inputMode="decimal"
                        value={form.height} onChange={e => set("height", e.target.value)}
                        placeholder="160" min={100} max={230}
                        className={input} />
                    </div>
                  </div>

                  {/* Tuổi */}
                  <div>
                    <label className="block text-sm font-600 text-heading mb-2">
                      Tuổi <span className="text-warning">*</span>
                    </label>
                    <input type="number" inputMode="numeric"
                      value={form.age} onChange={e => set("age", e.target.value)}
                      placeholder="55" min={18} max={110}
                      className={input} />
                  </div>

                  {/* Giới tính */}
                  <div>
                    <label className="block text-sm font-600 text-heading mb-2">
                      Giới tính <span className="text-warning">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ v: "nu", l: "Nữ" }, { v: "nam", l: "Nam" }].map(o => (
                        <button key={o.v} type="button" onClick={() => set("sex", o.v)}
                          className={`h-[52px] rounded-2xl border text-[15px] font-500 transition-all ${
                            form.sex === o.v
                              ? "border-primary bg-primary/8 text-heading font-600"
                              : "border-heading/15 bg-white text-muted hover:border-heading/30 hover:text-heading"
                          }`}>
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <p className="text-warning text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <button type="submit"
                    className="w-full h-[56px] rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/85 transition-colors mt-2">
                    Tính lượng đạm của tôi
                  </button>
                </form>

                <p className="text-[11px] text-muted text-center mt-6 leading-relaxed">
                  Công thức: Devine 1974 · ASPEN 2016 · WHO/FAO/UNU 2007 · PROT-AGE 2013 · ESPEN 2018
                </p>
              </motion.div>
            )}

            {/* ── Result ── */}
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <div className="bg-paper rounded-3xl border border-heading/8 shadow-card p-8 md:p-10 mb-5">

                  <h2 className="font-display text-3xl text-heading text-center mb-7">
                    Kết quả của {result.name}
                  </h2>

                  {/* ── Step 1: BMI ── */}
                  <div className="mb-5">
                    <p className="text-xs font-600 text-muted uppercase tracking-wider mb-3">
                      Bước 1 — Chỉ số BMI
                    </p>
                    <div className={`flex items-center justify-between rounded-2xl border px-5 py-4 ${BMI_COLOR[result.bmiCategory]}`}>
                      <span className="text-sm font-600">BMI = {result.bmi}</span>
                      <span className="text-sm font-700">{result.bmiCategory}</span>
                    </div>
                  </div>

                  {/* ── Step 2: IBW & ref weight ── */}
                  <div className="mb-5">
                    <p className="text-xs font-600 text-muted uppercase tracking-wider mb-3">
                      Bước 2 — Cân nặng tham chiếu
                    </p>
                    <div className="bg-heading/4 rounded-2xl px-5 py-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Cân nặng lý tưởng (IBW)</span>
                        <span className="font-700 text-heading">{result.ibw} kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">{result.refWeightLabel}</span>
                        <span className="font-700 text-heading">{result.refWeight} kg</span>
                      </div>
                    </div>
                    {result.bmiCategory === "Béo phì" && (
                      <p className="text-[11px] text-muted mt-2 leading-relaxed px-1">
                        Do BMI ≥ 27.5, áp dụng cân nặng hiệu chỉnh AdjBW = IBW + 0.4 × (cân nặng thực − IBW) — theo ASPEN 2016 — để tránh tính quá mức nhu cầu đạm.
                      </p>
                    )}
                  </div>

                  {/* ── Step 3: Protein result ── */}
                  <div className="mb-6">
                    <p className="text-xs font-600 text-muted uppercase tracking-wider mb-3">
                      Bước 3 — Lượng đạm cần thiết
                    </p>
                    <div className="bg-primary/6 border border-primary/15 rounded-2xl px-6 py-6 text-center">
                      <p className="text-sm text-muted mb-2">Lý tưởng mỗi ngày</p>
                      <p className="font-display text-5xl md:text-6xl text-heading leading-none">
                        {result.minProtein}
                        <span className="text-2xl text-muted mx-2">–</span>
                        {result.maxProtein}
                      </p>
                      <p className="text-sm text-muted mt-2">gram protein / ngày</p>
                    </div>
                    <p className="text-[11px] text-muted mt-2 leading-relaxed px-1">
                      {TIER_NOTE[result.tier]}
                    </p>
                  </div>

                  {/* ── Foods ── */}
                  <div className="border-t border-heading/8 pt-6">
                    <p className="text-sm text-text text-center mb-6 leading-relaxed">
                      Mỗi phần dưới đây chứa khoảng{" "}
                      <strong className="text-heading font-700">20g đạm</strong> — ghép các phần trong ngày để đạt mức trên.
                    </p>
                    <div className="grid grid-cols-3 gap-5">
                      {PROTEIN_FOODS.map((f, i) => (
                        <div key={i} className="text-center">
                          <div className="text-4xl mb-2 leading-none">{f.emoji}</div>
                          <div className="text-[13px] font-600 text-heading leading-snug mb-0.5">{f.name}</div>
                          <div className="text-[11px] text-muted leading-snug">{f.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kidney warning */}
                <div className="bg-amber-50 border border-amber-200/70 rounded-2xl p-5 mb-5">
                  <p className="text-[12px] text-amber-800 leading-relaxed">
                    <strong>Lưu ý:</strong> Người bị bệnh thận mãn tính (CKD giai đoạn 3–5) cần giảm đạm xuống 0.6–0.8 g/kg/ngày — tham khảo bác sĩ trước khi thay đổi chế độ ăn. Công cụ này chỉ mang tính giáo dục sức khỏe, không thay thế tư vấn y tế.
                  </p>
                </div>

                <button onClick={() => { setResult(null); setError(""); }}
                  className="w-full h-[52px] rounded-full border border-heading/20 text-heading font-600 text-[14px] hover:bg-heading/5 transition-colors flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Tính lại
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
