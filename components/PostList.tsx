"use client";

import { postList } from "@/lib/interface";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  posts: postList[];
};

const PostList = ({ posts }: Props) => {
  const pageSize = 12;
  const [visible, setVisible] = useState(pageSize);

  const showMore = () => setVisible((v) => v + pageSize);

  return (
    <div>
      {/* Two-column editorial index */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {posts.slice(0, visible).map((post) => (
          <Link
            key={post.currentSlug}
            href={`/posts/${post.currentSlug}`}
            className="group block"
          >
            <article className="space-y-3 pb-6 border-b border-border">
              {/* Category */}
              <div className="text-xs tracking-widest uppercase text-muted-foreground">
                {post.category.title}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-medium leading-snug group-hover:text-foreground transition-colors">
                {post.title}
              </h3>

              {/* Description */}
              {post.shortDescription && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.shortDescription}
                </p>
              )}

              {/* Meta */}
              <div className="text-xs text-muted-foreground">{post.author}</div>
            </article>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-16">
        {visible < posts.length ? (
          <button
            onClick={showMore}
            className="
              border border-border
              px-6 py-3
              text-xs tracking-widest uppercase
              text-muted-foreground
              hover:text-foreground
              hover:bg-accent
              transition
            "
          >
            Load more
          </button>
        ) : (
          <div className="text-xs text-muted-foreground">End of archive</div>
        )}
      </div>
    </div>
  );
};

export default PostList;
