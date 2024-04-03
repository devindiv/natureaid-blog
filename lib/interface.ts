export interface postList {
  title: string;
  currentSlug: string;
  category: {
    title: string;
    slug: string;
  };
  content: any;
  shortDescription: string;
  author: string;
  titleImage: any;
  publishedAt: string;
}

export interface singlePost {
  title: string;
  currentSlug: string;
  shortDescription: string;
  author: string;
  category: {
    title: string;
    slug: string;
  };
  titleImage: any;
  content: any;
}

export interface categoryList {
  title: string;
  slug: string;
}
