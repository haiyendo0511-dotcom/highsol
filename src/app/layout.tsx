import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, isIndexable, siteUrl } from "@/lib/seo";
import "./globals.css";
import "./resort.css";

const rootUrl = absoluteUrl("/");
const orgId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

const rootSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: "Highsol",
    url: rootUrl,
    logo: absoluteUrl("/brand/highsol-logo.svg"),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "Highsol",
    url: rootUrl,
    publisher: {
      "@id": orgId,
    },
  },
];

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Highsol | Premium Parasol Manufacturing in Vietnam",
    template: "%s | Highsol",
  },
  description: "Premium architectural parasols for resorts, hospitality projects, distributors, and OEM programs. Designed and manufactured in Vietnam.",
  keywords: ["premium parasol", "resort umbrella", "hospitality shade", "Vietnam parasol manufacturer", "OEM parasol"],
  robots: {
    index: isIndexable,
    follow: isIndexable,
  },
  openGraph: {
    title: "Highsol | Precision Shade Architecture",
    description: "Premium parasols and custom shade programs for international hospitality buyers.",
    type: "website",
    url: "/",
    siteName: "Highsol",
    images: [{ url: "/reference/parasol-categories/cantilever-offset/tuuci-cantilever-kailua-kona.jpg", width: 2560, height: 1707, alt: "Architectural parasol at a coastal outdoor setting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Highsol | Precision Shade Architecture",
    description: "Premium parasols and custom shade programs for international hospitality buyers.",
    images: ["/reference/parasol-categories/cantilever-offset/tuuci-cantilever-kailua-kona.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <JsonLd data={rootSchema} />
        <Analytics />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
