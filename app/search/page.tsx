import PostList from "@/components/PostList";
import { getCategories } from "@/lib/actions";
import { categoryList, postList } from "@/lib/interface";
import { client } from "@/lib/sanity";
import Link from "next/link";

export const revalidate = 30;

async function getData(): Promise<postList[]> {
  const query = `*[_type == 'post'] | order(_createdAt desc) {
    "id": _id,
    title,
    "currentSlug": slug.current,
    "category": category->{
      title,
      "slug": slug.current,
    },
    "author": author->name,
    shortDescription,
    titleImage,
  }`;
  return client.fetch(query);
}

export default async function Page() {
  const [posts, categories] = await Promise.all([getData(), getCategories()]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Masthead ── */}
      <div className="border-b border-border px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
            Archive
          </p>
          <h1 className="font-serif text-[32px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-foreground">
            All Articles
          </h1>
          <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground max-w-xl">
            Browse the full archive — chronologically ordered, filterable by
            topic.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-16">
          {/* ── LEFT: Post list ── */}
          <div className="min-w-0">
            {/* Count */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                {posts.length} articles
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <PostList posts={posts} />
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="space-y-10">
            {/* Filter by topic */}
            {categories && categories.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                    Topics
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex flex-col">
                  <Link
                    href="/search"
                    className="flex items-center justify-between py-3 border-b border-border text-[13px] font-medium text-[#2E7A52] hover:opacity-70 transition group"
                  >
                    All topics
                    <span className="text-muted-foreground group-hover:text-foreground transition text-xs">
                      {posts.length}
                    </span>
                  </Link>
                  {categories.map((category: categoryList) => {
                    const count = posts.filter(
                      (p) => p.category?.slug === category.slug,
                    ).length;
                    return (
                      <Link
                        key={category.slug}
                        href={`/${category.slug}`}
                        className="flex items-center justify-between py-3 border-b border-border last:border-0 text-[13px] text-muted-foreground hover:text-foreground transition group"
                      >
                        {category.title}
                        <span className="text-[11px] tabular-nums text-muted-foreground group-hover:text-foreground transition">
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Consultation CTA */}
            <div className="bg-[#1A2820] p-6 rounded-sm">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
                1-on-1 Consultation
              </p>
              <p className="font-serif text-[17px] font-normal leading-snug text-[#F7F4ED] mb-4">
                Talk to a wellness specialist.
              </p>
              <ul className="space-y-2 mb-5">
                {[
                  "45-min video or phone session",
                  "Ayurveda, nutrition & preventative care",
                  "Written follow-up notes",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[#2E7A52] shrink-0" />
                    <span className="text-[12px] text-white/50 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="/#consultation"
                className="block w-full text-center py-2.5 bg-[#2E7A52] text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm hover:bg-[#3C9665] transition-colors"
              >
                Book a consultation
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
