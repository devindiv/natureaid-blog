import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { roboto } from "@/components/ui/fonts";

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
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8338403329746838"
        crossOrigin="anonymous"
      ></script>
      <meta
        name="google-adsense-account"
        content="ca-pub-8338403329746838"
      ></meta>
      <body>
        <Header />
        <main className={`${roboto.className} min-h-screen text-slate-800`}>
          {children}
        </main>
        <Toaster />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
