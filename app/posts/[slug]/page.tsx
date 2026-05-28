import ReadingProgress from "@/components/ReadingProgress";
import { RichTextComponents } from "@/components/RichTextComponent";
import { ConsultationButton } from "@/components/ConsultationModal";
import { getCategories, getPopularPosts, getSinglePost } from "@/lib/actions";
import { categoryList, postList, singlePost } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface SinglePostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SinglePostProps): Promise<Metadata> {
  const { slug } = await params;
  const post: singlePost = await getSinglePost(slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.shortDescription,
    openGraph: {
      images: [{ url: urlFor(post.titleImage).url() }],
    },
    metadataBase: new URL("https://natureaid.in"),
  };
}

export default async function ShowPost({ params }: SinglePostProps) {
  const { slug } = await params;

  const post: singlePost = await getSinglePost(slug);
  if (!post) notFound();

  const [popularPosts, categories] = await Promise.all([
    getPopularPosts(slug),
    getCategories(),
  ]);

  const initials = (post.author ?? "Editorial Team")
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ReadingProgress />

      {/* Breadcrumb */}
      <div className="border-b border-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-[11px] text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition">
            Home
          </Link>
          <span className="text-border">/</span>
          <Link
            href={`/${post.category.slug}`}
            className="hover:text-foreground transition"
          >
            {post.category.title}
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground truncate max-w-[260px]">
            {post.title}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-20">
          {/* ── Article ── */}
          <div className="min-w-0">
            {/* Header */}
            <header className="mb-12 pb-10 border-b border-border">
              <Link
                href={`/${post.category.slug}`}
                className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#2E7A52] mb-5 hover:opacity-70 transition"
              >
                <span className="inline-block w-5 h-px bg-[#2E7A52]" />
                {post.category.title}
              </Link>

              <h1 className="font-serif text-[32px] md:text-[46px] font-light leading-[1.1] tracking-[-0.02em] text-foreground mb-8">
                {post.title}
              </h1>

              {/* Byline */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E8F2EC] flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-semibold text-[#2E7A52]">
                    {initials}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-foreground leading-none mb-0.5">
                    {post.author ?? "Editorial Team"}
                  </p>
                  <p className="text-[11px] text-muted-foreground tracking-wide">
                    {post.category.title}
                  </p>
                </div>
              </div>
            </header>

            {/* Body */}
            <article
              className="
                prose prose-neutral dark:prose-invert max-w-none
                prose-p:text-[16.5px] prose-p:leading-[1.9] prose-p:text-foreground/85
                prose-h2:font-serif prose-h2:text-[24px] prose-h2:font-light prose-h2:tracking-[-0.01em] prose-h2:mt-12 prose-h2:mb-4
                prose-h3:font-serif prose-h3:text-[19px] prose-h3:font-light prose-h3:mt-10 prose-h3:mb-3
                prose-a:text-[#2E7A52] prose-a:no-underline prose-a:underline-offset-2 hover:prose-a:underline
                prose-blockquote:border-l-[2px] prose-blockquote:border-[#2E7A52] prose-blockquote:pl-6 prose-blockquote:not-italic prose-blockquote:text-muted-foreground prose-blockquote:font-light prose-blockquote:text-[18px] prose-blockquote:leading-[1.85] prose-blockquote:my-10
                prose-strong:font-semibold prose-strong:text-foreground
                prose-ul:list-disc prose-ul:pl-5
                prose-ol:list-decimal prose-ol:pl-5
                prose-li:text-[16px] prose-li:leading-[1.8] prose-li:my-1.5
                prose-hr:border-border prose-hr:my-12
                prose-img:rounded-sm
              "
            >
              <PortableText
                value={post.content}
                components={RichTextComponents}
              />
            </article>

            {/* Footer nav */}
            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <Link
                href={`/${post.category.slug}`}
                className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#2E7A52] hover:opacity-70 transition"
              >
                ← {post.category.title}
              </Link>
              <Link
                href="/search"
                className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition"
              >
                All articles
              </Link>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-10 lg:pt-[88px]">
            {/* More to read */}
            {popularPosts && popularPosts.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-foreground">
                    More to read
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex flex-col">
                  {popularPosts.slice(0, 5).map((p: postList, i: number) => (
                    <Link
                      key={i}
                      href={`/posts/${p.currentSlug}`}
                      className="group flex gap-4 items-start py-4 border-b border-border last:border-0"
                    >
                      <span className="font-serif text-[15px] text-border shrink-0 leading-none pt-0.5 select-none tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#2E7A52] mb-1.5">
                          {p.category.title}
                        </p>
                        <p className="text-[13.5px] font-serif leading-[1.4] text-foreground group-hover:opacity-60 transition-opacity">
                          {p.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Consultation CTA */}
            <div className="bg-[#1A2820] p-6 rounded-sm">
              <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#2E7A52] mb-3">
                1-on-1 Consultation
              </p>
              <p className="font-serif text-[20px] font-light leading-[1.2] text-[#F7F4ED] mb-5">
                Talk to a wellness specialist.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "45-min video or phone session",
                  "Ayurveda, nutrition & preventative care",
                  "Written follow-up notes included",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-[#2E7A52] shrink-0" />
                    <span className="text-[12px] text-white/45 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <ConsultationButton className="w-full py-3 bg-[#2E7A52] text-white text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm hover:bg-[#3C9665] transition-colors">
                Book a consultation
              </ConsultationButton>
            </div>

            {/* Topics */}
            {categories && categories.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-foreground">
                    Topics
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: categoryList) => (
                    <Link
                      key={category.slug}
                      href={`/${category.slug}`}
                      className={`px-3 py-1.5 border rounded-full text-[11px] font-medium transition text-nowrap ${
                        category.slug === post.category.slug
                          ? "border-[#2E7A52] text-[#2E7A52] bg-[#2E7A52]/8"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                      }`}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
