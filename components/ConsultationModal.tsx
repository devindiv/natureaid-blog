"use client";

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";

type Status = "idle" | "loading" | "success" | "error";

// ── Modal ────────────────────────────────────────────────────────────────────

function Modal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-lg bg-[#1A2820] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7 pb-5 border-b border-white/10">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-1">
              1-on-1 Consultation
            </p>
            <h2 className="font-serif text-[22px] font-semibold text-[#F7F4ED] leading-tight">
              Book a session.
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition mt-1 shrink-0"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {status === "success" ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-[#2E7A52]/20 flex items-center justify-center mx-auto mb-5">
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
              <p className="font-serif text-[20px] font-semibold text-[#F7F4ED] mb-2">
                Request received.
              </p>
              <p className="text-[13px] text-white/45 leading-relaxed mb-6">
                We'll be in touch within 1–2 business days.
                <br />
                Check your inbox for a confirmation.
              </p>
              <button
                onClick={onClose}
                className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52] border-b border-[#2E7A52] pb-0.5 hover:opacity-70 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  className="h-11 w-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#2E7A52]/50 transition"
                />
                <input
                  required
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  className="h-11 w-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#2E7A52]/50 transition"
                />
              </div>
              <input
                required
                name="email"
                type="email"
                placeholder="Email address"
                className="h-11 w-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#2E7A52]/50 transition"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone number (optional)"
                className="h-11 w-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#2E7A52]/50 transition"
              />
              <select
                required
                name="interest"
                defaultValue=""
                className="h-11 w-full border border-white/10 bg-[#1A2820] px-4 text-sm text-white/60 outline-none focus:border-[#2E7A52]/50 transition appearance-none cursor-pointer"
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
                className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#2E7A52]/50 transition resize-none"
              />
              {status === "error" && (
                <p className="text-[12px] text-red-400">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-11 w-full bg-[#2E7A52] text-[11px] uppercase tracking-[0.22em] font-semibold text-white hover:bg-[#3C9665] active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Book a consultation"}
              </button>
              <p className="text-[11px] text-white/25 text-center">
                Free to request · No commitment required
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Context ──────────────────────────────────────────────────────────────────

const ModalContext = createContext<{ open: () => void } | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function ConsultationModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ open }}>
      {children}
      {mounted &&
        isOpen &&
        createPortal(<Modal onClose={close} />, document.body)}
    </ModalContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useConsultationModal() {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error(
      "useConsultationModal must be used within ConsultationModalProvider",
    );
  return ctx;
}

// ── Button ───────────────────────────────────────────────────────────────────

export function ConsultationButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useConsultationModal();
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  );
}
