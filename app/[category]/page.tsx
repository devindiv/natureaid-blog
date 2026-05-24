import { getCategories } from "@/lib/actions";
import { categoryList, postList } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { ConsultationButton } from "@/components/ConsultationModal";
import Link from "next/link";

export const revalidate = 60;

async function getData(category: string): Promise<postList[]> {
  const query = `*[_type == "post" && (category->slug.current == "${category}" || category->parent->slug.current == "${category}")] | order(_createdAt desc) {
    _id,
    title,
    shortDescription,
    "currentSlug": slug.current,
    "category": category->{ title, "slug": slug.current },
    "author": author->name,
    "publishedAt": _createdAt,
  }`;
  return client.fetch(query);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const [posts, categories] = await Promise.all([
    getData(category),
    getCategories(),
  ]);

  const currentCategory = categories?.find(
    (c: categoryList) => c.slug === category,
  );
  const title = currentCategory?.title ?? category.replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Masthead ── */}
      <div className="border-b border-border px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-5">
            <Link href="/" className="hover:text-foreground transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/search" className="hover:text-foreground transition">
              Archive
            </Link>
            <span>/</span>
            <span className="text-foreground capitalize">{title}</span>
          </div>

          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
            Topic
          </p>
          <h1 className="font-serif text-[32px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-foreground capitalize">
            {title}
          </h1>
          <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground max-w-xl">
            Articles, essays, and research notes on {title.toLowerCase()}.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-16">
          {/* ── LEFT: Post list ── */}
          <div className="min-w-0">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {posts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[15px] text-muted-foreground">
                  No articles in this topic yet.
                </p>
                <Link
                  href="/search"
                  className="mt-4 inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52] hover:opacity-70 transition"
                >
                  Browse all articles →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col">
                {posts.map((post, i) => (
                  <Link
                    key={post.currentSlug}
                    href={`/posts/${post.currentSlug}`}
                    className="group flex gap-5 py-6 border-b border-border last:border-0"
                  >
                    <span className="font-serif text-[18px] text-border shrink-0 leading-none pt-1 select-none tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <article className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52] mb-2">
                        {post.category?.title}
                      </p>
                      <h2 className="font-serif text-[18px] font-semibold leading-snug tracking-tight text-foreground group-hover:opacity-70 transition-opacity mb-2">
                        {post.title}
                      </h2>
                      {post.shortDescription && (
                        <p className="text-[13px] leading-[1.75] text-muted-foreground line-clamp-2">
                          {post.shortDescription}
                        </p>
                      )}
                      <p className="mt-3 text-[11px] text-muted-foreground">
                        {post.author}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="space-y-10">
            {/* Topics */}
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
                    className="py-3 border-b border-border text-[13px] text-muted-foreground hover:text-foreground transition"
                  >
                    All topics
                  </Link>
                  {categories.map((cat: categoryList) => (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      className={`py-3 border-b border-border last:border-0 text-[13px] transition ${
                        cat.slug === category
                          ? "text-[#2E7A52] font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.title}
                    </Link>
                  ))}
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
              <ConsultationButton className="w-full py-2.5 bg-[#2E7A52] text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm hover:bg-[#3C9665] transition-colors">
                Book a consultation
              </ConsultationButton>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
