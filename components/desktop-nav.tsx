"use client";

import Link from "next/link";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Articles",
    href: "/search",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {navLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-sm text-[#1B2A22]/60 hover:text-[#2B8055] transition"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
