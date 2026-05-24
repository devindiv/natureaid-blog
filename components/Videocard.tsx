// components/VideoCard.tsx
"use client";

import { useState } from "react";
import { Testimonial } from "@/app/testimonials/page";

function getEmbedUrl(
  url: string,
  platform: Testimonial["platform"],
): string | null {
  try {
    switch (platform) {
      case "youtube": {
        // handles youtu.be/ID and youtube.com/watch?v=ID and /shorts/ID
        const match = url.match(
          /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/,
        );
        return match
          ? `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`
          : null;
      }
      case "facebook": {
        // Facebook video embed via their plugin URL
        const encoded = encodeURIComponent(url);
        return `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=560&autoplay=false`;
      }
      case "instagram": {
        // Instagram embed — extract post ID from /reel/ID/ or /p/ID/
        const match = url.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/);
        return match
          ? `https://www.instagram.com/p/${match[1]}/embed/captioned/`
          : null;
      }
      case "tiktok": {
        // TikTok embed — extract video ID
        const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
        return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
}

const platformLabel: Record<Testimonial["platform"], string> = {
  youtube: "YouTube",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

const platformColor: Record<Testimonial["platform"], string> = {
  youtube: "#FF0000",
  facebook: "#1877F2",
  instagram: "#E1306C",
  tiktok: "#010101",
};

interface VideoCardProps {
  testimonial: Testimonial;
  large?: boolean;
}

export default function VideoCard({
  testimonial,
  large = false,
}: VideoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = getEmbedUrl(testimonial.videoUrl, testimonial.platform);

  // Aspect ratio: Instagram/TikTok are portrait (9/16), others landscape (16/9)
  const isPortrait =
    testimonial.platform === "instagram" || testimonial.platform === "tiktok";

  return (
    <div className="group flex flex-col rounded-sm overflow-hidden border border-border bg-background hover:border-[#2E7A52]/40 transition-colors duration-200">
      {/* Video embed */}
      <div
        className={`relative w-full bg-muted ${
          isPortrait
            ? large
              ? "aspect-[9/14]"
              : "aspect-[9/16]"
            : "aspect-video"
        }`}
      >
        {/* Platform badge */}
        <div
          className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold tracking-wide"
          style={{ backgroundColor: platformColor[testimonial.platform] }}
        >
          <PlatformIcon platform={testimonial.platform} />
          {platformLabel[testimonial.platform]}
        </div>

        {/* Loading shimmer */}
        {!loaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => setLoaded(true)}
            title={testimonial.title}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[13px] text-muted-foreground">
            Unable to load video
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="px-4 py-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          {testimonial.name && (
            <p className="text-[13px] font-semibold text-foreground truncate">
              {testimonial.name}
            </p>
          )}
          {testimonial.title && (
            <p className="text-[12px] text-muted-foreground truncate mt-0.5">
              {testimonial.title}
            </p>
          )}
        </div>
        <a
          href={testimonial.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[11px] font-semibold tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground transition border-b border-transparent hover:border-current pb-px"
        >
          Watch →
        </a>
      </div>
    </div>
  );
}

function PlatformIcon({ platform }: { platform: Testimonial["platform"] }) {
  switch (platform) {
    case "youtube":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
        </svg>
      );
    case "facebook":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-1.9.9-1.9 1.9v2.2h3.3l-.5 3.5h-2.8v8.4C19.6 23.1 24 18.1 24 12.1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.2 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.6 0h-3.9v16.4a3.9 3.9 0 0 1-3.9 3.7 3.9 3.9 0 0 1-3.9-3.9 3.9 3.9 0 0 1 3.9-3.9c.4 0 .7 0 1 .1V8.5a7.8 7.8 0 0 0-1-.1 7.8 7.8 0 0 0-7.8 7.8 7.8 7.8 0 0 0 7.8 7.8 7.8 7.8 0 0 0 7.8-7.8V6.5a10.8 10.8 0 0 0 5.8 1.7V4.3a7.1 7.1 0 0 1-5.8-4.3z" />
        </svg>
      );
  }
}
