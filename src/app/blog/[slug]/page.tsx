import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CalendarBlank, Clock, User } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogDiagram } from "@/components/blog-diagram";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { blogArticles, getArticleBySlug } from "@/content/blog";
import { absoluteUrl, createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return createMetadata({
    title: article.seoTitle || article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    image: "/images/highsol-brand-board.png",
    imageWidth: 1254,
    imageHeight: 1254,
    imageAlt: "Highsol visual identity board",
    type: "article",
    publishedTime: article.publishedDate,
    modifiedTime: article.modifiedDate,
    authors: [article.author.name],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = absoluteUrl(`/blog/${article.slug}`);

  // Schema 1: BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": articleUrl,
    url: articleUrl,
    headline: article.title,
    description: article.description,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    articleSection: article.category,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Highsol",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/highsol-logo.svg"),
      },
    },
  };

  // Schema 2: BreadcrumbList
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  // Schema 3: FAQPage (strictly generated from visible FAQs only)
  const faqPageSchema =
    article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const relatedArticles = article.relatedSlugs
    .map((rSlug) => getArticleBySlug(rSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <main id="main-content" className="blog-article-page">
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbsSchema} />
      {faqPageSchema && <JsonLd data={faqPageSchema} />}

      <article className="blog-article-wrapper">
        <header className="article-header section-shell">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: article.category },
            ]}
          />

          <div className="article-meta-bar">
            <span className="article-category-badge">{article.category}</span>
            <span className="article-meta-divider">&bull;</span>
            <span className="article-meta-item">
              <CalendarBlank size={15} weight="regular" aria-hidden="true" />
              <time dateTime={article.publishedDate}>
                {new Date(article.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <span className="article-meta-divider">&bull;</span>
            <span className="article-meta-item">
              <Clock size={15} weight="regular" aria-hidden="true" />
              {article.readingTime}
            </span>
            <span className="article-meta-divider">&bull;</span>
            <span className="article-meta-item">
              <User size={15} weight="regular" aria-hidden="true" />
              <span>{article.author.name}</span>
            </span>
          </div>

          <h1 className="article-title">{article.title}</h1>
          <p className="article-lead">{article.description}</p>

          {/* AEO / GEO Direct Answer Callout */}
          <div className="direct-answer-callout" aria-label="Direct answer summary">
            <span className="callout-label">Overview</span>
            <p>{article.summary}</p>
          </div>

          {/* Key Takeaways Box */}
          <div className="key-takeaways-card">
            <span className="takeaways-title">Key Considerations for Project Teams</span>
            <ul>
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </div>
        </header>

        {/* Article Body Content */}
        <div className="article-content section-shell">
          {article.sections.map((section) => (
            <section className="article-section-block" id={section.id} key={section.id}>
              <h2>{section.heading}</h2>

              {section.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {section.diagram && <BlogDiagram diagram={section.diagram} />}

              {section.table && (
                <div className="blog-table-container">
                  {section.table.caption && <span className="table-caption">{section.table.caption}</span>}
                  <table className="blog-table">
                    <thead>
                      <tr>
                        {section.table.headers.map((th, hIdx) => (
                          <th key={hIdx} scope="col">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) =>
                            cIdx === 0 ? (
                              <th key={cIdx} scope="row" className="table-row-header">
                                {cell}
                              </th>
                            ) : (
                              <td key={cIdx}>{cell}</td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.checklist && (
                <div className="blog-checklist-card">
                  {section.checklist.title && <span className="checklist-title">{section.checklist.title}</span>}
                  <ol className="checklist-items">
                    {section.checklist.items.map((item, idx) => (
                      <li key={idx} className="checklist-item">
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {section.subsections &&
                section.subsections.map((sub) => (
                  <div className="article-subsection" id={sub.id} key={sub.id}>
                    <h3>{sub.heading}</h3>
                    {sub.paragraphs.map((subP, sIdx) => (
                      <p key={sIdx}>{subP}</p>
                    ))}
                  </div>
                ))}
            </section>
          ))}

          {/* Visible FAQs Section */}
          {article.faqs.length > 0 && (
            <section className="article-faqs-block" id="frequently-asked-questions">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {article.faqs.map((faq, idx) => (
                  <div className="faq-item" key={idx}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sources and References */}
          {article.sources.length > 0 && (
            <section className="article-sources-block" id="references">
              <h2>References and Planning Guidance</h2>
              <ul className="source-list">
                {article.sources.map((src, idx) => (
                  <li key={idx} className="source-item">
                    <strong>{src.title}</strong> &mdash; <span>{src.publisher}</span>
                    {src.note && <p className="source-note">{src.note}</p>}
                    {src.url && (
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="source-link">
                        View source <ArrowUpRight size={13} weight="bold" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Author Block */}
          <section className="article-author-card">
            <span className="author-card-label">Author</span>
            <div className="author-card-info">
              <span className="author-name">{article.author.name}</span>
              <p className="author-note">
                Prepared for hospitality specifiers, landscape architects, and commercial outdoor buyers.
              </p>
            </div>
          </section>

          {/* Internal Cross-Linking Navigation */}
          <nav className="article-footer-nav" aria-label="Explore other guides">
            <Link className="back-to-blog" href="/blog">
              <ArrowLeft size={16} weight="bold" />
              Back to all articles
            </Link>
            <div className="related-links-grid">
              {relatedArticles.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="related-article-card">
                  <span className="related-category">{rel.category}</span>
                  <h4>{rel.title}</h4>
                  <span className="read-prompt">Read guide <ArrowUpRight size={14} weight="bold" /></span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Commercial Inquiry CTA */}
        <section className="resort-cta section-shell">
          <Reveal>
            <h2>Planning shade for your next hospitality project?</h2>
            <p>
              Review product categories, discuss finish options, or share project requirements with Highsol.
            </p>
          </Reveal>
          <div className="cta-actions-cluster">
            <Link className="button button-primary" href="/#contact">
              Discuss your project <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/parasols">
              Browse product catalogue <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
