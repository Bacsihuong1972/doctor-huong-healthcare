import type { NextRequest } from "next/server";

// ── In-memory learning store ──────────────────────────────────────────────────
// Accumulates Q&A pairs per lesson from all users during the server's lifetime.
// For cross-deployment persistence, replace with Vercel KV or a database.
const knowledgeBase = new Map<string, Array<{ q: string; a: string }>>();
const MAX_PER_LESSON = 20;

// ── System prompt builder ─────────────────────────────────────────────────────

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
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { reply: "Chim Sẻ chưa được kết nối — vui lòng liên hệ quản trị viên ạ." },
      { status: 200 }
    );
  }

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
  const systemPrompt = buildSystemPrompt(lessonTitle, lessonContent, learned);

  // Build messages array (keep last 8 turns to avoid token overflow)
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

    // Accumulate Q&A for learning (keep max per lesson)
    const updated = [...learned, { q: message, a: reply }].slice(-MAX_PER_LESSON);
    knowledgeBase.set(lessonSlug, updated);

    return Response.json({ reply });
  } catch {
    return Response.json(
      { reply: "Xin lỗi, Chim Sẻ đang gặp sự cố kỹ thuật. Cô chú thử lại sau nhé ạ 🌿" },
      { status: 200 }
    );
  }
}
