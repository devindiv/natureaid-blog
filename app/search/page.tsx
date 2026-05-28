import PostGrid from "@/components/PostGrid";
import { getCategories } from "@/lib/actions";
import { categoryList, postList } from "@/lib/interface";
import { client } from "@/lib/sanity";
import Link from "next/link";

export const revalidate = 30;

async function getData(): Promise<postList[]> {
  const query = `*[_type == 'post'] | order(_createdAt desc) {
    title,
    "currentSlug": slug.current,
    "category": category->{
      title,
      "slug": slug.current,
    },
    titleImage,
  }`;
  return client.fetch(query);
}

export default async function Page() {
  const [posts, categories] = await Promise.all([getData(), getCategories()]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-16">
          {/* Grid */}
          <div className="min-w-0">
            <PostGrid posts={posts} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            {categories && categories.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-foreground">
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
                    <span className="text-muted-foreground group-hover:text-foreground transition text-xs tabular-nums">
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
              <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#2E7A52] mb-3">
                1-on-1 Consultation
              </p>
              <p className="font-serif text-[19px] font-light leading-[1.2] text-[#F7F4ED] mb-5">
                Talk to a wellness specialist.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "45-min video or phone session",
                  "Ayurveda, nutrition & preventative care",
                  "Written follow-up notes",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-[#2E7A52] shrink-0" />
                    <span className="text-[12px] text-white/45 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="/#consultation"
                className="block w-full text-center py-3 bg-[#2E7A52] text-white text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm hover:bg-[#3C9665] transition-colors"
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
