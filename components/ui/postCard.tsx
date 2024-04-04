import { singlePost } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: singlePost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.currentSlug}`}>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between break-words">
        <div className="flex flex-col">
          <p className="text-xs md:text-sm text-primary mt-4 mb-1 uppercase">
            {post.category.title}
          </p>
          <h6 className="text-gray-700 font-bold text-base md:text-lg line-clamp-2">
            {post.title}
          </h6>
          <p className="line-clamp-2 text-xs md:text-base text-gray-500 mt-2">
            {post.shortDescription}
          </p>
        </div>
        <div
          className="aspect-auto overflow-hidden rounded-lg
          min-w-48 max-w-auto md:max-w-48 h-48 md:h-36"
        >
          <Image
            src={urlFor(post.titleImage).url()}
            alt="featured Post"
            height={360}
            width={480}
            loading="lazy"
            className="object-cover h-full laz hover:scale-105 transition duration-300"
          />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
