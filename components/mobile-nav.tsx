"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useConsultationModal } from "@/components/ConsultationModal";
import { categoryList } from "@/lib/interface";
import { getCategories } from "@/lib/actions";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Search", href: "/search" },
  { label: "About", href: "/about" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<categoryList[]>([]);
  const { open: openModal } = useConsultationModal();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  function handleConsult() {
    setOpen(false);
    setTimeout(openModal, 150);
  }

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center border border-border rounded-sm hover:bg-muted transition-colors"
          >
            <Menu size={16} className="text-foreground" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[85vw] max-w-sm border-l border-border bg-background p-0 flex flex-col"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          {/* ── Top: brand ── */}
          <div className="px-6 pt-8 pb-6 border-b border-border">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#2E7A52] mb-1">
              NatureAid
            </p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Alternative & Holistic health services
            </p>
          </div>

          {/* ── Main nav ── */}
          <nav className="px-6 py-6 border-b border-border">
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Menu
            </p>
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-border last:border-0 text-[15px] font-medium text-foreground hover:text-[#2E7A52] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* ── Topics ── */}
          {categories.length > 0 && (
            <div className="px-6 py-6 border-b border-border">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="px-3 py-1.5 border border-border rounded-full text-[12px] font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA ── */}
          <div className="px-6 py-6 mt-auto">
            <button
              onClick={handleConsult}
              className="w-full py-3 bg-[#1A2820] text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm hover:bg-[#2E7A52] transition-colors"
            >
              Book a consultation
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
