import type { Metadata } from "next";

export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function createMetadata({
  title,
  description,
  path,
  image = "/images/hero-resort-concept.png",
  type = "website",
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type,
      url: path,
      siteName: "Highsol",
      images: [{ url: image, width: 1536, height: 1024, alt: `${title} concept visual` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
