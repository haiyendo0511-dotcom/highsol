import type { Metadata } from "next";

export const fallbackSiteUrl = "https://highsol.pages.dev";
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl);
export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(cleanPath, siteUrl).toString();
}

export type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  image = "/images/hero-resort-concept.png",
  imageWidth = 1536,
  imageHeight = 1024,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadata): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const finalImageAlt = imageAlt || `${title} - Highsol`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: isIndexable,
      follow: isIndexable,
      ...(!isIndexable && {
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
        },
      }),
    },
    openGraph: {
      title,
      description,
      type,
      url: canonicalUrl,
      siteName: "Highsol",
      images: [{ url: imageUrl, width: imageWidth, height: imageHeight, alt: finalImageAlt }],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
