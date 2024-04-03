import { client, urlFor } from "@/lib/sanity";
import Container from "./ui/container";
import { postList } from "@/lib/interface";
import Link from "next/link";
import Image from "next/image";

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
          <div className="space-y-10">
            {featuredPosts.slice(0, 3).map((featuredPost, index) => (
              <article key={index} className="">
                <Link href={`/posts/${featuredPost.currentSlug}`}>
                  <div className="flex flex-col-reverse md:flex-row items-center justify-between break-words">
                    <div className="flex flex-col">
                      <p className="text-xs md:text-sm text-primary mt-4 mb-1 uppercase">
                        {featuredPost.category.title}
                      </p>
                      <h6 className="text-gray-700 font-bold text-base md:text-xl line-clamp-2">
                        {featuredPost.title}
                      </h6>
                      <p className="line-clamp-3 text-xs md:text-base text-gray-500 mt-2">
                        {featuredPost.shortDescription}
                      </p>
                    </div>
                    <div
                      className="aspect-auto overflow-hidden rounded-lg
                    min-w-52 max-w-auto md:max-w-52 h-52 md:h-36"
                    >
                      <Image
                        src={urlFor(featuredPost.titleImage).url()}
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
