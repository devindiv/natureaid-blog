import { MetadataRoute } from "next";

import { getAllPosts, getCategories } from "@/lib/actions";
import { postList, categoryList } from "@/lib/interface";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories]: [postList[], categoryList[]] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  const baseUrl = "https://natureaid.in";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map(
    (category: categoryList) => ({
      url: `${baseUrl}/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const postEntries: MetadataRoute.Sitemap = posts.map((post: postList) => ({
    url: `${baseUrl}/posts/${post.currentSlug}`,
    lastModified:
      "publishedAt" in post && post.publishedAt
        ? new Date(post.publishedAt)
        : new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...categoryEntries, ...postEntries];
}
