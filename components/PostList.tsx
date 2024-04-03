"use client";

import { postList } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";

type Props = {
  posts: postList[];
};

const PostList = ({ posts }: Props) => {
  const articlesShown = 6;
  const [loadMore, setLoadMore] = useState(articlesShown);
  const showMoreArticles = () => {
    setLoadMore(loadMore + articlesShown / 2);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
        {posts.slice(0, loadMore).map((post, i) => (
          <article key={i} className="md:mb-10">
            <Link href={`/posts/${post.currentSlug}`}>
              <div className="flex flex-col break-words">
                <div
                  className="aspect-auto overflow-hidden rounded-lg
          max-w-md h-64"
                >
                  <Image
                    src={urlFor(post.titleImage).url()}
                    alt="featured Post"
                    height={360}
                    width={480}
                    priority
                    className="object-cover h-full hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs md:text-sm text-primary mt-4 mb-1 uppercase">
                    {post.category.title}
                  </p>
                  <h6 className="text-gray-700 font-bold text-base md:text-xl line-clamp-2">
                    {post.title}
                  </h6>
                  <p className="line-clamp-3 text-xs uppercase text-gray-600 mt-2">
                    {post.author}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        {loadMore < posts?.length ? (
          <Button type="button" onClick={showMoreArticles}>
            Load More
          </Button>
        ) : (
          <Button type="button" disabled>
            That's all!
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostList;
