// app/about/page.tsx
import Link from "next/link";
import { ConsultationButton } from "@/components/ConsultationModal";

const values = [
  {
    label: "Root cause, not symptoms",
    desc: "We look beyond surface-level fixes to understand the underlying imbalances that lead to disease.",
  },
  {
    label: "Prevention over intervention",
    desc: "The best medicine is the kind you never need. We help you build habits that keep illness from taking hold.",
  },
  {
    label: "Ancient wisdom, modern clarity",
    desc: "Ayurveda, naturopathy, and nutrition science — distilled into practical, actionable guidance.",
  },
  {
    label: "No dependency on drugs",
    desc: "We believe the body has an extraordinary capacity to heal itself when given the right conditions.",
  },
];

const team = [
  {
    name: "Dr. Priya Sharma",
    role: "Ayurvedic Practitioner",
    bio: "15 years of clinical Ayurvedic practice with a focus on chronic disease reversal and hormonal health.",
    initials: "PS",
  },
  {
    name: "Rahul Nair",
    role: "Functional Nutritionist",
    bio: "Specialises in metabolic health, gut restoration, and evidence-based dietary intervention.",
    initials: "RN",
  },
  {
    name: "Dr. Ananya Iyer",
    role: "Naturopathic Doctor",
    bio: "Integrates naturopathy and lifestyle medicine to address diabetes, PCOS, and preventative care.",
    initials: "AI",
  },
];

export default function AboutPage() {
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
            <span className="text-foreground">About</span>
          </div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
            Our mission
          </p>
          <h1 className="font-serif text-[32px] md:text-[48px] font-semibold leading-[1.1] tracking-tight text-foreground max-w-3xl">
            Guiding people toward a life free from medicine and disease.
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-20">
        {/* ── Who we are ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                Who we are
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="font-serif text-[22px] font-semibold leading-snug tracking-tight text-foreground mb-5">
              A team of alternative health practitioners with one shared belief
              — your body knows how to heal.
            </p>
            <p className="text-[15px] leading-[1.85] text-muted-foreground mb-4">
              NatureAid was founded by a collective of Ayurvedic doctors,
              functional nutritionists, and naturopathic practitioners who grew
              frustrated with a healthcare system that treats symptoms while
              ignoring root causes.
            </p>
            <p className="text-[15px] leading-[1.85] text-muted-foreground">
              We combine the time-tested principles of Ayurveda and naturopathy
              with modern nutritional science to help people reverse chronic
              conditions, reclaim their energy, and build lasting health —
              without lifelong dependency on pharmaceutical drugs.
            </p>
          </div>

          {/* Pull quote */}
          <div className="border-l-2 border-[#2E7A52] pl-8 py-4">
            <blockquote className="font-serif text-[22px] font-light leading-[1.5] text-foreground italic mb-4">
              "The goal is not to manage your condition. It's to no longer need
              management at all."
            </blockquote>
            <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52]">
              NatureAid Team
            </p>
          </div>
        </div>

        {/* ── What we believe ── */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
              What we believe
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
            {values.map((v) => (
              <div key={v.label} className="bg-background p-7">
                <div className="w-6 h-6 rounded-full bg-[#2E7A52]/10 flex items-center justify-center mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#2E7A52] block" />
                </div>
                <h3 className="font-serif text-[17px] font-semibold text-foreground mb-2 leading-snug">
                  {v.label}
                </h3>
                <p className="text-[13px] leading-[1.75] text-muted-foreground">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Meet the team ── */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
              The team
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="border border-border p-6 rounded-sm"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#E8EDE9] flex items-center justify-center mb-5">
                  <span className="text-[13px] font-semibold text-[#2E7A52]">
                    {member.initials}
                  </span>
                </div>
                <p className="font-serif text-[17px] font-semibold text-foreground leading-tight mb-1">
                  {member.name}
                </p>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52] mb-3">
                  {member.role}
                </p>
                <p className="text-[13px] leading-[1.75] text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── What we publish ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-border pt-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                Our journal
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="font-serif text-[22px] font-semibold leading-snug tracking-tight text-foreground mb-4">
              Evidence-informed writing on living well without pharmaceuticals.
            </p>
            <p className="text-[15px] leading-[1.85] text-muted-foreground mb-6">
              Every article on NatureAid is written or reviewed by our
              practitioners. We cover Ayurveda, functional nutrition,
              preventative care, hormonal health, and sustainable lifestyle
              medicine — grounded in both ancient tradition and modern research.
            </p>
            <Link
              href="/search"
              className="text-[11px] font-semibold tracking-[0.12em] uppercase border-b border-[#2E7A52] text-[#2E7A52] pb-0.5 hover:opacity-70 transition"
            >
              Browse all articles →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px bg-border border border-border">
            {[
              { value: "50+", label: "Articles published" },
              { value: "6", label: "Wellness topics" },
              { value: "15+", label: "Years of combined practice" },
              { value: "1000+", label: "People guided" },
            ].map((stat) => (
              <div key={stat.label} className="bg-background p-6 text-center">
                <p className="font-serif text-[36px] font-semibold text-[#2E7A52] leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[12px] text-muted-foreground leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="border-t border-border pt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-[24px] font-semibold text-foreground mb-1">
              Ready to take the first step?
            </p>
            <p className="text-[13px] text-muted-foreground">
              Book a 1-on-1 session with one of our practitioners.
            </p>
          </div>
          <ConsultationButton className="shrink-0 px-6 py-3 bg-[#1A2820] text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm hover:bg-[#2E7A52] transition-colors">
            Book a consultation
          </ConsultationButton>
        </div>
      </div>
    </main>
  );
}
