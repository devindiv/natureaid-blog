import type { Metadata } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { ConsultationModalProvider } from "@/components/ConsultationModal";
import { cn } from "@/lib/utils";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NatureAid",
    template: "%s | NatureAid",
  },
  description:
    "Evidence-based wellness, nutrition, and preventative health insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(dmSans.variable, sourceSerif.variable)}
    >
      <body
        suppressHydrationWarning
        className="font-sans bg-[#FAF8F2] text-[#1B2A22] antialiased overflow-x-hidden"
      >
        <div
          className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 bg-radial-green blur-3xl opacity-70" />
        </div>

        <ConsultationModalProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ConsultationModalProvider>

        <Analytics />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8338403329746838"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
