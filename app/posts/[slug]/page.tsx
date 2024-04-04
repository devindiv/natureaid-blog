import { RichTextComponents } from "@/components/RichTextComponent";
import Container from "@/components/ui/container";
import PostCard from "@/components/ui/postCard";
import { getPopularPosts, getSinglePost } from "@/lib/actions";
import { postList, singlePost } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface singlePostProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: singlePostProps): Promise<Metadata> {
  const postData: singlePost = await getSinglePost(slug);
  return {
    title: postData.title,
    description: postData.shortDescription,
    openGraph: {
      images: [
        {
          url: urlFor(postData.titleImage).url(),
        },
      ],
    },
    metadataBase: new URL("https://natureaid.net"),
  };
}

export default async function showPost({ params: { slug } }: singlePostProps) {
  const post: singlePost = await getSinglePost(slug);
  const popularPosts: postList[] = await getPopularPosts(slug);

  return (
    <div>
      <Container>
        <div className="p-4 my-6 grid grid-cols-1 md:grid-cols-2 gap-2">
          <article>
            <div className="flex flex-col space-y-2 mb-2">
              <Link href={`/${post.category.slug}`} className="text-primary">
                {post.category.title}
              </Link>
              <h1 className="text-4xl font-bold">{post.title}</h1>
              {/*<p>{post.author}</p>*/}
            </div>
            <div>
              <PortableText
                value={post.content}
                components={RichTextComponents}
              />
            </div>
          </article>
          <div className="md:pl-20">
            <h2 className="text-2xl font-bold border-b-2 mb-4 pb-2">
              Popular Posts
            </h2>
            <ul className="flex flex-col space-y-8">
              {popularPosts.map((popularPost, index) => (
                <li key={index}>
                  <PostCard post={popularPost} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
