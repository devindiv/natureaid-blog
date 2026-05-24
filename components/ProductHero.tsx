"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const HONEY_IMAGE =
  "https://cpimg.tistatic.com/08699065/b/4/Sundarban-Wild-Forest-Honey.jpg";

export default function ProductHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = useCallback(() => {
    if (!email.includes("@")) return;
    setSubmitted(true);
  }, [email]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#FAF8F2] font-poppins">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-5%] top-[-5%] h-[600px] w-[600px] rounded-full bg-[#2B8055]/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#C58B52]/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 items-stretch min-h-[calc(100vh-80px)]">
        {/* LEFT COLUMN: EDITORIAL DETAILS (Takes 5 cols on large screens for balanced asymmetry) */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-16 md:px-12 lg:col-span-6 lg:py-24 xl:pr-16">
          {/* Eyebrow Status */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2B8055]">
              Sundarban Mangroves · West Bengal
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D27A6A]/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-[#D27A6A]">
              <span className="h-1 w-1 rounded-full bg-[#D27A6A]" />
              Sold Out
            </span>
          </div>

          {/* Luxury Heading */}
          <h1 className="font-serif text-6xl font-light leading-[1.05] tracking-tight text-[#1B2A22] md:text-7xl lg:text-8xl">
            Wild <br />
            <span className="italic font-normal text-[#2B8055] serif-clause">
              Raw
            </span>{" "}
            <br />
            Honey
          </h1>

          {/* Pricing & Overview */}
          <div className="mt-8 flex items-baseline gap-4 border-b border-[#2B8055]/10 pb-6">
            <span className="text-4xl font-light tracking-tight text-[#1B2A22]">
              ₹649
            </span>
            <span className="text-xs uppercase tracking-widest text-[#1B2A22]/40 font-medium">
              / 500g Glass Jar
            </span>
          </div>

          {/* Premium Narrative Copy */}
          <p className="mt-6 text-[15px] font-light leading-8 text-[#1B2A22]/70 max-w-lg">
            Single-origin forest honey harvested seasonally from the pristine
            mangroves of the Sundarbans. Pure, unfiltered, and completely
            untouched by industrial processing.
          </p>

          {/* Metadata Badges */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["Wild Harvest", "Raw & Unfiltered", "Single Origin"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#2B8055]/10 bg-white/40 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-wider text-[#1B2A22]/60 backdrop-blur-sm"
                >
                  <Sparkles size={10} className="text-[#2B8055]/50" />
                  {item}
                </span>
              ),
            )}
          </div>

          {/* High-End Waitlist Form */}
          <div className="mt-12 max-w-md w-full">
            {!submitted ? (
              <div className="space-y-4">
                <div className="group relative flex items-center border-b border-[#1B2A22]/20 py-2 transition-colors focus-within:border-[#2B8055]">
                  <input
                    type="email"
                    placeholder="Enter your email for private access"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-2 text-sm text-[#1B2A22] outline-none placeholder:text-[#1B2A22]/30 font-light"
                  />
                  <button
                    onClick={handleNotify}
                    disabled={!email.includes("@")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B8055] text-white shadow-md transition-all duration-300 hover:bg-[#206341] disabled:opacity-30 disabled:hover:bg-[#2B8055]"
                    aria-label="Notify Me"
                  >
                    <ArrowRight size={16} strokeWidth={2} />
                  </button>
                </div>
                <p className="text-[11px] font-light text-[#1B2A22]/40 tracking-wide">
                  * Next rare batch expected soon. Join the waitlist for
                  priority notification.
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-[#2B8055]/20 bg-[#2B8055]/5 p-4 text-sm text-[#2B8055] backdrop-blur-md">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2B8055] text-white">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="font-medium tracking-wide">
                  You have been allocated a priority spot.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MUSEUM-GRADE VISUAL FRAME (Takes 6 cols) */}
        {/* RIGHT COLUMN */}
        <div className="relative flex items-center justify-center px-6 pb-10 pt-0 md:px-10 lg:col-span-6 lg:h-full lg:py-10">
          <div className="relative h-[520px] w-full max-w-[640px] overflow-hidden rounded-[28px] bg-[#EFEAE0] shadow-[0_30px_80px_rgba(27,42,34,0.10)] lg:h-full">
            {/* Image */}
            <Image
              src={HONEY_IMAGE}
              alt="NatureAid Wild Raw Honey"
              fill
              priority
              className="object-cover"
            />

            {/* Cinematic Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between border-t border-white/10 pt-6 text-white">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/60">
                    Harvest Region
                  </p>

                  <p className="mt-2 text-lg font-light tracking-tight">
                    Sundarban Mangroves
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/60">
                    Batch
                  </p>

                  <p className="mt-2 text-sm font-light tracking-wide">
                    Spring 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
