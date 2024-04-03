import { postList } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import Container from "./ui/container";

export async function getData() {
  const query = `*[_type == 'post' && featured != true] | order(_createdAt desc) {
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

  const data = await client.fetch(query);

  return data;
}

export default async function Latest() {
  const data: postList[] = await getData();
  return (
    <section>
      <Container>
        <div className="mt-12 md:gap-10 px-4">
          <div className="">
            <div className="flex items-center justify-between pb-4 mb-4 border-b-[1px]">
              <h4 className="text-3xl font-bold text-gray-700">Latest</h4>
              <Link href="/search">All articles</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {data.slice(0, 4).map((post, i) => (
                <article key={i} className="md:mb-10">
                  <Link href={`/posts/${post.currentSlug}`}>
                    <div className="flex flex-col break-words">
                      <div
                        className="aspect-auto overflow-hidden rounded-lg
                    min-w-72 h-52 max-h-52"
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
                      <div className="flex flex-col">
                        <p className="text-xs md:text-sm text-primary mt-4 mb-1 uppercase">
                          {post.category.title}
                        </p>
                        <h6 className="text-gray-700 font-bold text-base md:text-xl line-clamp-2">
                          {post.title}
                        </h6>
                        <p className="line-clamp-3 text-xs uppercase text-gray-600 mt-2">
                          {post.author}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
