import type { MetadataRoute } from "next";
import { blogArticles } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Stored static routes with fixed milestone dates
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-09-03",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/parasols"),
      lastModified: "2026-09-03",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/customize"),
      lastModified: "2026-09-04",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/manufacturing-vietnam"),
      lastModified: "2026-09-03",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/resources"),
      lastModified: "2026-09-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: "2026-09-03",
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Blog articles with honest stored content dates
  const articleRoutes: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: article.modifiedDate || article.publishedDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
