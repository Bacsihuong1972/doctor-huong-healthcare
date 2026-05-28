"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RotateCcw, ArrowUpRight, ArrowLeft, Check } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type AnswerKey = "A" | "B" | "C" | "D";
type ResultCase = "STABLE" | "MODERATE" | "HEAVY" | "INSULIN_RESISTANCE" | "PREDIABETES" | "DIABETES_T2";
type Stage = "idle" | "active" | "done";

interface Option {
  label: AnswerKey;
  text: string;
  score: number;
  skipScore?: boolean;
}
interface Question {
  id: number;
  key: string;
  emoji: string;
  section?: string;
  question: string;
  options: Option[];
}

// ─── Questions ───────────────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: 1, key: "q1", emoji: "🍚",
    section: "Phần 1 — Triệu chứng hàng ngày",
    question: "Sau bữa cơm trắng, cô chú thường cảm thấy thế nào?",
    options: [
      { label: "A", text: "Bình thường, tỉnh táo như trước", score: 0 },
      { label: "B", text: "Hơi buồn ngủ nhưng vẫn làm việc bình thường", score: 1 },
      { label: "C", text: "Buồn ngủ nặng, uể oải 1–2 tiếng sau ăn", score: 2 },
      { label: "D", text: "Rất mệt, muốn nằm xuống ngủ ngay", score: 2 },
    ],
  },
  {
    id: 2, key: "q2", emoji: "🍬",
    question: "Cô chú có thường xuyên thèm đồ ngọt hoặc tinh bột giữa các bữa ăn không?",
    options: [
      { label: "A", text: "Không bao giờ", score: 0 },
      { label: "B", text: "Thỉnh thoảng, 1–2 lần mỗi tuần", score: 1 },
      { label: "C", text: "Thường xuyên, vài lần mỗi ngày", score: 2 },
      { label: "D", text: "Hầu như lúc nào cũng thèm", score: 2 },
    ],
  },
  {
    id: 3, key: "q3", emoji: "⏰",
    question: "Sau bữa sáng, cô chú thường đói trở lại sau bao lâu?",
    options: [
      { label: "A", text: "Hơn 4 tiếng — no rất bền", score: 0 },
      { label: "B", text: "Khoảng 3–4 tiếng", score: 1 },
      { label: "C", text: "Khoảng 2–3 tiếng", score: 2 },
      { label: "D", text: "Dưới 2 tiếng / Tôi không ăn bữa sáng", score: 0, skipScore: true },
    ],
  },
  {
    id: 4, key: "q4", emoji: "😴",
    question: "Vào buổi chiều (khoảng 14–15 giờ), cô chú cảm thấy thế nào?",
    options: [
      { label: "A", text: "Tỉnh táo, làm việc bình thường", score: 0 },
      { label: "B", text: "Hơi uể oải nhưng qua nhanh", score: 1 },
      { label: "C", text: "Mệt rõ rệt, buồn ngủ, muốn nghỉ", score: 2 },
      { label: "D", text: "Không ăn bữa trưa nên buổi chiều rất đói", score: 0, skipScore: true },
    ],
  },
  {
    id: 5, key: "q5", emoji: "😤",
    question: "Khi bỏ bữa hoặc ăn trễ hơn giờ thường, cô chú cảm thấy thế nào?",
    options: [
      { label: "A", text: "Vẫn bình thường, chỉ hơi đói", score: 0 },
      { label: "B", text: "Hơi khó chịu nhưng tự kiểm soát được", score: 1 },
      { label: "C", text: "Dễ cáu kỉnh, khó tập trung", score: 2 },
      { label: "D", text: "Run tay, chóng mặt, mệt nhiều", score: 2 },
    ],
  },
  {
    id: 6, key: "q6", emoji: "🧠",
    question: "Cô chú có hay bị mất tập trung, đầu óc không được minh mẫn trong ngày không?",
    options: [
      { label: "A", text: "Không bao giờ", score: 0 },
      { label: "B", text: "Thỉnh thoảng", score: 1 },
      { label: "C", text: "Thường xuyên trong tuần", score: 2 },
      { label: "D", text: "Hầu như mỗi ngày", score: 2 },
    ],
  },
  {
    id: 7, key: "q7", emoji: "🌙",
    question: "Giấc ngủ của cô chú thế nào?",
    options: [
      { label: "A", text: "Ngủ ngon, không thức giữa đêm", score: 0 },
      { label: "B", text: "Thỉnh thoảng thức dậy giữa đêm", score: 1 },
      { label: "C", text: "Hay thức dậy, khó ngủ lại", score: 2 },
      { label: "D", text: "Mất ngủ thường xuyên", score: 2 },
    ],
  },
  {
    id: 8, key: "q8", emoji: "🤕",
    question: "Cô chú có bị đau đầu thường xuyên không?",
    options: [
      { label: "A", text: "Không bao giờ hoặc rất hiếm", score: 0 },
      { label: "B", text: "Thỉnh thoảng, 1–2 lần mỗi tháng", score: 1 },
      { label: "C", text: "Vài lần mỗi tuần", score: 2 },
      { label: "D", text: "Gần như mỗi ngày", score: 2 },
    ],
  },
  {
    id: 9, key: "q9", emoji: "⚖️",
    question: "Cân nặng của cô chú thay đổi thế nào trong thời gian gần đây?",
    options: [
      { label: "A", text: "Ổn định, không thay đổi nhiều", score: 0 },
      { label: "B", text: "Hơi khó giảm cân khi muốn", score: 1 },
      { label: "C", text: "Dù ăn ít vẫn tăng hoặc không giảm được", score: 2 },
      { label: "D", text: "Mỡ bụng tăng nhiều dù không ăn nhiều hơn", score: 2 },
    ],
  },
  {
    id: 10, key: "q10", emoji: "🧁",
    question: "Sau khi ăn đồ ngọt hoặc bữa nhiều tinh bột, cô chú cảm thấy thế nào?",
    options: [
      { label: "A", text: "Bình thường, không thấy khác biệt", score: 0 },
      { label: "B", text: "Hơi hứng phấn rồi mệt nhẹ", score: 1 },
      { label: "C", text: "Hứng phấn mạnh rồi mệt, lại thèm ăn thêm", score: 2 },
      { label: "D", text: "Tôi không ăn đồ ngọt", score: 0, skipScore: true },
    ],
  },
  {
    id: 11, key: "q11", emoji: "🩺",
    section: "Phần 2 — Tình trạng sức khỏe",
    question: "Cô chú đã được bác sĩ chẩn đoán kháng insulin chưa?",
    options: [
      { label: "A", text: "Có, bác sĩ đã xác nhận", score: 3 },
      { label: "B", text: "Không", score: 0 },
      { label: "C", text: "Trước đây có nhưng đã ổn hơn", score: 1 },
      { label: "D", text: "Không chắc / Chưa kiểm tra", score: 1 },
    ],
  },
  {
    id: 12, key: "q12", emoji: "🎯",
    question: "Cô chú có gặp khó khăn khi muốn giảm mỡ bụng dù đã cố gắng không?",
    options: [
      { label: "A", text: "Không, cân nặng khá ổn định", score: 0 },
      { label: "B", text: "Hơi khó giảm nhưng vẫn kiểm soát được", score: 1 },
      { label: "C", text: "Rất khó giảm dù đã cố gắng nhiều cách", score: 2 },
      { label: "D", text: "Tôi không cần giảm cân", score: 0 },
    ],
  },
  {
    id: 13, key: "q13", emoji: "⚠️",
    question: "Cô chú đã được bác sĩ chẩn đoán tiền đái tháo đường chưa?",
    options: [
      { label: "A", text: "Có, bác sĩ đã xác nhận", score: 0 },
      { label: "B", text: "Không", score: 0 },
      { label: "C", text: "Trước đây có nhưng đã ổn hơn", score: 0 },
      { label: "D", text: "Không chắc / Chưa kiểm tra", score: 0 },
    ],
  },
  {
    id: 14, key: "q14", emoji: "💊",
    question: "Cô chú hiện đang được chẩn đoán đái tháo đường type 2 không?",
    options: [
      { label: "A", text: "Có, đang điều trị", score: 0 },
      { label: "B", text: "Không", score: 0 },
      { label: "C", text: "Trước đây có nhưng đã kiểm soát tốt", score: 0 },
      { label: "D", text: "Không chắc", score: 0 },
    ],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────

function calcResult(answers: Record<string, AnswerKey>): ResultCase {
  const sym: Record<AnswerKey, number> = { A: 0, B: 1, C: 2, D: 2 };
  let symptomScore = 0;
  for (let i = 1; i <= 10; i++) {
    const key = `q${i}`;
    const ans = answers[key] as AnswerKey | undefined;
    if (!ans) continue;
    const q = questions.find((q) => q.key === key);
    const opt = q?.options.find((o) => o.label === ans);
    if (opt?.skipScore) continue;
    symptomScore += sym[ans] ?? 0;
  }
  const q11map: Record<AnswerKey, number> = { A: 3, B: 0, C: 1, D: 1 };
  const q12map: Record<AnswerKey, number> = { A: 0, B: 1, C: 2, D: 0 };
  const metabolicScore = (q11map[answers.q11] ?? 0) + (q12map[answers.q12] ?? 0);
  const total = symptomScore + metabolicScore;
  const t2 = answers.q14 === "A";
  const pre = answers.q13 === "A";
  const ins = answers.q11 === "A";
  if (t2) return "DIABETES_T2";
  if (pre) return "PREDIABETES";
  if (ins) return "INSULIN_RESISTANCE";
  if (total >= 13) return "HEAVY";
  if (total >= 5) return "MODERATE";
  return "STABLE";
}

// ─── Results ─────────────────────────────────────────────────────────────────

const RESULTS: Record<ResultCase, {
  icon: string;
  badge: string;
  badgeColor: string;
  headline: string;
  intro: string;
  hacks: { title: string; desc: string }[];
  courseRec: {
    eyebrow: string;
    courseTag: string;
    courseName: string;
    price: string;
    highlights: string[];
    href: string;
    cta: string;
    secondary?: {
      label: string;
      courseName: string;
      price: string;
      href: string;
      extras: string[];
    };
  };
  note?: string;
}> = {
  STABLE: {
    icon: "🌿",
    badge: "Ổn định",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
    headline: "Đường huyết của cô chú đang trong ngưỡng kiểm soát tốt",
    intro: "Không có dấu hiệu rõ ràng của tăng đường huyết sau ăn. Giai đoạn này rất thuận lợi để củng cố kiến thức và duy trì thói quen bền vững — phòng ngừa sớm tốt hơn can thiệp muộn.",
    hacks: [
      { title: "Ăn rau trước mỗi bữa", desc: "Chất xơ tạo lớp đệm trong ruột, làm phẳng đường cong glucose sau ăn." },
      { title: "Đi bộ 10 phút sau ăn", desc: "Cơ bắp hấp thu glucose mà không cần insulin — đơn giản và hiệu quả." },
      { title: "Phương pháp ba vùng", desc: "½ đĩa rau · ¼ đĩa đạm · ¼ đĩa tinh bột — áp dụng vào mâm cơm Việt." },
    ],
    courseRec: {
      eyebrow: "Phù hợp với cô chú",
      courseTag: "Tự học",
      courseName: "Hiểu Đúng Tiểu Đường",
      price: "799.000đ",
      highlights: [
        "16 video bài giảng khoa học",
        "90 ngày truy cập không giới hạn",
        "10 tài liệu PDF tải về",
        "Chứng chỉ hoàn thành khoá",
      ],
      href: "/tham-gia",
      cta: "Bắt đầu ngay",
      secondary: {
        label: "Muốn có chuyên gia theo dõi sát hơn?",
        courseName: "Kiểm Soát Chủ Động 90 Ngày",
        price: "2.999.000đ",
        href: "/lien-he",
        extras: ["6 buổi tư vấn 1-1", "Lộ trình 28 ngày", "Bữa ăn cá nhân hóa"],
      },
    },
  },
  MODERATE: {
    icon: "⚡",
    badge: "Cần chú ý",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
    headline: "Cơ thể đang xuất hiện tín hiệu của dao động đường huyết",
    intro: "Mệt mỏi sau ăn, thèm ngọt và khó tập trung là biểu hiện phổ biến khi đỉnh glucose sau bữa chưa được kiểm soát. Can thiệp ở giai đoạn này cho hiệu quả rõ rệt nhất — thường thấy cải thiện trong 2–3 tuần.",
    hacks: [
      { title: "Bữa sáng có đạm", desc: "Trứng, rau, đậu phụ thay vì cháo trắng hay bánh mì ngọt. Ổn định năng lượng cả ngày." },
      { title: "Ăn rau trước, cơm sau", desc: "Thứ tự ăn đúng giảm đỉnh glucose sau ăn đến 75%." },
      { title: "Đi bộ 10 phút sau ăn", desc: "Công cụ đơn giản nhất và hiệu quả nhất để kiểm soát đường huyết sau bữa." },
    ],
    courseRec: {
      eyebrow: "Gợi ý cho cô chú",
      courseTag: "Tự học",
      courseName: "Hiểu Đúng Tiểu Đường",
      price: "799.000đ",
      highlights: [
        "16 video bài giảng khoa học",
        "90 ngày truy cập không giới hạn",
        "10 tài liệu PDF tải về",
        "Bài kiểm tra và chứng chỉ hoàn thành",
      ],
      href: "/tham-gia",
      cta: "Bắt đầu ngay",
      secondary: {
        label: "Muốn có chuyên gia xây kế hoạch riêng?",
        courseName: "Kiểm Soát Chủ Động 90 Ngày",
        price: "2.999.000đ",
        href: "/lien-he",
        extras: ["6 buổi tư vấn 1-1", "Lộ trình 28 ngày", "Bữa ăn cá nhân hóa"],
      },
    },
  },
  HEAVY: {
    icon: "🔥",
    badge: "Cần hành động ngay",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
    headline: "Đường huyết đang biến động đáng kể và ảnh hưởng trực tiếp đến chất lượng sống",
    intro: "Mức độ này cần can thiệp có hệ thống — không chỉ điều chỉnh một vài thói quen mà cần lộ trình rõ ràng, kế hoạch bữa ăn cá nhân hóa và theo dõi định kỳ với chuyên gia.",
    hacks: [
      { title: "Ăn rau đầu mỗi bữa", desc: "Tạo lớp đệm chất xơ trước khi tinh bột vào — giảm tốc độ hấp thu glucose đáng kể." },
      { title: "Bữa sáng mặn không ngọt", desc: "Trứng, rau, cá, thịt. Không cơm, không bánh mì, không cháo trắng buổi sáng." },
      { title: "Đi bộ 10–15 phút sau ăn", desc: "Một trong những công cụ mạnh nhất để kiểm soát đường huyết sau ăn." },
    ],
    courseRec: {
      eyebrow: "Phù hợp nhất với cô chú",
      courseTag: "Phổ biến nhất",
      courseName: "Kiểm Soát Chủ Động 90 Ngày",
      price: "2.999.000đ",
      highlights: [
        "6 buổi tư vấn 1-1 với chuyên gia",
        "Lộ trình 28 ngày cá nhân hóa",
        "Khung bữa ăn Việt thiết kế riêng",
        "Hỗ trợ hỏi đáp Zalo 5 lần / tháng",
      ],
      href: "/lien-he",
      cta: "Đặt lịch tư vấn",
      secondary: {
        label: "Muốn đồng hành sâu hơn với Bác sĩ Hương?",
        courseName: "Đồng Hành Chuyên Sâu 12 Tuần",
        price: "10.299.000đ",
        href: "/lien-he",
        extras: ["Thực đơn riêng từng tuần", "Zalo 5 lần/tuần", "01 người thân cùng tham gia"],
      },
    },
  },
  INSULIN_RESISTANCE: {
    icon: "🔬",
    badge: "Kháng insulin",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    headline: "Tế bào đang phản ứng kém với insulin — đường huyết khó ổn định dù không ăn nhiều",
    intro: "Kháng insulin làm glucose tích lũy trong máu thay vì đi vào tế bào. Cần can thiệp chuyên biệt về bữa ăn, theo dõi chỉ số định kỳ và điều chỉnh theo từng tuần để phục hồi độ nhạy insulin.",
    hacks: [
      { title: "Bữa sáng mặn — ưu tiên số 1", desc: "Bữa sáng ngọt tạo đỉnh insulin cao ngay từ đầu ngày — ảnh hưởng suốt nhiều giờ sau đó." },
      { title: "Không ăn tinh bột một mình", desc: "Luôn kết hợp cơm/bún với rau và đạm — không bao giờ ăn tinh bột một mình." },
      { title: "Đi bộ sau ăn", desc: "Cơ bắp hấp thu glucose trực tiếp — đặc biệt quan trọng với kháng insulin." },
    ],
    courseRec: {
      eyebrow: "Cần kế hoạch cá nhân hóa",
      courseTag: "Phổ biến nhất",
      courseName: "Kiểm Soát Chủ Động 90 Ngày",
      price: "2.999.000đ",
      highlights: [
        "Đánh giá tình trạng ban đầu",
        "Khung bữa ăn Việt cá nhân hóa",
        "6 buổi tư vấn riêng / 90 ngày",
        "Nhận xét nhật ký đường huyết",
      ],
      href: "/lien-he",
      cta: "Đặt lịch tư vấn",
      secondary: {
        label: "Muốn đồng hành sâu hơn với Bác sĩ Hương?",
        courseName: "Đồng Hành Chuyên Sâu 12 Tuần",
        price: "10.299.000đ",
        href: "/lien-he",
        extras: ["Thực đơn riêng từng tuần", "Zalo 5 lần/tuần", "01 người thân cùng tham gia"],
      },
    },
  },
  PREDIABETES: {
    icon: "⏰",
    badge: "Tiền đái tháo đường",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
    headline: "Đường huyết đã vượt ngưỡng bình thường — đây là giai đoạn có thể đảo ngược hoàn toàn",
    intro: "Tiền đái tháo đường không phải bản án chung thân. Nhiều nghiên cứu lâm sàng xác nhận thay đổi chế độ ăn và lối sống có thể đưa đường huyết về ngưỡng bình thường — nhưng cần hành động có kế hoạch, không phải tự điều chỉnh ngẫu hứng.",
    hacks: [
      { title: "Bữa sáng mặn — thay đổi quan trọng nhất", desc: "Ngừng bữa sáng ngọt. Thay bằng trứng, rau, cá hoặc thịt." },
      { title: "Ăn đúng thứ tự", desc: "Rau củ đầu tiên, đạm và chất béo tiếp, tinh bột cuối. Giảm đỉnh glucose sau ăn đến 75%." },
      { title: "Đi bộ 10–15 phút sau mỗi bữa", desc: "Đặc biệt hiệu quả cho tiền đái tháo đường — theo dõi đường huyết sau ăn để thấy kết quả." },
    ],
    courseRec: {
      eyebrow: "Giai đoạn vàng — đừng bỏ lỡ",
      courseTag: "Phổ biến nhất",
      courseName: "Kiểm Soát Chủ Động 90 Ngày",
      price: "2.999.000đ",
      highlights: [
        "Lộ trình 28 ngày riêng cho tiền tiểu đường",
        "6 buổi tư vấn trực tiếp với chuyên gia",
        "Khung bữa ăn Việt cá nhân hóa",
        "Báo cáo tổng kết cuối 90 ngày",
      ],
      href: "/lien-he",
      cta: "Đặt lịch tư vấn",
      secondary: {
        label: "Muốn đồng hành sâu hơn với Bác sĩ Hương?",
        courseName: "Đồng Hành Chuyên Sâu 12 Tuần",
        price: "10.299.000đ",
        href: "/lien-he",
        extras: ["Thực đơn riêng từng tuần", "Zalo 5 lần/tuần", "01 người thân cùng tham gia"],
      },
    },
  },
  DIABETES_T2: {
    icon: "💊",
    badge: "Đái tháo đường type 2",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    headline: "Tình trạng cần chương trình đồng hành chuyên sâu, cá nhân hóa và theo dõi sát",
    intro: "Đái tháo đường type 2 với mức độ này cần can thiệp toàn diện — không chỉ điều chỉnh bữa ăn mà cần thực đơn thiết kế riêng từng tuần, theo dõi nhật ký đường huyết và phối hợp chặt chẽ với bác sĩ điều trị.",
    hacks: [
      { title: "Bữa sáng mặn — quan trọng nhất", desc: "Trứng, rau, đạm. Không bao giờ bắt đầu ngày với tinh bột hay đường." },
      { title: "Phương pháp ba vùng", desc: "½ đĩa rau · ¼ đĩa đạm · ¼ đĩa tinh bột — không bỏ cơm, chỉ điều chỉnh tỉ lệ." },
      { title: "Kiểm tra bàn chân mỗi tối", desc: "3 phút mỗi tối — thói quen nhỏ phòng ngừa biến chứng bàn chân hiệu quả nhất." },
    ],
    courseRec: {
      eyebrow: "Đồng hành toàn diện",
      courseTag: "Cao cấp",
      courseName: "Đồng Hành Chuyên Sâu 12 Tuần",
      price: "10.299.000đ",
      highlights: [
        "7 buổi tư vấn trực tiếp với Bác sĩ Hương",
        "Thực đơn Việt thiết kế riêng từng tuần",
        "Hỗ trợ Zalo 5 lần / tuần",
        "01 người thân cùng tham gia",
      ],
      href: "/lien-he",
      cta: "Liên hệ đăng ký",
    },
    note: "Đang dùng insulin hoặc thuốc hạ đường huyết — hãy báo bác sĩ khi thay đổi chế độ ăn vì đường huyết có thể thay đổi nhanh.",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function HomeQuiz() {
  const [stage, setStage] = useState<Stage>("idle");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerKey>>({});
  const [selected, setSelected] = useState<AnswerKey | null>(null);
  const [resultCase, setResultCase] = useState<ResultCase | null>(null);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const isNewSection = !!q?.section;

  const handleSelect = (label: AnswerKey) => {
    if (selected !== null) return;
    setSelected(label);
    const next = { ...answers, [q.key]: label };
    setAnswers(next);
    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setResultCase(calcResult(next));
        setStage("done");
      }
    }, 420);
  };

  const restart = () => {
    setStage("idle");
    setCurrent(0);
    setAnswers({});
    setSelected(null);
    setResultCase(null);
  };

  // ── Idle ─────────────────────────────────────────────────────────────────────
  if (stage === "idle") {
    return (
      <section id="trac-nghiem" className="py-24 md:py-32 bg-heading border-t border-white/5">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left — text */}
            <div className="lg:col-span-6">
              <div className="eyebrow text-cream/50 mb-6">Trắc nghiệm · {questions.length} câu · 3 phút</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] text-cream leading-[1.05] tracking-tight mb-8">
                Đường huyết
                <br />
                cô chú đang
                <br />
                <span className="italic text-accent">ở mức nào?</span>
              </h2>
              <p className="text-cream/65 leading-relaxed mb-10 text-lg max-w-md">
                Bác sĩ Hương giúp cô chú nhận ra dấu hiệu sớm và định hướng khoá học phù hợp với tình trạng thực tế.
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <button
                  onClick={() => setStage("active")}
                  className="group inline-flex items-center gap-3 h-[60px] pl-7 pr-3 rounded-full bg-cream text-heading font-600 text-[15px] hover:bg-cream/90 transition-colors"
                >
                  <span>Bắt đầu kiểm tra</span>
                  <span className="w-11 h-11 rounded-full bg-heading/10 group-hover:bg-heading/20 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
                <span className="text-sm text-cream/45">Hoàn toàn miễn phí · Không cần đăng ký</span>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { emoji: "😴", label: "Mệt sau bữa ăn", sub: "Triệu chứng thường gặp" },
                  { emoji: "🍬", label: "Thèm đồ ngọt liên tục", sub: "Dấu hiệu cần chú ý" },
                  { emoji: "⚖️", label: "Khó giảm mỡ bụng", sub: "Liên quan đến insulin" },
                  { emoji: "🌙", label: "Mất ngủ giữa đêm", sub: "Có thể do đường huyết" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 rounded-2xl p-5 border border-white/8 hover:bg-white/8 transition-colors"
                  >
                    <div className="text-2xl mb-3">{item.emoji}</div>
                    <div className="font-600 text-cream text-[15px] mb-1">{item.label}</div>
                    <div className="text-xs text-cream/45">{item.sub}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-cream/35 leading-relaxed">
                Bài trắc nghiệm chỉ mang tính tham khảo, không thay thế xét nghiệm đường huyết hoặc chẩn đoán của bác sĩ.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Active — questions ────────────────────────────────────────────────────────
  if (stage === "active") {
    return (
      <section id="trac-nghiem" className="py-16 md:py-24 bg-heading border-t border-white/5">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          {/* Progress */}
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => { if (current > 0) { setCurrent(current - 1); setSelected(null); } else { setStage("idle"); } }}
              className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-cream/60 hover:text-cream transition-colors shrink-0"
              aria-label="Câu trước"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cream rounded-full"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-sm text-cream/45 tabular-nums shrink-0">
              {current + 1} / {questions.length}
            </span>
          </div>

          {/* Section label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {isNewSection && (
                <div className="eyebrow text-cream/40 mb-5">{q.section}</div>
              )}
              <div className="text-4xl mb-6">{q.emoji}</div>
              <h2 className="font-display text-2xl md:text-3xl text-cream leading-snug tracking-tight mb-8">
                {q.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt) => {
                  const isSelected = selected === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.label)}
                      disabled={selected !== null}
                      className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 ${
                        isSelected
                          ? "border-cream bg-cream text-heading"
                          : "border-white/12 bg-white/5 hover:border-white/25 hover:bg-white/10 text-cream"
                      } disabled:cursor-default`}
                    >
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-700 shrink-0 transition-colors ${
                        isSelected ? "bg-heading/10 text-heading" : "bg-white/10 text-cream/60"
                      }`}>
                        {opt.label}
                      </span>
                      <span className="font-500 text-[15px] leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    );
  }

  // ── Done — results ────────────────────────────────────────────────────────────
  if (stage === "done" && resultCase) {
    const res = RESULTS[resultCase];
    return (
      <section id="trac-nghiem" className="py-16 md:py-24 bg-heading border-t border-white/5">
        <div className="max-w-[820px] mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-600 mb-8 ${res.badgeColor}`}>
              <span>{res.icon}</span>
              <span>{res.badge}</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight tracking-tight mb-6">
              {res.headline}
            </h2>

            {/* Intro */}
            <p className="text-cream/65 leading-relaxed mb-10 text-lg max-w-2xl">{res.intro}</p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              {/* Course recommendation — prominent */}
              <div className="lg:col-span-7">
                <div className="bg-cream rounded-3xl p-7 md:p-8">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="eyebrow text-accent">{res.courseRec.eyebrow}</div>
                    <span className="shrink-0 inline-block px-3 py-1 rounded-full text-xs font-600 bg-heading text-cream">
                      {res.courseRec.courseTag}
                    </span>
                  </div>

                  {/* Course name */}
                  <h3 className="font-display text-2xl text-heading leading-tight tracking-tight mb-2">
                    {res.courseRec.courseName}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-5 pb-5 border-b border-heading/10">
                    <span className="font-display text-3xl text-heading">{res.courseRec.price}</span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-6">
                    {res.courseRec.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-text leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={res.courseRec.href}
                    className="group flex items-center justify-center gap-3 h-[52px] pl-6 pr-3 rounded-full bg-heading text-cream font-600 text-[14px] hover:bg-heading/85 transition-colors w-full"
                  >
                    <span>{res.courseRec.cta}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>

                  {/* Secondary option */}
                  {res.courseRec.secondary && (
                    <div className="mt-4 pt-4 border-t border-heading/10">
                      <p className="text-xs text-muted mb-2">{res.courseRec.secondary.label}</p>
                      <div className="flex items-start justify-between gap-3 bg-heading/[0.04] rounded-2xl p-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-600 text-heading mb-2">
                            {res.courseRec.secondary.courseName}
                            <span className="ml-2 text-muted font-500">{res.courseRec.secondary.price}</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {res.courseRec.secondary.extras.map((e, i) => (
                              <span key={i} className="text-xs text-heading/70 bg-heading/8 px-2.5 py-1 rounded-full">
                                + {e}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link
                          href={res.courseRec.secondary.href}
                          className="shrink-0 text-xs font-600 text-heading border border-heading/25 hover:border-heading/50 px-3 h-8 rounded-full flex items-center transition-colors whitespace-nowrap mt-0.5"
                        >
                          Xem →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="lg:col-span-5">
                <p className="eyebrow text-cream/40 mb-4">Thay đổi ngay hôm nay</p>
                <div className="space-y-3">
                  {res.hacks.map((h, i) => (
                    <div key={i} className="flex gap-3 bg-white/5 rounded-2xl border border-white/8 p-4">
                      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-700 text-accent shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-600 text-cream text-sm mb-0.5">{h.title}</p>
                        <p className="text-xs text-cream/50 leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Note */}
            {res.note && (
              <div className="mb-8 px-5 py-3 bg-white/5 border-l-2 border-accent/40 rounded-r-2xl">
                <p className="text-xs text-cream/50 leading-relaxed">⚠️ {res.note}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full border border-white/15 text-cream/60 hover:text-cream hover:border-white/30 text-sm font-500 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Làm lại từ đầu
              </button>
              <p className="text-xs text-cream/30 leading-relaxed self-center max-w-sm">
                Trắc nghiệm chỉ mang tính tham khảo, không thay thế xét nghiệm đường huyết hoặc chẩn đoán của bác sĩ.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return null;
}
