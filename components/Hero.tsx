import { urlFor } from "@/lib/sanity";
import { Button } from "./ui/button";
import { roboto } from "./ui/fonts";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { postList } from "@/lib/interface";
import { getFeatured } from "@/lib/actions";
import Newsletter from "./newsletter";

export default async function Hero() {
  const data: postList[] = await getFeatured();
  const featuredPost = data[0];
  return (
    <div
      className={`${roboto.className} flex flex-col bg-gray-50 md:flex-row w-full`}
    >
      <div
        className="grow flex flex-col items-center justify-center gap-4
        bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500
        md:rounded-lg text-gray-200 p-10"
      >
        <div className="max-w-[700px]">
          <h1 className="font-black text-4xl mb-2">
            Stay Healthy the Natural Way
          </h1>
          <p className="text-base mb-5">
            Recieve our weekly email that makes complex health topics simple.
            Expert health advice, guides and exclusive offers all for FREE.
          </p>
          <Newsletter />
        </div>
      </div>

      {/* Featured Card */}

      <div className="max-w-[470px]">
        <Link
          href={`/posts/${featuredPost.currentSlug}`}
          className="flex flex-col p-5"
        >
          <div className="aspect-auto overflow-hidden rounded-lg h-full max-h-64">
            <Image
              src={urlFor(featuredPost.titleImage).url()}
              alt="featured Post"
              height={480}
              width={640}
              priority
              className="object-cover w-full h-full hover:scale-105 transition duration-300"
            />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-xs md:text-sm text-primary mt-4 mb-1 uppercase">
              {featuredPost.category.title}
            </p>
            <p className="text-gray-700 font-bold text-base md:text-lg line-clamp-2">
              {featuredPost.title}
            </p>
            <p className="line-clamp-3 text-xs md:text-sm text-gray-500 mt-2">
              {featuredPost.shortDescription}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
