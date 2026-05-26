import { postList } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";

export async function getData(): Promise<postList[]> {
  const query = `*[_type == 'post' && featured != true] | order(_createdAt desc) {
    title, "currentSlug": slug.current,
    "category": category->{ title, "slug": slug.current },
    "author": author->name, shortDescription, titleImage
  }`;
  return client.fetch(query);
}

export const revalidate = 60;

export default async function Latest() {
  const data: postList[] = await getData();
  if (!data || data.length === 0) return null;

  return (
    <section className="border-b border-border py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
            Latest
          </span>
          <div className="flex-1 h-px bg-border" />
          <Link
            href="/search"
            className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition"
          >
            View all
          </Link>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.slice(0, 6).map((post, i) => (
            <Link
              key={i}
              href={`/posts/${post.currentSlug}`}
              className="group block"
            >
              <article>
                <div className="aspect-[3/2] overflow-hidden rounded-sm mb-3">
                  <Image
                    src={urlFor(post.titleImage).width(480).url()}
                    alt={post.title}
                    width={480}
                    height={320}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52] mb-1.5">
                  {post.category.title}
                </p>
                <h3 className="font-serif text-[16px] font-normal leading-snug text-foreground mb-1.5 group-hover:opacity-75 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  {post.author}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
