import { RichTextComponents } from "@/components/RichTextComponent";
import Container from "@/components/ui/container";
import { singlePost } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30;

async function getSinglePost(slug: string) {
  const query = `
        *[_type == 'post' && slug.current == '${slug}'] {
          title,
          "currentSlug": slug.current,
          shortDescription,
          category->{
            title,
              "slug": slug.current
            },
          "author": author->name,
          content,
          titleImage,
        }[0]
    `;

  const data = await client.fetch(query);
  return data;
}

export default async function showPost({
  params,
}: {
  params: { slug: string };
}) {
  const post: singlePost = await getSinglePost(params.slug);
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
