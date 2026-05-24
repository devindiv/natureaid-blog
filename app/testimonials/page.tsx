// app/testimonial/page.tsx
// Testimonials are managed in Sanity. Each document has:
//   title: string
//   platform: 'youtube' | 'facebook' | 'instagram' | 'tiktok'
//   videoUrl: string  (the full public URL of the video)
//   name: string      (reviewer name)
//   featured: boolean

import { client } from "@/lib/sanity";
import { Metadata } from "next";
import VideoCard from "@/components/Videocard";
import { ConsultationButton } from "@/components/ConsultationModal";

export const metadata: Metadata = {
  title: "Testimonials | NatureAid",
  description: "Real stories from our community.",
};

export const revalidate = 60;

export interface Testimonial {
  _id: string;
  title: string;
  platform: "youtube" | "facebook" | "instagram" | "tiktok";
  videoUrl: string;
  name: string;
  featured: boolean;
}

async function getTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    platform,
    videoUrl,
    name,
    featured,
  }`;
  return client.fetch(query);
}

export default async function TestimonialPage() {
  const testimonials = await getTestimonials();

  const featured = testimonials.filter((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Masthead ── */}
      <div className="border-b border-border px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
            Community
          </p>
          <h1 className="font-serif text-[32px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-foreground">
            Real stories, real results.
          </h1>
          <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground max-w-xl">
            Hear from people who've experienced the NatureAid approach to
            long-term wellness first-hand.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">
        {/* ── Featured ── */}
        {featured.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                Featured
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((t) => (
                <VideoCard key={t._id} testimonial={t} large />
              ))}
            </div>
          </div>
        )}

        {/* ── All testimonials ── */}
        {rest.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                More stories
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((t) => (
                <VideoCard key={t._id} testimonial={t} />
              ))}
            </div>
          </div>
        )}

        {testimonials.length === 0 && (
          <div className="py-24 text-center text-muted-foreground text-[15px]">
            No testimonials yet.
          </div>
        )}

        {/* ── CTA ── */}
        <div className="border-t border-border pt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-[22px] font-semibold text-foreground mb-1">
              Ready to start your journey?
            </p>
            <p className="text-[13px] text-muted-foreground">
              Book a 1-on-1 session with a wellness specialist.
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
