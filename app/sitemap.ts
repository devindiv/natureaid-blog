import { getAllPosts } from "@/lib/actions";
import { postList } from "@/lib/interface";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: postList[] = await getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ currentSlug }) => ({
    url: `https://natureaid.net/posts/${currentSlug}`,
  }));

  return [
    {
      url: `https://natureaid.net`,
    },
    ...postEntries,
  ];
}
