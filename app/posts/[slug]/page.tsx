import ReadingProgress from "@/components/ReadingProgress";
import { RichTextComponents } from "@/components/RichTextComponent";
import { ConsultationButton } from "@/components/ConsultationModal";
import { getCategories, getPopularPosts, getSinglePost } from "@/lib/actions";
import { categoryList, postList, singlePost } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostImage from "@/components/PostImage";

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
    metadataBase: new URL("https://natureaid.net"),
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ReadingProgress />

      {/* ── Top nav breadcrumb ── */}
      <div className="border-b border-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-[11px] text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/${post.category.slug}`}
            className="hover:text-foreground transition"
          >
            {post.category.title}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[260px]">
            {post.title}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
          {/* ── LEFT: Article ── */}
          <div className="min-w-0">
            <header className="mb-8">
              <Link
                href={`/${post.category.slug}`}
                className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-4 hover:opacity-70 transition"
              >
                {post.category.title}
              </Link>

              <h1 className="font-serif text-[28px] md:text-[40px] font-semibold leading-[1.15] tracking-tight text-foreground mb-5">
                {post.title}
              </h1>

              {post.shortDescription && (
                <p className="text-[17px] leading-[1.8] text-muted-foreground mb-6 font-light border-l-2 border-[#2E7A52] pl-4">
                  {post.shortDescription}
                </p>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-[#E8EDE9] flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-semibold text-[#2E7A52]">
                    {(post.author ?? "Editorial Team")
                      .split(" ")
                      .map((n: string) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-foreground leading-none mb-0.5">
                    {post.author ?? "Editorial Team"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {post.category.title}
                  </p>
                </div>
              </div>
            </header>

            {post.titleImage && (
              <PostImage
                src={urlFor(post.titleImage).width(1200).url()}
                alt={post.title}
              />
            )}

            <article
              className="prose prose-neutral dark:prose-invert max-w-none
              prose-p:text-[16px] prose-p:leading-[1.85] prose-p:text-foreground/90
              prose-h2:font-serif prose-h2:text-[22px] prose-h2:font-semibold prose-h2:tracking-tight prose-h2:mt-10 prose-h2:mb-3
              prose-h3:font-serif prose-h3:text-[18px] prose-h3:font-medium prose-h3:mt-8 prose-h3:mb-2
              prose-a:text-[#2E7A52] prose-a:underline-offset-2 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-2 prose-blockquote:border-[#2E7A52] prose-blockquote:pl-5 prose-blockquote:not-italic prose-blockquote:text-muted-foreground prose-blockquote:font-light prose-blockquote:text-[17px] prose-blockquote:leading-[1.8]
              prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-5
              prose-ol:list-decimal prose-ol:pl-5
              prose-li:text-[16px] prose-li:leading-[1.8] prose-li:my-1
              prose-hr:border-border prose-hr:my-10
              prose-img:rounded-sm"
            >
              <PortableText
                value={post.content}
                components={RichTextComponents}
              />
            </article>

            <div className="mt-14 pt-8 border-t border-border flex items-center justify-between">
              <Link
                href={`/${post.category.slug}`}
                className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] hover:opacity-70 transition"
              >
                ← More in {post.category.title}
              </Link>
              <Link
                href="/search"
                className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition"
              >
                Browse all articles
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="space-y-10 lg:pt-1">
            {/* More to read */}
            {popularPosts && popularPosts.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
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
                      <span className="font-serif text-[18px] text-border shrink-0 leading-none pt-0.5 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5">
                          {p.category.title}
                        </p>
                        <p className="text-[14px] font-serif leading-[1.35] text-foreground group-hover:opacity-70 transition-opacity">
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
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2E7A52] mb-3">
                1-on-1 Consultation
              </p>
              <p className="font-serif text-[18px] font-normal leading-snug text-[#F7F4ED] mb-3">
                Talk to a wellness specialist.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "45-min video or phone session",
                  "Ayurveda, nutrition & preventative care",
                  "Written follow-up notes included",
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

            {/* Browse topics */}
            {categories && categories.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground">
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
                          ? "border-[#2E7A52] text-[#2E7A52] bg-[#2E7A52]/5"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
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
