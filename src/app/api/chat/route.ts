import type { NextRequest } from "next/server";

// ── In-memory learning store ──────────────────────────────────────────────────
const knowledgeBase = new Map<string, Array<{ q: string; a: string }>>();
const MAX_PER_LESSON = 20;

// ── Medical query guard ───────────────────────────────────────────────────────

const MEDICAL_DENY = [
  "thuốc", "toa thuốc", "đơn thuốc", "liều", "liều lượng",
  "ngưng thuốc", "đổi thuốc", "bỏ thuốc", "uống thuốc",
  "insulin", "tiêm", "kim tiêm",
  "hba1c", "a1c", "mmol", "mg/dl",
  "xét nghiệm", "kết quả xét nghiệm", "phiếu xét nghiệm",
  "chẩn đoán", "chỉ số", "con số của tôi",
  "tác dụng phụ", "metformin", "glipizide",
];

function isMedical(text: string): boolean {
  const t = text.toLowerCase();
  return MEDICAL_DENY.some((kw) => t.includes(kw));
}

const MEDICAL_REPLY =
  "Câu hỏi này cần được Bác sĩ Hương giải đáp trực tiếp ạ. Chim Sẻ không thể tư vấn về thuốc, chỉ số hay tình trạng sức khỏe cá nhân — để đảm bảo an toàn cho cô chú. Cô chú có thể đặt lịch tư vấn 1-1 với Bác sĩ Hương tại mục Liên hệ nhé 🌿";

// ── Vietnamese stop-words ─────────────────────────────────────────────────────

const STOP = new Set([
  "và","là","của","có","không","được","cho","với","trong","từ","đến",
  "này","đó","một","các","những","hay","hoặc","thì","mà","khi","nên",
  "vì","do","nhưng","tôi","cô","chú","bài","bạn","ạ","nhé","ơi",
  "sao","gì","nào","thế","vậy","như","tại","rằng","đây","đó","hôm",
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"""''()\[\]*]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP.has(w));
}

// ── Local reply from lesson content ──────────────────────────────────────────

function localReply(
  question: string,
  lessonTitle: string,
  lessonContent: string
): string {
  if (isMedical(question)) return MEDICAL_REPLY;

  const words = tokens(question);

  if (words.length === 0 || !lessonContent) {
    return `Chim Sẻ chỉ có thể giải đáp thắc mắc về nội dung 16 bài học trong khóa ạ. Câu hỏi của cô chú có thể phù hợp để hỏi trực tiếp Bác sĩ Hương nhé 🌿`;
  }

  // Score each paragraph from the current lesson
  const paragraphs = lessonContent
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 30);

  const scored = paragraphs
    .map((p) => ({
      text: p.replace(/\*\*/g, ""),
      score: words.filter((w) => p.toLowerCase().includes(w)).length,
    }))
    .sort((a, b) => b.score - a.score);

  const top = scored.filter((p) => p.score > 0).slice(0, 2);

  if (top.length === 0) {
    return `Về bài "${lessonTitle}", Chim Sẻ chưa tìm được thông tin phù hợp với câu hỏi của cô chú. Có thể hỏi lại theo cách khác, hoặc đặt câu hỏi trực tiếp với Bác sĩ Hương nhé 🌿`;
  }

  const body = top.map((p) => p.text).join("\n\n");
  return `Về câu hỏi của cô chú:\n\n${body}\n\n🌿`;
}

// ── System prompt (used when Claude API available) ────────────────────────────

function systemPrompt(
  lessonTitle: string,
  lessonContent: string,
  learned: Array<{ q: string; a: string }>
): string {
  const extra =
    learned.length >= 3
      ? `\n\nCâu hỏi phổ biến từ học viên khác:\n` +
        learned
          .slice(-6)
          .map((qa) => `• Hỏi: ${qa.q}\n  Đáp: ${qa.a}`)
          .join("\n")
      : "";

  return `Bạn là Trợ lý Chim Sẻ — trợ lý học tập khóa "Hiểu Đúng Tiểu Đường" do Ts.Bs. Lê Thị Thu Hương thiết kế.

XƯNG HÔ: Luôn xưng "Chim Sẻ", gọi người học là "cô chú". Giọng thân thiện, ấm áp, kiên nhẫn.

BÀI HỌC HIỆN TẠI: ${lessonTitle}
NỘI DUNG BÀI:
${lessonContent}
${extra}

PHẠM VI TRẢ LỜI: Giải thích nội dung bài học, cách áp dụng vào bữa cơm Việt, thắc mắc về ăn uống và vận động nhẹ nhàng.

KHÔNG TRẢ LỜI (chuyển đến Bác sĩ Hương): chỉ số xét nghiệm, thuốc, insulin, chẩn đoán, tư vấn y khoa cá nhân.

Khi gặp câu hỏi y khoa, trả lời đúng nguyên văn: "${MEDICAL_REPLY}"

CÁCH VIẾT: Tối đa 120 từ, ngắn gọn, dùng ví dụ từ bữa cơm Việt, chia gạch đầu dòng nếu dài.`;
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
  const learned = knowledgeBase.get(lessonSlug) ?? [];
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ── No API key → local search ─────────────────────────────────────────────
  if (!apiKey) {
    const reply = localReply(message, lessonTitle, lessonContent);
    knowledgeBase.set(lessonSlug, [...learned, { q: message, a: reply }].slice(-MAX_PER_LESSON));
    return Response.json({ reply });
  }

  // ── Claude Haiku → fallback to local on error ─────────────────────────────
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
        system: systemPrompt(lessonTitle, lessonContent, learned),
        messages: [...history.slice(-16), { role: "user", content: message }],
      }),
    });

    if (!response.ok) throw new Error(`${response.status}`);

    const data = await response.json();
    const reply: string = data.content?.[0]?.text ?? localReply(message, lessonTitle, lessonContent);

    knowledgeBase.set(lessonSlug, [...learned, { q: message, a: reply }].slice(-MAX_PER_LESSON));
    return Response.json({ reply });
  } catch {
    const reply = localReply(message, lessonTitle, lessonContent);
    return Response.json({ reply });
  }
}
