"use client";
import { useState } from "react";
import Link from "next/link";
import { RotateCcw, ChevronRight, ArrowLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AnswerKey = "A" | "B" | "C" | "D";
type ResultCase = "STABLE" | "MODERATE" | "HEAVY" | "INSULIN_RESISTANCE" | "PREDIABETES" | "DIABETES_T2";

interface Option {
  label: AnswerKey;
  text: string;
  score: number;
  skipScore?: boolean; // Q3D, Q4D, Q10D → 0 điểm, không cộng
}

interface Question {
  id: number;
  key: string;
  emoji: string;
  question: string;
  section?: string;          // label hiển thị khi bắt đầu phần mới
  options: Option[];
}

// ─── Quiz questions ───────────────────────────────────────────────────────────

const questions: Question[] = [
  // ─── Phần 1: Triệu chứng hàng ngày ──────────────────────────────────────────
  {
    id: 1, key: "q1",
    emoji: "🍚",
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
    id: 2, key: "q2",
    emoji: "🍬",
    question: "Cô chú có thường xuyên thèm đồ ngọt hoặc tinh bột giữa các bữa ăn không?",
    options: [
      { label: "A", text: "Không bao giờ", score: 0 },
      { label: "B", text: "Thỉnh thoảng, 1–2 lần mỗi tuần", score: 1 },
      { label: "C", text: "Thường xuyên, vài lần mỗi ngày", score: 2 },
      { label: "D", text: "Hầu như lúc nào cũng thèm", score: 2 },
    ],
  },
  {
    id: 3, key: "q3",
    emoji: "⏰",
    question: "Sau bữa sáng, cô chú thường đói trở lại sau bao lâu?",
    options: [
      { label: "A", text: "Hơn 4 tiếng — no rất bền", score: 0 },
      { label: "B", text: "Khoảng 3–4 tiếng", score: 1 },
      { label: "C", text: "Khoảng 2–3 tiếng", score: 2 },
      { label: "D", text: "Dưới 2 tiếng / Tôi không ăn bữa sáng", score: 0, skipScore: true },
    ],
  },
  {
    id: 4, key: "q4",
    emoji: "😴",
    question: "Vào buổi chiều (khoảng 14–15 giờ), cô chú cảm thấy thế nào?",
    options: [
      { label: "A", text: "Tỉnh táo, làm việc bình thường", score: 0 },
      { label: "B", text: "Hơi uể oải nhưng qua nhanh", score: 1 },
      { label: "C", text: "Mệt rõ rệt, buồn ngủ, muốn nghỉ", score: 2 },
      { label: "D", text: "Không ăn bữa trưa nên buổi chiều rất đói", score: 0, skipScore: true },
    ],
  },
  {
    id: 5, key: "q5",
    emoji: "😤",
    question: "Khi bỏ bữa hoặc ăn trễ hơn giờ thường, cô chú cảm thấy thế nào?",
    options: [
      { label: "A", text: "Vẫn bình thường, chỉ hơi đói", score: 0 },
      { label: "B", text: "Hơi khó chịu nhưng tự kiểm soát được", score: 1 },
      { label: "C", text: "Dễ cáu kỉnh, khó tập trung", score: 2 },
      { label: "D", text: "Run tay, chóng mặt, mệt nhiều", score: 2 },
    ],
  },
  {
    id: 6, key: "q6",
    emoji: "🧠",
    question: "Cô chú có hay bị mất tập trung, đầu óc không được minh mẫn trong ngày không?",
    options: [
      { label: "A", text: "Không bao giờ", score: 0 },
      { label: "B", text: "Thỉnh thoảng", score: 1 },
      { label: "C", text: "Thường xuyên trong tuần", score: 2 },
      { label: "D", text: "Hầu như mỗi ngày", score: 2 },
    ],
  },
  {
    id: 7, key: "q7",
    emoji: "🌙",
    question: "Giấc ngủ của cô chú thế nào?",
    options: [
      { label: "A", text: "Ngủ ngon, không thức giữa đêm", score: 0 },
      { label: "B", text: "Thỉnh thoảng thức dậy giữa đêm", score: 1 },
      { label: "C", text: "Hay thức dậy, khó ngủ lại", score: 2 },
      { label: "D", text: "Mất ngủ thường xuyên", score: 2 },
    ],
  },
  {
    id: 8, key: "q8",
    emoji: "🤕",
    question: "Cô chú có bị đau đầu thường xuyên không?",
    options: [
      { label: "A", text: "Không bao giờ hoặc rất hiếm", score: 0 },
      { label: "B", text: "Thỉnh thoảng, 1–2 lần mỗi tháng", score: 1 },
      { label: "C", text: "Vài lần mỗi tuần", score: 2 },
      { label: "D", text: "Gần như mỗi ngày", score: 2 },
    ],
  },
  {
    id: 9, key: "q9",
    emoji: "⚖️",
    question: "Cân nặng của cô chú thay đổi thế nào trong thời gian gần đây?",
    options: [
      { label: "A", text: "Ổn định, không thay đổi nhiều", score: 0 },
      { label: "B", text: "Hơi khó giảm cân khi muốn", score: 1 },
      { label: "C", text: "Dù ăn ít vẫn tăng hoặc không giảm được", score: 2 },
      { label: "D", text: "Mỡ bụng tăng nhiều dù không ăn nhiều hơn", score: 2 },
    ],
  },
  {
    id: 10, key: "q10",
    emoji: "🧁",
    question: "Sau khi ăn đồ ngọt hoặc bữa nhiều tinh bột, cô chú cảm thấy thế nào?",
    options: [
      { label: "A", text: "Bình thường, không thấy khác biệt", score: 0 },
      { label: "B", text: "Hơi hứng phấn rồi mệt nhẹ", score: 1 },
      { label: "C", text: "Hứng phấn mạnh rồi mệt, lại thèm ăn thêm", score: 2 },
      { label: "D", text: "Tôi không ăn đồ ngọt", score: 0, skipScore: true },
    ],
  },

  // ─── Phần 2: Tình trạng sức khỏe ─────────────────────────────────────────────
  {
    id: 11, key: "q11",
    emoji: "🩺",
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
    id: 12, key: "q12",
    emoji: "🎯",
    question: "Cô chú có gặp khó khăn khi muốn giảm mỡ bụng dù đã cố gắng không?",
    options: [
      { label: "A", text: "Không, cân nặng khá ổn định", score: 0 },
      { label: "B", text: "Hơi khó giảm nhưng vẫn kiểm soát được", score: 1 },
      { label: "C", text: "Rất khó giảm dù đã cố gắng nhiều cách", score: 2 },
      { label: "D", text: "Tôi không cần giảm cân", score: 0 },
    ],
  },
  {
    id: 13, key: "q13",
    emoji: "⚠️",
    question: "Cô chú đã được bác sĩ chẩn đoán tiền đái tháo đường chưa?",
    options: [
      { label: "A", text: "Có, bác sĩ đã xác nhận", score: 0 },
      { label: "B", text: "Không", score: 0 },
      { label: "C", text: "Trước đây có nhưng đã ổn hơn", score: 0 },
      { label: "D", text: "Không chắc / Chưa kiểm tra", score: 0 },
    ],
  },
  {
    id: 14, key: "q14",
    emoji: "💊",
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
  // Symptom score Q1–Q10
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

  // Metabolic score Q11–Q12
  const q11map: Record<AnswerKey, number> = { A: 3, B: 0, C: 1, D: 1 };
  const q12map: Record<AnswerKey, number> = { A: 0, B: 1, C: 2, D: 0 };
  const metabolicScore = (q11map[answers.q11] ?? 0) + (q12map[answers.q12] ?? 0);
  const total = symptomScore + metabolicScore;

  // Flags Q13–Q14
  const t2 = answers.q14 === "A";
  const pre = answers.q13 === "A";
  const ins = answers.q11 === "A";

  if (t2)       return "DIABETES_T2";
  if (pre)      return "PREDIABETES";
  if (ins)      return "INSULIN_RESISTANCE";
  if (total >= 13) return "HEAVY";
  if (total >= 5)  return "MODERATE";
  return "STABLE";
}

// ─── Result content ───────────────────────────────────────────────────────────

const RESULTS: Record<ResultCase, {
  icon: string;
  badge: string;
  badgeColor: string;
  headline: string;
  intro: string;
  hacks: { num: string; title: string; desc: string }[];
  note?: string;
}> = {
  STABLE: {
    icon: "🌿",
    badge: "Ổn định",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
    headline: "Đường huyết của cô chú khá ổn định — tiếp tục duy trì!",
    intro: "Kết quả của cô chú rất tích cực. Cô chú hầu như không có dấu hiệu đường huyết tăng vọt — điều này cho thấy các tế bào đang xử lý glucose hiệu quả, ít viêm tiềm ẩn và ít nguy cơ chuyển hóa lâu dài.\n\nDù vậy, duy trì thói quen tốt là rất quan trọng — đặc biệt khi ăn uống và lối sống thay đổi theo tuổi tác.",
    hacks: [
      { num: "1", title: "Ăn đúng thứ tự", desc: "Rau củ → đạm và chất béo → tinh bột. Thứ tự này làm chậm hấp thu glucose đáng kể." },
      { num: "2", title: "Thêm rau xanh đầu bữa", desc: "Chất xơ tạo lớp đệm trong ruột, làm phẳng đường cong glucose của bữa ăn." },
      { num: "3", title: "Đi bộ 10 phút sau ăn", desc: "Cơ bắp hấp thụ glucose dư thừa mà không cần insulin — đơn giản và hiệu quả." },
    ],
  },
  MODERATE: {
    icon: "⚡",
    badge: "Cần chú ý",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
    headline: "Cơ thể đang gửi tín hiệu — hãy điều chỉnh ngay từ bây giờ",
    intro: "Những điều cô chú đang gặp — thèm ngọt, mệt mỏi sau ăn, khó tập trung — không phải \"bình thường\" dù rất phổ biến. Đây là dấu hiệu đường huyết đang tăng vọt rồi sụt giảm liên tục sau mỗi bữa ăn.\n\nMỗi đợt tăng vọt tạo ra viêm nhỏ, mỗi đợt sụt giảm tạo ra cảm giác thèm ăn — và vòng lặp cứ tiếp tục. Tin tốt: đây là giai đoạn dễ can thiệp nhất.",
    hacks: [
      { num: "1", title: "Bữa sáng có đạm — thay đổi quan trọng nhất", desc: "Trứng, rau, đậu phụ thay vì cháo trắng hay bánh mì ngọt. Ổn định năng lượng cả ngày." },
      { num: "2", title: "Ăn đúng thứ tự", desc: "Rau củ → đạm và chất béo → tinh bột. Nghiên cứu cho thấy thứ tự này giảm đỉnh glucose lên đến 75%." },
      { num: "3", title: "Giấm táo trước bữa ăn", desc: "1 muỗng canh pha với 200ml nước, uống 10–20 phút trước bữa chính. Làm chậm hấp thu tinh bột." },
      { num: "4", title: "Đi bộ sau ăn", desc: "10 phút sau mỗi bữa chính giúp cơ bắp hấp thụ glucose dư thừa." },
      { num: "5", title: "Ăn ngọt sau bữa chính, không ăn vặt lúc đói", desc: "Cùng lượng đường nhưng tác động lên đường huyết hoàn toàn khác khi ăn sau bữa đầy đủ." },
    ],
  },
  HEAVY: {
    icon: "🔥",
    badge: "Cần hành động ngay",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
    headline: "Đường huyết đang ảnh hưởng nhiều đến cuộc sống hàng ngày của cô chú",
    intro: "Kết quả cho thấy đường huyết đang biến động thường xuyên và ảnh hưởng đến nhiều khía cạnh: năng lượng, giấc ngủ, sự tập trung và cảm giác thèm ăn.\n\nĐây là tình trạng rất phổ biến với chế độ ăn hiện đại — không phải lỗi của cô chú. Những triệu chứng này hoàn toàn có thể cải thiện được bằng những thay đổi nhỏ trong thứ tự và cách ăn.",
    hacks: [
      { num: "1", title: "Ăn đúng thứ tự", desc: "Rau củ đầu tiên, đạm và chất béo tiếp theo, tinh bột cuối cùng." },
      { num: "2", title: "Rau xanh đầu mỗi bữa", desc: "Tạo lớp đệm chất xơ trước khi tinh bột vào — giảm tốc độ hấp thu glucose đáng kể." },
      { num: "3", title: "Bữa sáng mặn — không ngọt", desc: "Trứng, rau, cá, thịt. Không cơm, không bánh mì, không cháo trắng buổi sáng." },
      { num: "4", title: "Không ăn đường lúc bụng đói", desc: "Trái cây, nước ngọt, kẹo — cần ăn sau bữa có đạm và chất xơ." },
      { num: "5", title: "Giấm táo trước bữa ăn", desc: "1 muỗng canh pha nước, uống trước bữa chính 10–20 phút mỗi ngày." },
      { num: "6", title: "Đi bộ 10–15 phút sau ăn", desc: "Một trong những công cụ mạnh nhất để kiểm soát đường huyết sau ăn." },
      { num: "7", title: "Ăn vặt mặn thay ngọt", desc: "Hạt, trứng luộc, dưa leo — không bánh kẹo, không trái cây riêng lẻ." },
    ],
    note: "Nếu các triệu chứng không cải thiện sau 2–4 tuần áp dụng, hãy trao đổi với bác sĩ để kiểm tra đường huyết.",
  },
  INSULIN_RESISTANCE: {
    icon: "🔬",
    badge: "Kháng insulin",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    headline: "Đường huyết không ổn định đang ảnh hưởng đến chuyển hóa của cô chú",
    intro: "Kháng insulin có mối liên hệ trực tiếp với tình trạng đường huyết tăng vọt. Khi insulin tăng cao liên tục, cơ thể bắt đầu \"kháng\" lại tín hiệu của insulin — đây là vòng lặp khó thoát nếu không thay đổi chế độ ăn.\n\nKhi cô chú làm phẳng đường cong glucose, nồng độ insulin sẽ dần giảm xuống và cơ thể bắt đầu phục hồi độ nhạy. Những thay đổi này thường thấy kết quả trong vài tuần đầu tiên.",
    hacks: [
      { num: "1", title: "Bữa sáng mặn — ưu tiên số 1", desc: "Quan trọng nhất để kiểm soát insulin suốt ngày. Bữa sáng ngọt tạo đỉnh insulin cao ngay từ đầu ngày." },
      { num: "2", title: "Ăn đúng thứ tự", desc: "Nghiên cứu cho thấy thứ tự ăn đúng (rau → đạm/béo → tinh bột) giảm phản ứng insulin sau bữa ăn lên đến 46%." },
      { num: "3", title: "Kết hợp tinh bột với đạm và chất xơ", desc: "Không bao giờ ăn cơm, bún, bánh mì một mình — luôn kèm rau và đạm." },
      { num: "4", title: "Giấm táo trước bữa ăn", desc: "Axít acetic làm chậm hoạt động enzyme phân giải tinh bột, giúp glucose vào máu chậm và đều hơn." },
      { num: "5", title: "Đi bộ sau ăn", desc: "Khi cơ bắp co rút, chúng hấp thụ glucose trực tiếp mà không cần insulin — cơ chế đặc biệt quan trọng với kháng insulin." },
    ],
    note: "Nếu đang dùng thuốc cho kháng insulin, hãy trao đổi với bác sĩ khi thay đổi chế độ ăn vì đường huyết có thể thay đổi nhanh.",
  },
  PREDIABETES: {
    icon: "⏰",
    badge: "Tiền đái tháo đường",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
    headline: "Đây là giai đoạn vàng để hành động — tiền đái tháo đường hoàn toàn có thể đảo ngược",
    intro: "Tiền đái tháo đường là dấu hiệu cơ thể đang gặp khó khăn trong việc xử lý đường huyết — nhưng đây KHÔNG phải bản án chung thân.\n\nNhiều nghiên cứu lâm sàng xác nhận: những thay đổi trong lối ăn uống có thể đảo ngược hoàn toàn tiền đái tháo đường mà không cần thuốc. Đây là giai đoạn vàng — cửa sổ để đảo ngược vẫn còn rộng mở.",
    hacks: [
      { num: "1", title: "Bữa sáng mặn — thay đổi quan trọng nhất", desc: "Ngừng hoàn toàn bữa sáng ngọt. Thay bằng trứng, rau, cá hoặc thịt." },
      { num: "2", title: "Ăn đúng thứ tự", desc: "Rau củ đầu tiên, sau đó đạm và chất béo, tinh bột cuối cùng. Giảm đỉnh glucose sau ăn đến 75%." },
      { num: "3", title: "Rau xanh đầu mỗi bữa", desc: "Tạo lớp đệm chất xơ trước khi tinh bột vào — giảm tốc độ hấp thu glucose đáng kể." },
      { num: "4", title: "Giấm táo trước mỗi bữa chính", desc: "Một trong những can thiệp được nghiên cứu nhiều nhất cho tiền đái tháo đường." },
      { num: "5", title: "Đi bộ 10–15 phút sau mỗi bữa", desc: "Công cụ kiểm soát đường huyết hiệu quả, đặc biệt cho tiền đái tháo đường." },
      { num: "6", title: "Giảm tinh bột tinh chế", desc: "Cơm trắng, bánh mì, bún, phở, nước ngọt — giảm dần. Thay bằng rau, đạm, chất béo lành mạnh." },
    ],
    note: "Theo dõi đường huyết định kỳ (HbA1c, đường huyết lúc đói) với bác sĩ để kiểm tra tiến độ.",
  },
  DIABETES_T2: {
    icon: "💊",
    badge: "Đái tháo đường type 2",
    badgeColor: "bg-red-100 text-warning border-red-200",
    headline: "Tiểu đường type 2 không phải bản án chung thân — khóa học của Bác sĩ Hương có thể giúp cô chú",
    intro: "Hơn 7 triệu người Việt Nam đang cùng hành trình với cô chú, và ngày càng nhiều người đang cải thiện đáng kể qua thay đổi lối ăn uống.\n\nTheo nhiều nghiên cứu lâm sàng: tiểu đường type 2 KHÔNG phải bệnh mạn tính không thể cải thiện. Nguyên nhân gốc rễ là tình trạng đường huyết và insulin mất cân bằng kéo dài — và điều này có thể được giải quyết qua chế độ dinh dưỡng đúng.\n\nBác sĩ Hương sẽ hướng dẫn cụ thể — kiến thức y khoa được Việt hóa, thực tế và phù hợp bữa cơm Việt Nam.",
    hacks: [
      { num: "★", title: "Khóa học của Bác sĩ Hương về tiểu đường", desc: "20 bài học ngắn, miễn phí: hiểu cơ chế tiểu đường type 2 · chế độ ăn phù hợp ẩm thực Việt · cách theo dõi đường huyết tại nhà · phối hợp với bác sĩ điều trị an toàn." },
      { num: "1", title: "Bữa sáng mặn — quan trọng nhất", desc: "Trứng, rau, đạm. Không bao giờ bắt đầu ngày với tinh bột hay đường khi có tiểu đường." },
      { num: "2", title: "Ăn đúng thứ tự", desc: "Rau → đạm/béo → tinh bột. Thứ tự ăn có thể giảm đỉnh glucose sau ăn đến 75%." },
      { num: "3", title: "Đi bộ sau mỗi bữa ăn", desc: "Cơ bắp hấp thụ glucose trực tiếp khi vận động — đặc biệt quan trọng với người tiểu đường type 2." },
      { num: "4", title: "Giảm mạnh tinh bột tinh chế", desc: "Cơm trắng, bánh mì, bún, phở, nước ngọt — thay bằng rau, đạm, chất béo lành mạnh." },
    ],
    note: "Nếu đang dùng insulin hoặc thuốc hạ đường huyết, hãy báo bác sĩ ngay khi thay đổi chế độ ăn vì đường huyết có thể giảm nhanh.",
  },
};

// ─── Quiz component ───────────────────────────────────────────────────────────

type Stage = "idle" | "active" | "done";

export default function TracNghiemPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerKey>>({});
  const [selected, setSelected] = useState<AnswerKey | null>(null);
  const [resultCase, setResultCase] = useState<ResultCase | null>(null);

  const q = questions[current];
  const progress = (current / questions.length) * 100;
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
    }, 450);
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
      <div className="min-h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2 bg-paper">
        {/* Left */}
        <div className="flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 xl:px-20">
          <Link
            href="/tai-lieu"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại tài liệu
          </Link>

          <div className="eyebrow text-muted mb-6">Trắc nghiệm · {questions.length} câu hỏi</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] text-heading leading-[1.1] tracking-tight mb-6">
            Cô chú có đang bị
            <br />
            tăng đột biến
            <br />
            đường huyết không?
          </h1>
          <p className="text-text leading-relaxed mb-10 max-w-md text-lg">
            Bác sĩ Hương giúp cô chú nhận ra dấu hiệu sớm và nhận gợi ý phù hợp với tình trạng của mình.
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={() => setStage("active")}
              className="group inline-flex items-center gap-3 h-[56px] pl-7 pr-3 rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/85 transition-colors"
            >
              <span>Bắt đầu làm bài</span>
              <span className="w-10 h-10 rounded-full bg-cream/15 group-hover:bg-cream/25 flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
            <span className="text-sm text-muted">⏱ Khoảng 3 phút</span>
          </div>

          <p className="mt-10 text-xs text-muted max-w-sm leading-relaxed">
            Bài trắc nghiệm chỉ mang tính tham khảo, không thay thế cho xét nghiệm đường huyết hoặc chẩn đoán của bác sĩ.
          </p>
        </div>

        {/* Right — image */}
        <div className="hidden lg:block relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1400&q=90&fit=crop&auto=format"
            alt="Bữa ăn Việt Nam cân đối"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper/50 to-transparent" />

        </div>
      </div>
    );
  }

  // ── Done ──────────────────────────────────────────────────────────────────────
  if (stage === "done" && resultCase) {
    const res = RESULTS[resultCase];
    return (
      <div className="bg-cream min-h-[calc(100vh-72px)]">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-14 md:py-20">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-600 mb-8 ${res.badgeColor}`}>
            <span>{res.icon}</span>
            <span>{res.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl md:text-4xl text-heading leading-tight tracking-tight mb-6">
            {res.headline}
          </h1>

          {/* Intro */}
          <div className="bg-paper rounded-3xl border border-heading/8 p-7 mb-8 space-y-4">
            {res.intro.split("\n\n").map((p, i) => (
              <p key={i} className="text-text leading-relaxed">{p}</p>
            ))}
          </div>

          {/* Hacks */}
          <h2 className="font-display text-2xl text-heading mb-5">
            {resultCase === "DIABETES_T2" ? "Giải pháp dành cho cô chú" : "Glucose hacks dành cho cô chú"}
          </h2>
          <div className="space-y-3 mb-8">
            {res.hacks.map((h, i) => (
              <div key={i} className="flex gap-4 bg-paper rounded-2xl border border-heading/8 p-5">
                <div className="w-9 h-9 rounded-full bg-heading/8 flex items-center justify-center text-sm font-700 text-heading shrink-0 mt-0.5">
                  {h.num}
                </div>
                <div>
                  <p className="font-600 text-heading text-[15px] mb-1">{h.title}</p>
                  <p className="text-sm text-muted leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          {res.note && (
            <div className="mb-8 px-5 py-4 bg-cream border-l-2 border-muted/30 rounded-r-xl">
              <p className="text-xs text-muted leading-relaxed">⚠️ {res.note}</p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href="/tham-gia"
              className="flex-1 h-[52px] rounded-full bg-heading text-cream font-600 text-[15px] hover:bg-heading/85 transition-colors flex items-center justify-center"
            >
              Tham gia khóa học miễn phí →
            </Link>
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 h-[52px] px-6 rounded-full border border-heading/15 text-heading font-600 text-[15px] hover:border-heading/30 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted leading-relaxed">
            Bài trắc nghiệm chỉ mang tính tham khảo, không thay thế cho xét nghiệm đường huyết hoặc chẩn đoán của bác sĩ.
          </p>
        </div>
      </div>
    );
  }

  // ── Active — questions ────────────────────────────────────────────────────────
  return (
    <div className="bg-cream min-h-[calc(100vh-72px)]">
      {/* Progress bar (sticky) */}
      <div className="sticky top-[72px] z-10 bg-cream/95 backdrop-blur border-b border-heading/6">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-4">
          <button onClick={() => { if (current > 0) { setCurrent(current - 1); setSelected(null); } else { setStage("idle"); } }} className="text-muted hover:text-heading transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 h-1.5 bg-heading/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-heading rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-muted tabular-nums shrink-0">
            {current + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        {/* Section label */}
        {isNewSection && (
          <div className="eyebrow text-muted mb-6">{q.section}</div>
        )}

        {/* Question */}
        <div className="mb-10">
          <div className="text-5xl mb-5">{q.emoji}</div>
          <h2 className="font-display text-2xl md:text-3xl text-heading leading-snug tracking-tight">
            {q.question}
          </h2>
        </div>

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
                    ? "border-heading bg-heading text-cream"
                    : "border-heading/12 bg-white hover:border-heading/30 hover:bg-cream text-heading"
                } disabled:cursor-default`}
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-700 shrink-0 transition-colors ${
                    isSelected ? "bg-cream/20 text-cream" : "bg-heading/6 text-heading"
                  }`}
                >
                  {opt.label}
                </span>
                <span className="font-500 text-[15px] leading-snug">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
