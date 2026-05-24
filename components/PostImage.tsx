"use client";

import Image from "next/image";
import { useState } from "react";

export default function PostImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="mb-10 aspect-[16/9] overflow-hidden rounded-sm relative bg-muted">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-muted z-10" />
      )}
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="w-full h-full object-cover"
        priority
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
