import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "NatureAid: Everything related to health and more",
    template: "%s - NatureAid",
  },
  description:
    "We bring ancient ayurvedic and naturopathic knowledge in the palm of your hand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Toaster />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
