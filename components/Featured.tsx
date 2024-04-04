import { client, urlFor } from "@/lib/sanity";
import Container from "./ui/container";
import { postList } from "@/lib/interface";
import Link from "next/link";
import Image from "next/image";
import PostCard from "./ui/postCard";

export async function getData() {
  const query = `*[_type == 'post' && featured == true] | order(_createdAt desc) [1...10] {
    title,
    "currentSlug": slug.current,
    "category": category->{
      title,
      "slug": slug.current,
    },
    excerpt,
    "author": author->slug.current,
    content,
    shortDescription,
    titleImage,
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Featured() {
  const data: postList[] = await getData();
  const featuredPosts = data.slice(1);
  const mainFeatured = data[0];
  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
          <div>
            <article>
              <Link href={`/posts/${mainFeatured.currentSlug}`}>
                <div
                  className="aspect-auto overflow-hidden rounded-lg
                max-h-96"
                >
                  <Image
                    src={urlFor(mainFeatured.titleImage).url()}
                    alt="featured Post"
                    height={480}
                    width={640}
                    priority
                    className="object-contain w-full h-full hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="break-words">
                  <p className="text-xs md:text-sm text-primary mt-4 mb-1 uppercase">
                    {mainFeatured.category.title}
                  </p>
                  <h4 className="mb-2 text-gray-700 font-bold text-base md:text-4xl line-clamp-2">
                    {mainFeatured.title}
                  </h4>
                  <p className="mb-1 line-clamp-3 text-xs md:text-lg text-gray-500 mt-2">
                    {mainFeatured.shortDescription}
                  </p>
                </div>
              </Link>
            </article>
          </div>
          <ul className="space-y-10">
            {featuredPosts.slice(0, 3).map((featuredPost, index) => (
              <li key={index}>
                <PostCard post={featuredPost} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
