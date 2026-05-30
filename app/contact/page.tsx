// app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";

type Status = "idle" | "loading" | "success" | "error";

const contactInfo = [
  {
    label: "Email",
    value: "contact@natureaid.in",
    href: "mailto:contact@natureaid.in",
  },

  {
    label: "Location",
    value: "India",
    href: null,
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/natureaid.official",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.2 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/natureaid",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.9v2.2h3.3l-.5 3.5h-2.8v8.4C19.6 23.1 24 18.1 24 12.1z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@natureaid",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Masthead ── */}
      <div className="border-b border-border px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-5">
            <Link href="/" className="hover:text-foreground transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Contact</span>
          </div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
            Get in touch
          </p>
          <h1 className="font-serif text-[32px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-foreground">
            We'd love to hear from you.
          </h1>
          <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground max-w-xl">
            Questions, feedback, or just want to say hello — reach out and we'll
            get back to you within 1–2 business days.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
          {/* ── LEFT: Form ── */}
          <div>
            {status === "success" ? (
              <div className="py-16 text-center border border-border rounded-sm">
                <div className="w-12 h-12 rounded-full bg-[#2E7A52]/10 flex items-center justify-center mx-auto mb-5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10.5L8 14.5L16 6"
                      stroke="#2E7A52"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="font-serif text-[22px] font-semibold text-foreground mb-2">
                  Message sent.
                </p>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-6 max-w-xs mx-auto">
                  Thanks for reaching out. We'll be in touch within 1–2 business
                  days. Check your inbox for a confirmation.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52] border-b border-[#2E7A52] pb-0.5 hover:opacity-70 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                      Name <span className="text-[#2E7A52]">*</span>
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      className="h-11 w-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-[#2E7A52] transition rounded-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                      Email <span className="text-[#2E7A52]">*</span>
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="h-11 w-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-[#2E7A52] transition rounded-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000 (optional)"
                    className="h-11 w-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-[#2E7A52] transition rounded-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                    Subject <span className="text-[#2E7A52]">*</span>
                  </label>
                  <input
                    required
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className="h-11 w-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-[#2E7A52] transition rounded-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                    Message <span className="text-[#2E7A52]">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Tell us more..."
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-[#2E7A52] transition resize-none rounded-sm"
                  />
                </div>

                {status === "error" && (
                  <p className="text-[12px] text-red-500">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 px-8 bg-[#1A2820] text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm hover:bg-[#2E7A52] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: Info ── */}
          <aside className="space-y-10">
            {/* Contact info */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                  Contact info
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-col">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="py-4 border-b border-border last:border-0"
                  >
                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[14px] text-foreground hover:text-[#2E7A52] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[14px] text-foreground">
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                  Follow us
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-col gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[13px] text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <span className="text-muted-foreground group-hover:text-[#2E7A52] transition-colors">
                      {s.icon}
                    </span>
                    {s.label}
                    <span className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Consultation CTA */}
            <div className="bg-[#1A2820] p-6 rounded-sm">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
                1-on-1 Consultation
              </p>
              <p className="font-serif text-[17px] font-normal leading-snug text-[#F7F4ED] mb-4">
                Looking for personalised wellness guidance?
              </p>
              <Link
                href="/#consultation"
                className="block w-full text-center py-2.5 bg-[#2E7A52] text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm hover:bg-[#3C9665] transition-colors"
              >
                Book a consultation
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
