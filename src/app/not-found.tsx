import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <section className="not-found-hero section-shell">
        <Reveal className="not-found-copy">
          <span className="not-found-code">404 &mdash; Page Not Found</span>
          <h1>The structure you are looking for is not here.</h1>
          <p>
            The page may have moved, been renamed, or is temporarily unavailable.
            Explore our architectural parasol collections, manufacturing capabilities, or start a project conversation.
          </p>
          <div className="not-found-actions">
            <Link className="button button-primary" href="/">
              Return Home <ArrowUpRight size={18} weight="bold" />
            </Link>
            <Link className="text-link" href="/parasols">
              Browse Products <ArrowUpRight size={17} weight="bold" />
            </Link>
          </div>
        </Reveal>

        <div className="not-found-links-grid">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="not-found-card">
              <h3>{item.label}</h3>
              <p>
                {item.href === "/" && "Return to the Highsol homepage and architectural shade overview."}
                {item.href === "/parasols" && "Explore center-pole, cantilever, and large-format collections."}
                {item.href === "/customize" && "Build a hospitality parasol direction and send it for project review."}
                {item.href === "/manufacturing-vietnam" && "Learn about Vietnam manufacturing coordination and OEM/ODM programs."}
                {item.href === "/resources" && "Access project planning guides, specifications, and finish references."}
              </p>
              <span>
                Explore {item.label} <ArrowUpRight size={16} weight="bold" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
