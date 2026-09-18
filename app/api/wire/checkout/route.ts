import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 1_000_000;

type WirePaymentIntent = { id?: string };
type WireCheckoutSession = { url?: string };

async function wireRequest<T>(
  path: string,
  apiKey: string,
  body: Record<string, unknown>,
  idempotencyKey: string,
) {
  const response = await fetch(`https://api.wire.mn/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const result = (await response.json().catch(() => ({}))) as T & {
    error?: { message?: string };
  };

  if (!response.ok) {
    console.error("Wire API request failed", {
      path,
      status: response.status,
      message: result.error?.message,
    });
    throw new Error("Wire төлбөрийн үйлчилгээ түр хариу өгөхгүй байна.");
  }

  return result;
}

export async function POST(request: Request) {
  const apiKey = process.env.WIRE_SECRET_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Wire API key тохируулаагүй байна." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    amount?: unknown;
  } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const amount = Number(body?.amount);

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Зөв имэйл хаяг оруулна уу." }, { status: 400 });
  }

  if (!Number.isInteger(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return NextResponse.json(
      { error: `Дүн ${MIN_AMOUNT.toLocaleString()}–${MAX_AMOUNT.toLocaleString()}₮ байна.` },
      { status: 400 },
    );
  }

  try {
    const requestId = randomUUID();
    const allowedOperators = (process.env.WIRE_ALLOWED_OPERATORS || "qpay")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const intent = await wireRequest<WirePaymentIntent>(
      "/payment_intents",
      apiKey,
      {
        amount,
        currency: "MNT",
        description: "Deadlock Mongolia дэмжлэг",
        automatic_operator: true,
        allowed_operators: allowedOperators,
        metadata: { customer_email: email, source: "deadlock-mongolia" },
      },
      `deadlock-donation-${requestId}`,
    );

    if (!intent.id) throw new Error("Wire PaymentIntent ID ирсэнгүй.");

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const checkout = await wireRequest<WireCheckoutSession>(
      "/checkout/sessions",
      apiKey,
      {
        payment_intent: intent.id,
        success_url: `${origin}/?payment=success`,
        cancel_url: `${origin}/?payment=cancelled`,
      },
      `deadlock-checkout-${requestId}`,
    );

    if (!checkout.url || !checkout.url.startsWith("https://pay.wire.mn/")) {
      throw new Error("Wire checkout URL буруу байна.");
    }

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error("Could not create Wire checkout", error);
    return NextResponse.json(
      { error: "Төлбөрийн хуудас нээж чадсангүй. Түр хүлээгээд дахин оролдоно уу." },
      { status: 502 },
    );
  }
}
