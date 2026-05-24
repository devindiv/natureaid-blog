import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";
import { postList } from "@/lib/interface";

async function getFeaturedPost(): Promise<postList | null> {
  const query = `*[_type == 'post' && featured == true][0] {
    title, "currentSlug": slug.current,
    "category": category->{ title, "slug": slug.current },
    shortDescription, titleImage
  }`;
  return client.fetch(query);
}

export default async function Hero() {
  const post = await getFeaturedPost();

  return (
    <section className="border-b border-border py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
            {post?.category?.title ?? "Featured"} · Featured
          </p>
          <h1 className="font-serif text-[32px] md:text-[38px] font-semibold leading-[1.15] tracking-tight text-foreground mb-4">
            {post?.title ?? "Preventative Wellness & the Ayurvedic Path"}
          </h1>
          {post?.shortDescription && (
            <p className="text-base leading-[1.75] text-muted-foreground mb-5">
              {post.shortDescription}
            </p>
          )}
          <Link
            href={post ? `/posts/${post.currentSlug}` : "/search"}
            className="text-[11px] font-semibold tracking-[0.12em] uppercase border-b border-[#2E7A52] text-[#2E7A52] pb-0.5 hover:opacity-70 transition"
          >
            Read article →
          </Link>
        </div>

        {post?.titleImage && (
          <div className="aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={urlFor(post.titleImage).width(800).url()}
              alt={post.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
