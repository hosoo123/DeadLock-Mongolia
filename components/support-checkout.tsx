"use client";

import { FormEvent, useEffect, useState } from "react";

export function SupportCheckout() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("5000");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const openCheckout = () => {
      setError("");
      setOpen(true);
    };

    const interceptWireLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>(
        'a[href^="https://pay.wire.mn/link/"]',
      );
      if (!link) return;

      event.preventDefault();
      openCheckout();
    };

    window.addEventListener("open-wire-checkout", openCheckout);
    document.addEventListener("click", interceptWireLink, true);
    return () => {
      window.removeEventListener("open-wire-checkout", openCheckout);
      document.removeEventListener("click", interceptWireLink, true);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, loading]);

  async function startCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/wire/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), amount: Number(amount) }),
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Төлбөрийн хуудас нээж чадсангүй.");
      }

      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Түр хүлээгээд дахин оролдоно уу.",
      );
      setLoading(false);
    }
  }

  return (
    <>
      {open ? (
        <div
          className="wire-checkout-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !loading) setOpen(false);
          }}
        >
          <section
            className="wire-checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wireCheckoutTitle"
          >
            <button
              className="wire-checkout-close"
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
              aria-label="Төлбөрийн цонх хаах"
            >
              ×
            </button>
            <span className="wire-support-kicker">Wire · QPay</span>
            <h2 id="wireCheckoutTitle">Deadlock Mongolia-г дэмжих</h2>
            <p>
              Төлбөр амжилттай болсны дараа энэ хаяг руу баярласан имэйл
              автоматаар очно.
            </p>

            <form className="wire-checkout-form" onSubmit={startCheckout}>
              <label>
                Имэйл хаяг
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </label>
              <label>
                Дэмжлэгийн дүн (₮)
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  min="500"
                  max="1000000"
                  step="1"
                  required
                />
              </label>
              {error ? <p className="wire-checkout-error">{error}</p> : null}
              <button type="submit" disabled={loading}>
                {loading ? "Төлбөрийн хуудас бэлдэж байна…" : "QPay-аар үргэлжлүүлэх"}
              </button>
            </form>
            <small>
              Имэйл хаягийг зөвхөн энэ төлбөрийн баталгаажуулалт, талархлын
              имэйлд ашиглана.
            </small>
          </section>
        </div>
      ) : null}
    </>
  );
}
