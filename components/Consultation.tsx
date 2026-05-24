"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Consultation() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement)
        .value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-[#1A2820]"
    >
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#2E7A52]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-16 px-6 py-20 md:px-14 lg:grid-cols-2 lg:items-start lg:py-28 lg:gap-24">
        {/* ── LEFT ── */}
        <div>
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#2E7A52]">
            <span className="h-px w-7 bg-[#2E7A52]" />
            1-on-1 Consultation
          </p>

          <h2 className="mt-7 font-serif text-[36px] font-semibold leading-[1.1] tracking-tight text-[#F7F4ED] md:text-[48px]">
            Talk to a wellness
            <br />
            specialist.
          </h2>

          <p className="mt-6 text-[15px] leading-[1.85] text-white/55 max-w-sm">
            Whether you're navigating a health concern, exploring Ayurvedic
            principles, or building a long-term preventative care plan — we'll
            help you find clarity.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              {
                label: "45-min session",
                desc: "Via video or phone, at your convenience",
              },
              {
                label: "Personalised guidance",
                desc: "Nutrition, Ayurveda, lifestyle, or preventative care",
              },
              {
                label: "Follow-up notes",
                desc: "A written summary sent to you after the call",
              },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#2E7A52] shrink-0" />
                <div>
                  <span className="text-[13px] font-semibold text-white/80">
                    {item.label}
                  </span>
                  <span className="text-[13px] text-white/40">
                    {" "}
                    — {item.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT ── */}
        <div>
          {status === "success" ? (
            <div className="border border-white/10 p-10 text-center">
              <div className="w-10 h-10 rounded-full bg-[#2E7A52]/20 flex items-center justify-center mx-auto mb-5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3.5 9.5L7 13L14.5 5"
                    stroke="#2E7A52"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-serif text-[22px] font-semibold text-[#F7F4ED] mb-2">
                Request received.
              </p>
              <p className="text-[13px] text-white/45 leading-relaxed">
                We'll be in touch within 1–2 business days. Check your inbox for
                a confirmation email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  className="h-12 w-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25 transition"
                />
                <input
                  required
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  className="h-12 w-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25 transition"
                />
              </div>

              <input
                required
                name="email"
                type="email"
                placeholder="Email address"
                className="h-12 w-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25 transition"
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone number (optional)"
                className="h-12 w-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25 transition"
              />

              <select
                required
                name="interest"
                defaultValue=""
                className="h-12 w-full border border-white/10 bg-[#1A2820] px-4 text-sm text-white/60 outline-none focus:border-white/25 transition appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Area of interest
                </option>
                <option value="ayurveda">Ayurveda &amp; dosha balancing</option>
                <option value="nutrition">Nutrition &amp; diet</option>
                <option value="preventative">Preventative care</option>
                <option value="hormonal">Hormonal health</option>
                <option value="general">General wellbeing</option>
                <option value="other">Other</option>
              </select>

              <textarea
                name="message"
                rows={3}
                placeholder="Briefly describe what you'd like to discuss (optional)"
                className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25 transition resize-none"
              />

              {status === "error" && (
                <p className="text-[12px] text-red-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 w-full bg-[#2E7A52] text-[11px] uppercase tracking-[0.22em] font-semibold text-white transition hover:bg-[#3C9665] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Book a consultation"}
              </button>

              <p className="text-[11px] text-white/25 text-center pt-1">
                Free to request · No commitment required
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
