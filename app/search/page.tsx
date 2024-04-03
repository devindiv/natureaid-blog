import PostList from "@/components/PostList";
import Container from "@/components/ui/container";
import { postList } from "@/lib/interface";
import { client } from "@/lib/sanity";

export const revalidate = 30;

export async function getData() {
  const query = `*[_type == 'post'] | order(_createdAt desc) {
    "id": _id,
    title,
    "currentSlug": slug.current,
    "category": category->title,
    "author": author->name,
    shortDescription,
    titleImage,
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Page() {
  const posts: postList[] = await getData();
  return (
    <section>
      <Container>
        <div>
          <div className="p-4">
            <h1
              className="font-bold text-slate-800
            text-2xl"
            >
              Explore all posts
            </h1>
          </div>

          <div className="p-4">
            <PostList posts={posts} />
          </div>
        </div>
      </Container>
    </section>
  );
}
