import { ArrowRight, ArrowUpRight, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { blogArticles } from "@/content/blog";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hospitality Parasol & Shade Journal",
  description:
    "Architectural guides, layout planning considerations, and OEM project brief frameworks for hospitality developers, resort specifiers, and outdoor project teams.",
  path: "/blog",
  image: "/images/highsol-brand-board.png",
  imageWidth: 1254,
  imageHeight: 1254,
  imageAlt: "Highsol visual identity board",
});

export default function BlogHubPage() {
  const hubUrl = absoluteUrl("/blog");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Blog", "CollectionPage"],
    "@id": hubUrl,
    url: hubUrl,
    name: "Highsol Hospitality Parasol & Shade Journal",
    description:
      "Architectural guides, shade planning considerations, and OEM brief frameworks for hospitality developers and project specifiers.",
    publisher: {
      "@type": "Organization",
      name: "Highsol",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/highsol-logo.svg"),
      },
    },
    blogPost: blogArticles.map((article) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${article.slug}`),
      headline: article.title,
      description: article.description,
      url: absoluteUrl(`/blog/${article.slug}`),
      datePublished: article.publishedDate,
      dateModified: article.modifiedDate,
      author: {
        "@type": "Person",
        name: article.author.name,
      },
    })),
  };

  return (
    <main id="main-content" className="blog-hub-page">
      <JsonLd data={jsonLd} />

      <section className="blog-hub-hero section-shell">
        <Reveal className="blog-hub-header">
          <span className="blog-eyebrow">Architectural Journal &amp; Project Guides</span>
          <h1>Designing Shade for Life Outdoors</h1>
          <p>
            Objective guidelines, spatial layout considerations, and project brief frameworks
            for resort developers, landscape architects, and hospitality procurement teams.
          </p>
        </Reveal>
      </section>

      <section className="blog-feed-section section-shell">
        <div className="blog-grid">
          {blogArticles.map((article) => (
            <article className="blog-card" key={article.slug}>
              <Reveal>
                <div className="blog-card-meta">
                  <span className="blog-card-category">{article.category}</span>
                  <div className="blog-card-details">
                    <span className="blog-meta-item">
                      <CalendarBlank size={14} weight="regular" aria-hidden="true" />
                      <time dateTime={article.publishedDate}>
                        {new Date(article.publishedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </span>
                    <span className="blog-meta-item">
                      <Clock size={14} weight="regular" aria-hidden="true" />
                      {article.readingTime}
                    </span>
                  </div>
                </div>

                <h2 className="blog-card-title">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h2>

                <p className="blog-card-summary">{article.summary}</p>

                <div className="blog-card-takeaways">
                  <strong>Key Takeaway:</strong>
                  <p>{article.keyTakeaways[0]}</p>
                </div>

                <div className="blog-card-footer">
                  <span className="blog-author-byline">By {article.author.name}</span>
                  <Link className="blog-card-link" href={`/blog/${article.slug}`} aria-label={`Read article: ${article.title}`}>
                    Read guide <ArrowRight size={16} weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="resort-cta section-shell">
        <Reveal>
          <h2>Planning outdoor shade for a current project?</h2>
          <p>
            Connect with Highsol to discuss product typologies, custom finish options, and project coordination.
          </p>
        </Reveal>
        <Link className="button button-primary" href="/#contact">
          Start a project inquiry <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
