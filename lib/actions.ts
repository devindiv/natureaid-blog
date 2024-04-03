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

export async function getCategories() {
  const query = `*[_type == "category" && defined(parent) != true] | order(_createdAt asc) {
      title,
        "slug": slug.current,
    }`;

  const data = await client.fetch(query);

  return data;
}
