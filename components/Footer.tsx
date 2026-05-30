import { getCategories } from "@/lib/actions";
import { categoryList } from "@/lib/interface";
import Image from "next/image";
import Link from "next/link";

const topics = [
  { label: "Ayurveda", href: "/ayurveda" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Preventative Care", href: "/preventative-care" },
  { label: "Wellbeing", href: "/wellbeing" },
  { label: "Hormonal Health", href: "/hormonal-health" },
  { label: "Movement", href: "/movement" },
];

const pages = [
  { label: "About", href: "/about" },

  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export default async function Footer() {
  const categories: categoryList[] = await getCategories();
  return (
    <footer className="border-t border-border bg-background">
      {/* ── Main footer grid ── */}
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-12">
        {/* Brand column */}
        <div className="space-y-5">
          <Link href="/">
            <Image
              src="/natureaid-lettering.svg"
              alt="NatureAid"
              width={160}
              height={44}
              className="w-28 object-contain opacity-80 hover:opacity-100 transition"
            />
          </Link>
          <p className="text-[13px] leading-[1.8] text-muted-foreground max-w-[240px]">
            Helps you make informed decision in alternative health and wellness
            spaces.
          </p>
          <a
            href="/#consultation"
            className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52] border-b border-[#2E7A52] pb-0.5 hover:opacity-70 transition"
          >
            Book a consultation →
          </a>
        </div>

        {/* Topics */}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground mb-5">
            Topics
          </p>
          <ul className="space-y-3">
            {categories.map((category: categoryList) => (
              <li key={category.slug}>
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="text-[13px] text-muted-foreground hover:text-foreground transition"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pages */}
        <div>
          <ul className="space-y-3">
            {pages.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="text-[13px] text-muted-foreground hover:text-foreground transition"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border px-6">
        <div className="max-w-5xl mx-auto h-12 flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} NatureAid. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground">
            Alternative health & wellness services.
          </p>
        </div>
      </div>
    </footer>
  );
}
