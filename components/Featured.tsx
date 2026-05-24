import Link from "next/link";
import Latest from "./Latest";

export default function FeaturedSection() {
  return (
    <section className="px-8 py-24 md:px-14 lg:px-20 lg:py-32">
      <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#2E7A52]">
            <span className="h-px w-7 bg-[#2E7A52]" />
            Recent Writing
          </p>

          <h2 className="mt-6 font-serif text-[44px] font-light leading-[0.95] tracking-[-0.03em] text-[#1A2820] md:text-[64px]">
            Editorial insights
            <br />
            for modern wellbeing.
          </h2>
        </div>

        <Link
          href="/search"
          className="
            self-start
            border-b
            border-[#1A2820]/15
            pb-1
            text-[11px]
            uppercase
            tracking-[0.18em]
            text-[#1A2820]/50
            transition
            hover:border-[#2E7A52]
            hover:text-[#2E7A52]
          "
        >
          View all articles
        </Link>
      </div>

      <Latest />
    </section>
  );
}
