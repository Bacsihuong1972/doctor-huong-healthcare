import type { NextRequest } from "next/server";

// ── In-memory learning store ──────────────────────────────────────────────────
const knowledgeBase = new Map<string, Array<{ q: string; a: string }>>();
const MAX_PER_LESSON = 20;

// ── Medical query guard ───────────────────────────────────────────────────────

const MEDICAL_DENY = [
  "toa thuốc", "đơn thuốc", "uống thuốc bao nhiêu", "liều lượng thuốc",
  "tiêm insulin", "liều insulin", "loại insulin", "điều chỉnh insulin",
  "hba1c của tôi", "a1c của tôi", "chỉ số của tôi", "kết quả xét nghiệm của tôi",
  "đường huyết của tôi bao nhiêu",
  "ngưng thuốc", "đổi thuốc", "bỏ thuốc", "tác dụng phụ thuốc",
  "metformin", "glipizide", "empagliflozin", "sitagliptin",
  "chẩn đoán cho tôi",
];

function isMedical(text: string): boolean {
  const t = text.toLowerCase();
  return MEDICAL_DENY.some((kw) => t.includes(kw));
}

const MEDICAL_REPLY =
  "Câu hỏi này cần được Bác sĩ Hương giải đáp trực tiếp ạ. Chim Sẻ không thể tư vấn về thuốc, chỉ số hay tình trạng sức khỏe cá nhân — để đảm bảo an toàn cho cô chú. Cô chú có thể đặt lịch tư vấn 1-1 với Bác sĩ Hương tại mục Liên hệ nhé 🌿";

// ── Stop-words & tokenizer ────────────────────────────────────────────────────

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

// ── Local keyword-search fallback ─────────────────────────────────────────────

function localReply(question: string, lessonTitle: string, lessonContent: string): string {
  if (isMedical(question)) return MEDICAL_REPLY;

  const words = tokens(question);
  if (words.length === 0 || !lessonContent) {
    return "Chim Sẻ chỉ có thể giải đáp thắc mắc về nội dung 16 bài học trong khóa ạ. Câu hỏi của cô chú có thể phù hợp để hỏi trực tiếp Bác sĩ Hương nhé 🌿";
  }

  const paragraphs = lessonContent.split("\n\n").map((p) => p.trim()).filter((p) => p.length > 30);
  const scored = paragraphs
    .map((p) => ({ text: p.replace(/\*\*/g, ""), score: words.filter((w) => p.toLowerCase().includes(w)).length }))
    .sort((a, b) => b.score - a.score);

  const top = scored.filter((p) => p.score > 0).slice(0, 2);
  if (top.length === 0) {
    return `Về bài "${lessonTitle}", Chim Sẻ chưa tìm được thông tin phù hợp. Cô chú thử hỏi theo cách khác hoặc đặt lịch với Bác sĩ Hương nhé 🌿`;
  }

  return `Về câu hỏi của cô chú:\n\n${top.map((p) => p.text).join("\n\n")}\n\n🌿`;
}

// ── Shared system prompt ──────────────────────────────────────────────────────

function buildSystemPrompt(
  lessonTitle: string,
  lessonContent: string,
  learned: Array<{ q: string; a: string }>
): string {
  const extra =
    learned.length >= 3
      ? `\n\nCâu hỏi phổ biến từ học viên khác:\n` +
        learned.slice(-6).map((qa) => `• Hỏi: ${qa.q}\n  Đáp: ${qa.a}`).join("\n")
      : "";

  return `Bạn là Trợ lý Chim Sẻ — trợ lý học tập khóa "Hiểu Đúng Tiểu Đường" do Ts.Bs. Lê Thị Thu Hương thiết kế dành cho người tiền tiểu đường và đái tháo đường type 2.

XƯNG HÔ: Luôn xưng "Chim Sẻ", gọi người học là "cô/chú" hoặc "cô chú". Giọng thân thiện, ấm áp, kiên nhẫn, phù hợp người lớn tuổi.

BÀI HỌC HIỆN TẠI: ${lessonTitle}
NỘI DUNG BÀI:
${lessonContent}
${extra}

PHẠM VI TRẢ LỜI:
- Giải thích khái niệm, cơ chế trong 16 bài học (đường huyết, insulin, glycemic index, v.v.)
- Gợi ý áp dụng vào bữa cơm Việt hằng ngày (cơm, rau, canh, thịt cá)
- Giải thích tại sao thói quen ăn uống/vận động ảnh hưởng đường huyết
- Trả lời câu hỏi thực tế về ăn uống, vận động nhẹ

KHÔNG TRẢ LỜI — chuyển đến Bác sĩ Hương:
- Liều thuốc, toa thuốc, loại thuốc cụ thể
- Liều insulin, cách tiêm insulin
- Chỉ số xét nghiệm cá nhân (HbA1c bao nhiêu là tốt cho TÔI)
- Chẩn đoán bệnh cá nhân

Khi gặp câu hỏi y khoa cá nhân, trả lời ĐÚNG: "${MEDICAL_REPLY}"

CÁCH VIẾT: Ngắn gọn (tối đa 120 từ), dùng ví dụ từ bữa cơm Việt, chia gạch đầu dòng nếu cần, kết thúc bằng 🌿`;
}

// ── Gemini API call ───────────────────────────────────────────────────────────

async function callGemini(
  systemPrompt: string,
  history: Array<{ role: string; content: string }>,
  message: string,
  apiKey: string
): Promise<string> {
  // Build conversation history in Gemini format
  const contents = [
    ...history.slice(-8).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          maxOutputTokens: 400,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini ${response.status}`);
  const data = await response.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) throw new Error("empty");
  return text;
}

// ── Groq API call (free tier, Llama 3.3 70B) ─────────────────────────────────

async function callGroq(
  systemPrompt: string,
  history: Array<{ role: string; content: string }>,
  message: string,
  apiKey: string
): Promise<string> {
  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-8).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error(`Groq ${response.status}`);
  const data = await response.json();
  const text: string = data.choices?.[0]?.message?.content ?? "";
  if (!text) throw new Error("empty");
  return text;
}

// ── Claude Haiku API call ─────────────────────────────────────────────────────

async function callClaude(
  systemPrompt: string,
  history: Array<{ role: string; content: string }>,
  message: string,
  apiKey: string
): Promise<string> {
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
      messages: [...history.slice(-16), { role: "user", content: message }],
    }),
  });

  if (!response.ok) throw new Error(`Claude ${response.status}`);
  const data = await response.json();
  const text: string = data.content?.[0]?.text ?? "";
  if (!text) throw new Error("empty");
  return text;
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

  const groqKey   = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const claudeKey = process.env.ANTHROPIC_API_KEY;

  const prompt = buildSystemPrompt(lessonTitle, lessonContent, learned);

  let reply: string | null = null;

  // Priority 1: Groq — Llama 3.3 70B (free, generous limits)
  if (groqKey && !reply) {
    try {
      reply = await callGroq(prompt, history, message, groqKey);
    } catch {
      reply = null;
    }
  }

  // Priority 2: Google Gemini (free tier)
  if (geminiKey && !reply) {
    try {
      reply = await callGemini(prompt, history, message, geminiKey);
    } catch {
      reply = null;
    }
  }

  // Priority 3: Claude Haiku
  if (claudeKey && !reply) {
    try {
      reply = await callClaude(prompt, history, message, claudeKey);
    } catch {
      reply = null;
    }
  }

  // Priority 3: local keyword search (always works)
  if (!reply) {
    reply = localReply(message, lessonTitle, lessonContent);
  }

  knowledgeBase.set(lessonSlug, [...learned, { q: message, a: reply }].slice(-MAX_PER_LESSON));
  return Response.json({ reply });
}
