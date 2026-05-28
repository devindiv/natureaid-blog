"use client";

import { postList } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PAGE_SIZE = 12;

export default function PostGrid({ posts }: { posts: postList[] }) {
  const [count, setCount] = useState(PAGE_SIZE);
  const visible = posts.slice(0, count);
  const hasMore = count < posts.length;

  return (
    <>
      <div className="grid grid-cols-3 gap-[3px]">
        {visible.map((post) => (
          <Link
            key={post.currentSlug}
            href={`/posts/${post.currentSlug}`}
            className="group relative aspect-[4/5] overflow-hidden bg-[#E8F2EC]"
          >
            {post.titleImage ? (
              <Image
                src={urlFor(post.titleImage)
                  .width(500)
                  .height(500)
                  .quality(75)
                  .url()}
                alt={post.title}
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-[#E8F2EC]" />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#1A2820]/0 group-hover:bg-[#1A2820]/60 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 p-4">
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-[#2E7A52] text-center">
                {post.category?.title}
              </p>
              <p className="font-serif text-[14px] font-light leading-[1.35] text-white text-center line-clamp-3">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setCount((c) => c + PAGE_SIZE)}
            className="border border-border rounded-full px-10 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
