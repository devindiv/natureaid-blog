import { RichTextComponents } from "@/components/RichTextComponent";
import Container from "@/components/ui/container";
import { getSinglePost } from "@/lib/actions";
import { singlePost } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div>
      <Container>
        <article className="p-4 grid grid-cols-1 md:grid-cols-3 text-slate-700 gap-4 break-words">
          <div className="col-span-2 text-left flex flex-col md:my-6 space-y-2">
            <Link
              href={`/${post.category.slug}`}
              className="text-primary text-base"
            >
              {post.category.title}
            </Link>
            <h1 className="font-bold text-xl md:text-4xl">{post.title}</h1>
            {/*<h6 className="">{post.shortDescription}</h6>*/}
          </div>
          <div className="my-2 md:my-6 md:ml-auto">
            <p>Written by {post.author}</p>
          </div>

          <div className="col-span-2">
            <PortableText
              value={post.content}
              components={RichTextComponents}
            />
          </div>
        </article>
      </Container>
    </div>
  );
}
