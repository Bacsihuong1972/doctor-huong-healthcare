import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/register
 * Forwards name + phone to a Google Apps Script web app that
 * appends a row to a Google Sheet.
 *
 * Env var: GOOGLE_SHEET_WEBHOOK_URL
 */
export async function POST(req: NextRequest) {
  try {
    const { name, phone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Thiếu tên hoặc số điện thoại" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (webhookUrl) {
      // Fire-and-forget — don't block the user waiting for Google
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          timestamp: new Date().toISOString(),
          source: "website",
        }),
      }).catch((err) => {
        console.error("[register] Google Sheet webhook failed:", err);
      });
    } else {
      console.warn("[register] GOOGLE_SHEET_WEBHOOK_URL not set — skipping sheet write");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Lỗi server" },
      { status: 500 }
    );
  }
}
