import { client } from "@/lib/sanity";
import { categoryList } from "@/lib/interface";
import Link from "next/link";

async function getCategoriesWithCount(): Promise<
  (categoryList & { count: number })[]
> {
  const query = `*[_type == "category"] {
    title,
    "slug": slug.current,
    "count": count(*[_type == "post" && references(^._id)])
  }`;
  return client.fetch(query);
}

export default async function TopicsSection() {
  const categories = await getCategoriesWithCount();
  if (!categories || categories.length === 0) return null;

  return (
    <section className="border-t border-border py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
            Browse by topic
          </span>
          <div className="flex-1 h-px bg-border" />
          <Link
            href="/search"
            className="text-[11px] text-muted-foreground hover:text-foreground transition"
          >
            All →
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-border
                hover:bg-[#1A2820] hover:border-[#1A2820] transition-all duration-150"
            >
              <span className="text-[13px] font-medium text-foreground group-hover:text-white transition-colors">
                {category.title}
              </span>
              <span
                className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full
                group-hover:bg-white/15 group-hover:text-white/70 transition-all"
              >
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
