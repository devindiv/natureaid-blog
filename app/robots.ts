import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/studio"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/studio"],
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
        disallow: ["/admin", "/studio"],
      },
    ],
    sitemap: "https://natureaid.in/sitemap.xml",
    host: "https://natureaid.in",
  };
}
