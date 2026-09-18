import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_SIGNATURE_AGE_SECONDS = 300;

type PaymentIntent = {
  id?: string;
  object?: string;
  amount?: number;
  currency?: string;
  metadata?: Record<string, unknown>;
};

type WireEventData = PaymentIntent & {
  object?: string | PaymentIntent;
  payment_intent?: string | PaymentIntent;
};

type WireEvent = {
  id?: string;
  type?: string;
  data?: WireEventData;
};

function parseSignature(value: string | null) {
  if (!value) return null;

  const parts = new Map(
    value.split(",").map((part) => {
      const [key, ...rest] = part.trim().split("=");
      return [key, rest.join("=")];
    }),
  );

  const timestamp = Number(parts.get("t"));
  const signature = parts.get("v1");

  if (!Number.isFinite(timestamp) || !signature) return null;
  return { timestamp, signature };
}

function signaturesMatch(expected: string, received: string) {
  if (!/^[a-f0-9]+$/i.test(received)) return false;

  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

function getPaymentIntent(event: WireEvent) {
  const data = event.data;
  if (!data) return null;

  if (data.object && typeof data.object === "object") {
    return data.object;
  }

  if (data.payment_intent && typeof data.payment_intent === "object") {
    return data.payment_intent;
  }

  return data as PaymentIntent;
}

function getPaymentIntentId(event: WireEvent, paymentIntent: PaymentIntent | null) {
  if (paymentIntent?.id) return paymentIntent.id;

  const nested = event.data?.payment_intent;
  if (typeof nested === "string") return nested;
  if (nested && typeof nested === "object" && nested.id) return nested.id;

  return null;
}

async function retrievePaymentIntent(id: string) {
  const apiKey = process.env.WIRE_SECRET_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    `https://api.wire.mn/v1/payment_intents/${encodeURIComponent(id)}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    console.error("Could not retrieve Wire PaymentIntent for email", {
      id,
      status: response.status,
    });
    return null;
  }

  return (await response.json()) as PaymentIntent;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendThankYouEmail(
  email: string,
  amount: number | undefined,
  eventId: string,
) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailAppPassword) {
    throw new Error("Email provider is not configured");
  }

  const safeEmail = escapeHtml(email);
  const amountText = Number.isFinite(amount)
    ? `${Number(amount).toLocaleString("mn-MN")}₮`
    : "таны дэмжлэг";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  await transporter.sendMail({
    from: `"Deadlock Mongolia" <${gmailUser}>`,
    to: email,
    subject: "Deadlock Mongolia-г дэмжсэнд баярлалаа!",
    messageId: `<wire-${eventId}@deadlock-mongolia>`,
    html: `
        <div style="margin:0;background:#0d110f;padding:32px 16px;font-family:Arial,sans-serif;color:#eefbf2">
          <div style="max-width:560px;margin:0 auto;border:1px solid #285c39;border-radius:14px;background:#131b16;padding:30px">
            <p style="margin:0 0 8px;color:#4ade80;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Deadlock Mongolia</p>
            <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2">Дэмжсэнд маш их баярлалаа! ❤️</h1>
            <p style="margin:0 0 14px;color:#cfe5d6;line-height:1.7">Таны <strong>${amountText}</strong>-ийн төлбөр амжилттай баталгаажлаа. Таны дэмжлэг Монгол Deadlock community болон item тайлбарын сайтыг цааш хөгжүүлэхэд тусална.</p>
            <p style="margin:0;color:#91aa99;font-size:12px;line-height:1.6">Энэ имэйлийг Wire төлбөр дээр оруулсан <strong>${safeEmail}</strong> хаяг руу автоматаар илгээлээ.</p>
          </div>
        </div>
      `,
    text: `Deadlock Mongolia-г дэмжсэнд маш их баярлалаа! Таны ${amountText}-ийн төлбөр амжилттай баталгаажлаа.`,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "wire-webhook",
    configured: Boolean(process.env.WIRE_WEBHOOK_SECRET),
  });
}

export async function POST(request: Request) {
  const secret = process.env.WIRE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Webhook secret is not configured" },
      { status: 503 },
    );
  }

  const parsed = parseSignature(request.headers.get("WirePayment-Signature"));
  if (!parsed) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid signature" },
      { status: 401 },
    );
  }

  const now = Math.floor(Date.now() / 1000);
  if (
    parsed.timestamp > now + 30 ||
    now - parsed.timestamp > MAX_SIGNATURE_AGE_SECONDS
  ) {
    return NextResponse.json(
      { ok: false, error: "Expired signature" },
      { status: 401 },
    );
  }

  const rawBody = await request.text();
  const expected = createHmac("sha256", secret)
    .update(`${parsed.timestamp}.${rawBody}`)
    .digest("hex");

  if (!signaturesMatch(expected, parsed.signature)) {
    return NextResponse.json(
      { ok: false, error: "Signature verification failed" },
      { status: 401 },
    );
  }

  let event: WireEvent;
  try {
    event = JSON.parse(rawBody) as WireEvent;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  console.info("Wire webhook verified", {
    id: event.id ?? "unknown",
    type: event.type ?? "unknown",
  });

  if (event.type === "payment_intent.succeeded") {
    let paymentIntent = getPaymentIntent(event);
    let email = paymentIntent?.metadata?.customer_email;

    // Зарим webhook payload metadata-г бүтнээр нь агуулахгүй байж болно.
    // Тийм үед PaymentIntent ID-аар Wire API-аас бүрэн object-ийг дахин авна.
    if (typeof email !== "string") {
      const paymentIntentId = getPaymentIntentId(event, paymentIntent);
      if (paymentIntentId) {
        const retrieved = await retrievePaymentIntent(paymentIntentId);
        if (retrieved) {
          paymentIntent = retrieved;
          email = retrieved.metadata?.customer_email;
        }
      }
    }

    // Хуучин payment link болон email metadata-гүй төлбөрийг алгасана.
    if (typeof email === "string" && email.length <= 254) {
      try {
        await sendThankYouEmail(
          email,
          paymentIntent?.amount,
          event.id || paymentIntent?.id || "unknown-payment",
        );
        console.info("Wire thank-you email sent", {
          eventId: event.id ?? "unknown",
          paymentIntentId: paymentIntent?.id ?? "unknown",
        });
      } catch (error) {
        console.error("Wire webhook email processing failed", error);
        // 5xx өгснөөр Wire event-ийг дахин илгээж, түр зуурын email алдааг нөхнө.
        return NextResponse.json(
          { ok: false, error: "Email delivery failed" },
          { status: 503 },
        );
      }
    } else {
      console.warn("Wire thank-you email skipped: customer_email metadata missing", {
        eventId: event.id ?? "unknown",
        paymentIntentId: paymentIntent?.id ?? "unknown",
        dataKeys: event.data ? Object.keys(event.data) : [],
      });
    }
  }

  return NextResponse.json({ ok: true, received: true });
}
