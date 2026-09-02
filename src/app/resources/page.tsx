import { ArrowUpRight, FolderOpen, ListChecks, Swatches } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Project Resources",
  description: "Organize a hospitality parasol project with category, project brief, finish, and service-planning resources.",
  path: "/resources",
  image: "/images/resources-specification-concept.png",
});

const resources = [
  {
    icon: FolderOpen,
    title: "Category overview",
    copy: "Compare center-pole, cantilever, and large-format directions for the intended setting.",
    action: "Request overview",
  },
  {
    icon: ListChecks,
    title: "Project brief",
    copy: "Organize the site, furniture, exposure, product direction, quantities, and destination.",
    action: "Start a brief",
  },
  {
    icon: Swatches,
    title: "Finish direction",
    copy: "Prepare the canopy, frame, edge treatment, identity, and visual preferences for review.",
    action: "Request support",
  },
] as const;

const briefAreas = [
  { title: "Place", copy: "Site plan, application, exposure, circulation, furniture, and installation constraints." },
  { title: "Product", copy: "Preferred category, canopy form, coverage, mast position, operation, and finish direction." },
  { title: "Program", copy: "Quantities, destinations, timing, brand needs, packaging, and buyer documentation." },
  { title: "Evidence", copy: "Ratings, tests, certifications, warranty expectations, samples, and approval records." },
] as const;

export default function ResourcesPage() {
  return (
    <main id="main-content" className="resources-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Highsol Project Resources",
          url: "/resources",
          description: "Planning resources for hospitality parasol projects and buyer programs.",
        }}
      />

      <section className="resources-hero">
        <Reveal className="resources-hero-copy">
          <h1>Plan the shade before the sun arrives.</h1>
          <p>Useful starting points for designers, developers, procurement teams, and outdoor-living partners.</p>
          <a className="button button-primary" href="#resource-index">Explore resources <ArrowUpRight size={18} weight="bold" /></a>
        </Reveal>
        <div className="resources-hero-media">
          <Image
            src="/images/resources-specification-concept.png"
            alt="Parasol specification drawings and material samples on a project desk"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 57vw"
          />
        </div>
      </section>

      <section id="resource-index" className="resource-index section-shell">
        <Reveal className="resource-index-heading">
          <h2>Resources for the next conversation.</h2>
          <p>Working documents are request-only until each file has been technically reviewed and approved for publication.</p>
        </Reveal>
        <div className="resource-index-list">
          {resources.map(({ icon: Icon, title, copy, action }) => (
            <Reveal className="resource-index-item" key={title}>
              <Icon size={28} weight="light" aria-hidden="true" />
              <div><h3>{title}</h3><p>{copy}</p></div>
              <Link href="/#contact">{action}<ArrowUpRight size={17} weight="bold" /></Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="resource-brief-section">
        <div className="section-shell resource-brief-layout">
          <Reveal className="resource-brief-title">
            <h2>Prepare four parts of the brief.</h2>
            <p>Enough context helps Highsol ask better questions without forcing premature technical decisions.</p>
          </Reveal>
          <div className="resource-brief-grid">
            {briefAreas.map((area) => (
              <Reveal className="resource-brief-item" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="resource-reference section-shell">
        <Reveal className="resource-reference-image">
          <Image
            src="/reference/parasol-categories/cantilever-offset/tuuci-cantilever-coco-paris.jpg"
            alt="Cantilever parasols across a hospitality terrace"
            fill
            sizes="(max-width: 767px) 100vw, 58vw"
          />
        </Reveal>
        <Reveal className="resource-reference-copy">
          <h2>Use references to align the ambition.</h2>
          <p>Images can clarify form, setting, finish, and guest experience. Final specifications must come from confirmed Highsol product information.</p>
          <p className="reference-disclaimer">Reference photography is shown for prototype design review and is not cleared for publication.</p>
        </Reveal>
      </section>

      <section className="resort-cta section-shell">
        <Reveal>
          <h2>Send the context you already have.</h2>
          <p>A sketch, moodboard, schedule, plan, or buyer brief is enough to begin organizing the next questions.</p>
        </Reveal>
        <Link className="button button-primary" href="/#contact">Request project support <ArrowUpRight size={18} weight="bold" /></Link>
      </section>
    </main>
  );
}
