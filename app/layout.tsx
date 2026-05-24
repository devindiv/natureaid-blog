import type { Metadata } from "next";
import { Poppins, Montserrat, Geist } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { ConsultationModalProvider } from "@/components/ConsultationModal";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
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
      className={cn(poppins.variable, montserrat.variable, "font-sans", geist.variable)}
    >
      <body
        suppressHydrationWarning
        className="font-poppins bg-[#FAF8F2] text-[#1B2A22] antialiased overflow-x-hidden"
      >
        {/* Background Glow */}
        <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 bg-radial-green blur-3xl opacity-70" />
        </div>

        <ConsultationModalProvider>
          <div className="relative flex min-h-screen flex-col">
            {/* Header */}
            <Header />

            {/* Main */}
            <main className="relative z-10 flex-1">{children}</main>

            {/* Footer */}
            <Footer />
          </div>

          {/* Global UI */}
          <Toaster />
        </ConsultationModalProvider>

        <Analytics />
      </body>
    </html>
  );
}
