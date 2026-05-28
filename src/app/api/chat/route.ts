import type { NextRequest } from "next/server";
import { lessons } from "@/data/lessons";
import type { Lesson } from "@/types";

// ── In-memory learning store ──────────────────────────────────────────────────
const knowledgeBase = new Map<string, Array<{ q: string; a: string }>>();
const MAX_PER_LESSON = 20;

// ── Medical query guard ───────────────────────────────────────────────────────

const MEDICAL_DENY_KEYWORDS = [
  "thuốc", "toa thuốc", "đơn thuốc", "liều", "liều lượng",
  "insulin", "tiêm insulin",
  "ngưng thuốc", "đổi thuốc", "bỏ thuốc",
  "hba1c", "a1c",
  "mmol", "mg/dl",
  "xét nghiệm", "kết quả xét nghiệm",
  "chẩn đoán", "được chẩn đoán",
  "tác dụng phụ",
  "metformin", "glipizide", "sitagliptin", "empagliflozin", "dapagliflozin",
  "insulin glargine", "insulin lispro",
  "số đường", "số đường huyết",
];

function isMedicalQuery(text: string): boolean {
  const lower = text.toLowerCase();
  return MEDICAL_DENY_KEYWORDS.some((kw) => lower.includes(kw));
}

// ── Vietnamese stop-words (skip when scoring) ─────────────────────────────────

const STOP_WORDS = new Set([
  "và", "là", "của", "có", "không", "được", "cho", "với", "trong",
  "từ", "đến", "này", "đó", "một", "các", "những", "hay", "hoặc",
  "thì", "mà", "khi", "nên", "vì", "do", "nhưng", "tôi", "cô", "chú",
  "bài", "học", "bạn", "ạ", "nhé", "ơi", "chim", "sẻ", "hỏi", "hỏi",
  "sao", "gì", "nào", "thế", "vậy", "như", "thế nào", "tại sao",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"""''()\[\]]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOP_WORDS.has(t));
}

// ── Lesson content search ─────────────────────────────────────────────────────

type SearchHit = { lesson: Lesson; snippets: string[]; score: number };

function searchLessons(query: string, currentSlug: string): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];

  for (const lesson of lessons) {
    if (!lesson.content) continue;

    const contentParts: string[] = [
      lesson.title,
      lesson.previewText ?? "",
      lesson.content.openingLine ?? "",
      lesson.content.simpleSummary ?? "",
      lesson.content.actionToday ?? "",
      ...lesson.content.body,
    ].filter(Boolean);

    let score = 0;
    const matchedSnippets: string[] = [];

    for (const part of contentParts) {
      const partLower = part.toLowerCase();
      let partScore = 0;
      for (const token of tokens) {
        if (partLower.includes(token)) partScore++;
      }
      if (partScore > 0) {
        score += partScore;
        matchedSnippets.push(part);
      }
    }

    // Boost score for current lesson
    if (lesson.slug === currentSlug) score += 2;

    if (score > 0) {
      hits.push({ lesson, snippets: matchedSnippets.slice(0, 3), score });
    }
  }

  return hits.sort((a, b) => b.score - a.score);
}

// ── Local response generator ──────────────────────────────────────────────────

function generateLocalReply(
  query: string,
  lessonSlug: string,
  history: Array<{ role: string; content: string }>
): string {
  // Medical guard
  if (isMedicalQuery(query)) {
    return "Câu hỏi này cần được Bác sĩ Hương giải đáp trực tiếp ạ. Chim Sẻ không thể tư vấn về thuốc, chỉ số hay tình trạng sức khỏe cá nhân — để đảm bảo an toàn cho cô chú. Cô chú có thể đặt lịch tư vấn 1-1 với Bác sĩ Hương tại mục Liên hệ nhé 🌿";
  }

  const hits = searchLessons(query, lessonSlug);

  if (hits.length === 0) {
    // Fallback: describe current lesson
    const currentLesson = lessons.find((l) => l.slug === lessonSlug);
    if (currentLesson?.content) {
      return `Chim Sẻ hiểu câu hỏi của cô chú ạ. Về bài học này — ${currentLesson.content.simpleSummary}\n\nViệc cần làm hôm nay: ${currentLesson.content.actionToday} 🌿`;
    }
    return "Chim Sẻ chỉ có thể giải đáp thắc mắc về nội dung 16 bài học trong khóa ạ. Câu hỏi của cô chú có thể phù hợp để hỏi trực tiếp Bác sĩ Hương trong buổi tư vấn nhé 🌿";
  }

  const top = hits[0];
  const isSameLesson = top.lesson.slug === lessonSlug;

  // Clean markdown from snippets
  const cleanSnippet = (s: string) =>
    s.replace(/\*\*/g, "").replace(/\*/g, "").trim();

  // Build reply
  const parts: string[] = [];

  if (!isSameLesson) {
    parts.push(`Về điều cô chú hỏi — trong bài "${top.lesson.title}", Chim Sẻ tìm thấy thông tin này:`);
  } else {
    parts.push(`Về câu hỏi của cô chú:`);
  }

  // Add 1–2 most relevant snippets (not the title itself)
  const relevantSnippets = top.snippets
    .filter((s) => s !== top.lesson.title)
    .slice(0, 2)
    .map(cleanSnippet);

  if (relevantSnippets.length > 0) {
    parts.push(relevantSnippets.join("\n\n"));
  }

  // Append action if we have a good match
  if (top.score >= 3 && top.lesson.content?.actionToday) {
    parts.push(`Áp dụng ngay: ${cleanSnippet(top.lesson.content.actionToday)}`);
  }

  parts.push("🌿");

  return parts.join("\n\n");
}

// ── System prompt builder (used when API key is available) ────────────────────

function buildSystemPrompt(
  lessonTitle: string,
  lessonContent: string,
  learned: Array<{ q: string; a: string }>
): string {
  const learnedSection =
    learned.length >= 3
      ? `\n\nCâu hỏi phổ biến từ các học viên khác về bài này (dùng làm tham khảo, không lặp lại nguyên văn):\n` +
        learned
          .slice(-6)
          .map((qa) => `• Hỏi: ${qa.q}\n  Đáp: ${qa.a}`)
          .join("\n")
      : "";

  return `Bạn là Trợ lý Chim Sẻ — trợ lý học tập trong khóa học "Hiểu Đúng Tiểu Đường" do Ts.Bs. Lê Thị Thu Hương thiết kế dành cho người tiền tiểu đường và đái tháo đường type 2.

XƯNG HÔ: Luôn xưng "Chim Sẻ", gọi người học là "cô/chú" (tùy giới tính rõ ràng) hoặc "cô chú" khi chưa biết. Giọng thân thiện, ấm áp, kiên nhẫn, phù hợp với người lớn tuổi.

BÀI HỌC HIỆN TẠI: ${lessonTitle}

NỘI DUNG BÀI:
${lessonContent}
${learnedSection}

PHẠM VI ĐƯỢC TRẢ LỜI:
- Giải thích nội dung, khái niệm trong 16 bài học của khóa
- Gợi ý cách áp dụng vào bữa cơm Việt hằng ngày
- Giải thích tại sao một thói quen lại có lợi/hại cho đường huyết
- Trả lời thắc mắc thực tế về ăn uống, vận động nhẹ nhàng

TUYỆT ĐỐI KHÔNG trả lời những vấn đề sau (phải chuyển đến Bác sĩ Hương):
- Chỉ số xét nghiệm cụ thể (HbA1c bao nhiêu, đường huyết X mmol/L có sao không...)
- Thuốc tiểu đường, liều lượng, tác dụng phụ, đổi thuốc, ngừng thuốc
- Insulin: loại, liều, cách điều chỉnh
- Chẩn đoán bệnh hay tình trạng y khoa
- Bất kỳ tư vấn y khoa mang tính cá nhân hóa

Khi gặp câu hỏi thuộc nhóm KHÔNG được trả lời, trả lời ĐÚNG nguyên văn này:
"Câu hỏi này cần được Bác sĩ Hương giải đáp trực tiếp ạ. Chim Sẻ không thể tư vấn về thuốc, chỉ số hay tình trạng sức khỏe cá nhân — để đảm bảo an toàn cho cô chú. Cô chú có thể đặt lịch tư vấn 1-1 với Bác sĩ Hương tại mục Liên hệ nhé 🌿"

Khi câu hỏi ngoài nội dung 16 bài học:
"Chim Sẻ chỉ có thể giải đáp thắc mắc về nội dung 16 bài học trong khóa ạ. Câu hỏi của cô chú có thể phù hợp để hỏi trực tiếp Bác sĩ Hương trong buổi tư vấn nhé 🌿"

CÁCH VIẾT: Ngắn gọn (tối đa 120 từ), không dùng từ kỹ thuật khó hiểu, có thể dùng ví dụ cụ thể từ bữa cơm Việt. Nếu nội dung dài, chia thành các gạch đầu dòng ngắn.`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: {
    message: string;
    lessonSlug: string;
    lessonTitle: string;
    lessonContent: string;
    history: Array<{ role: string; content: string }>;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ reply: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { message, lessonSlug, lessonTitle, lessonContent, history } = body;

  // Retrieve accumulated learning for this lesson
  const learned = knowledgeBase.get(lessonSlug) ?? [];

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ── Path A: local knowledge-base (no API key) ─────────────────────────────
  if (!apiKey) {
    const reply = generateLocalReply(message, lessonSlug, history);

    // Still accumulate Q&A for learning
    const updated = [...learned, { q: message, a: reply }].slice(-MAX_PER_LESSON);
    knowledgeBase.set(lessonSlug, updated);

    return Response.json({ reply });
  }

  // ── Path B: Claude Haiku via Anthropic API ────────────────────────────────
  const systemPrompt = buildSystemPrompt(lessonTitle, lessonContent, learned);

  const trimmedHistory = history.slice(-16);
  const messages = [
    ...trimmedHistory,
    { role: "user", content: message },
  ];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const reply: string =
      data.content?.[0]?.text ??
      "Xin lỗi, Chim Sẻ gặp sự cố. Cô chú thử lại sau nhé ạ.";

    const updated = [...learned, { q: message, a: reply }].slice(-MAX_PER_LESSON);
    knowledgeBase.set(lessonSlug, updated);

    return Response.json({ reply });
  } catch {
    // API failed — fall back to local search
    const reply = generateLocalReply(message, lessonSlug, history);
    return Response.json({ reply });
  }
}
