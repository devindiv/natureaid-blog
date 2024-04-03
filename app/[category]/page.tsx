import Container from "@/components/ui/container";
import { postList } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

async function getData(category: string) {
  const query = `*[_type == "post" && (category->slug.current == "${category}" || category->parent->slug.current == "${category}")] | order(_createdAt desc) {
        _id,
        titleImage,
        title,
        shortDescription,
        content,
        "currentSlug": slug.current,
      category->{title},
      "author": author->name,
      "publishedAt": _createdAt,
    }`;

  const data = await client.fetch(query);
  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const posts: postList[] = await getData(params.category);
  return (
    <section>
      <Container>
        <div className="p-4 flex flex-col text-slate-800">
          <div className="border-b-[2px] py-4">
            <h2 className="capitalize font-semibold text-3xl">
              {params.category.replace(/-/g, " ")}
            </h2>
          </div>
          <div className="flex flex-col gap-4 my-6">
            {posts.map((post, i) => (
              <article key={i} className="mr-auto">
                <Link href={`/posts/${post.currentSlug}`}>
                  <div className="flex flex-col-reverse md:flex-row-reverse break-words gap-4">
                    <div className="flex flex-col">
                      <h6 className="font-bold text-base md:text-xl line-clamp-2">
                        {post.title}
                      </h6>
                      <p className="line-clamp-3 text-xs md:text-base text-gray-500 mt-2">
                        {post.shortDescription}
                      </p>
                      <p className="line-clamp-3 text-xs md:text-base text-gray-500 mt-2">
                        By {post.author}
                      </p>
                    </div>
                    <div
                      className="aspect-auto overflow-hidden rounded-lg
                  min-w-52 max-w-auto md:max-w-52 h-52 md:h-36"
                    >
                      <Image
                        src={urlFor(post.titleImage).url()}
                        alt="featured Post"
                        height={360}
                        width={480}
                        priority
                        className="object-cover h-full hover:scale-105 transition duration-300"
                      />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
