import { cache } from "react";
import { client } from "./sanity";

export async function getFeatured() {
  const query = `*[_type == 'post' && featured == true] | order(_createdAt desc) {
    title,
      "currentSlug": slug.current,
      "category": category->{
        title,
        "slug": slug.current,
      },
      content,
      shortDescription,
      titleImage,
  }`;

  const data = await client.fetch(query);

  return data;
}
export async function getAllPosts() {
  const query = `*[_type == 'post'] | order(_createdAt desc) {
    title,
      "currentSlug": slug.current,
      "category": category->{
        title,
        "slug": slug.current,
      },
      content,
      shortDescription,
      titleImage,
  }`;

  const data = await client.fetch(query);

  return data;
}

export async function getCategories() {
  const query = `*[_type == "category" && defined(parent) != true] | order(_createdAt asc) {
      title,
        "slug": slug.current,
    }`;

  const data = await client.fetch(query);

  return data;
}
export async function getPopularPosts(slug: string) {
  const query = `
  *[_type == 'post' && slug.current != '${slug}'] | order(_createdAt desc) [0...4] {
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
  }
    `;

  const data = await client.fetch(query);
  return data;
}

export const getSinglePost = cache(async (slug: string) => {
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
});
