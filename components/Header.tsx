import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { getCategories } from "@/lib/actions";
import { categoryList } from "@/lib/interface";
import { ConsultationButton } from "@/components/ConsultationModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Search", href: "/search" },
  { label: "About", href: "/about" },
];

export default async function Header() {
  const categories: categoryList[] = await getCategories();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md">
      {/* ── Row 1: Logo + Nav + CTA ── */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/natureaid-brand-new-logo-2026.svg"
              alt="NatureAid"
              width={180}
              height={48}
              priority
              className="h-6 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="h-4 w-px bg-border" />
            <ConsultationButton className="px-4 py-2 bg-[#1A2820] text-white text-[11px] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-[#2E7A52] transition-colors whitespace-nowrap">
              Book a consultation
            </ConsultationButton>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <ConsultationButton className="px-3 py-1.5 bg-[#1A2820] text-white text-[10px] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-[#2E7A52] transition-colors">
              Consult
            </ConsultationButton>
            <MobileNav />
          </div>
        </div>
      </div>

      {/* ── Row 2: Category strip (desktop only) ── */}
      {categories && categories.length > 0 && (
        <div className="hidden md:block border-b border-border">
          <div className="max-w-5xl mx-auto px-6 h-9 flex items-center">
            {categories.map((category: categoryList) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="h-full flex items-center px-4 first:pl-0 text-[11px] font-medium text-muted-foreground hover:text-[#2E7A52] transition-colors whitespace-nowrap border-b-[1.5px] border-transparent hover:border-[#2E7A52]"
              >
                {category.title}
              </Link>
            ))}
            <Link
              href="/search"
              className="ml-auto text-[11px] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              All topics →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
