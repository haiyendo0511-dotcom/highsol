import { ArrowUpRight, CheckCircle, ClipboardText, Package, Palette, PencilRuler, Wrench } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Manufacturing and OEM / ODM",
  description: "Explore Highsol manufacturing coordination, project development, and OEM or ODM parasol programs in Vietnam.",
  path: "/manufacturing-vietnam",
  image: "/images/manufacturing-assembly-concept.png",
});

const workflow = [
  { title: "Define the brief", copy: "Application, quantity, destination, timing, evidence, and commercial needs." },
  { title: "Develop the basis", copy: "Structure, canopy, finish, identity, hardware, packaging, and documentation." },
  { title: "Review the prototype", copy: "Confirm decisions and remaining questions before a production release." },
  { title: "Prepare delivery", copy: "Coordinate inspection, protection, labels, packing, and the buyer handoff." },
] as const;

const programs = [
  {
    title: "Adopt a Highsol direction",
    copy: "Start from a collection concept and coordinate the canopy, finish, packaging, and project presentation.",
  },
  {
    title: "Develop a project variant",
    copy: "Adapt the product direction around one site, its visual language, service needs, and delivery program.",
  },
  {
    title: "Build a private-label program",
    copy: "Align the assortment, identity, specification, packaging, and buyer documentation as one system.",
  },
] as const;

const proofAreas = [
  { icon: ClipboardText, title: "Specification control", copy: "One approved basis for product details and project decisions." },
  { icon: Wrench, title: "Assembly intent", copy: "Connections considered for operation, service, and project handling." },
  { icon: CheckCircle, title: "Inspection planning", copy: "Checkpoints shaped around the actual product program." },
  { icon: Package, title: "Export preparation", copy: "Protection, identification, and documentation prepared before release." },
] as const;

export default function ManufacturingPage() {
  return (
    <main id="main-content" className="manufacturing-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Highsol Manufacturing and OEM / ODM",
          url: "/manufacturing-vietnam",
          serviceType: "Parasol product development and manufacturing coordination",
        }}
      />

      <section className="manufacturing-hero">
        <div className="manufacturing-hero-media">
          <Image
            src="/images/manufacturing-assembly-concept.png"
            alt="Parasol frame being assembled in a workshop"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 58vw"
          />
          <div className="manufacturing-material-rail">
            <span>Canopy</span><span>Frame</span><span>Finish</span><span>Packing</span>
          </div>
        </div>
        <Reveal className="manufacturing-hero-copy">
          <h1>Built around your project.</h1>
          <p>From early direction to production preparation, every program begins with a clear basis for the work.</p>
          <Link className="button button-primary" href="/#contact">Discuss your project <ArrowUpRight size={18} weight="bold" /></Link>
        </Reveal>
      </section>

      <section className="manufacturing-workflow section-shell">
        <Reveal className="manufacturing-workflow-title">
          <h2>Make the next decision clear.</h2>
          <p>A visible workflow reduces uncertainty for the buyer, the development team, and the people preparing production.</p>
        </Reveal>
        <div className="manufacturing-workflow-list">
          {workflow.map((item) => (
            <Reveal className="manufacturing-workflow-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="oem-odm" className="oem-section">
        <div className="section-shell">
          <Reveal className="oem-heading">
            <h2>Choose the right level of development.</h2>
            <p>Not every buyer needs to begin from zero. The starting model should match the market, project, timing, and decision scope.</p>
          </Reveal>
          <div className="oem-layout">
            <Reveal className="oem-image-main">
              <Image src="/images/oem-development-concept.png" alt="OEM development materials, drawings, and parasol components" fill sizes="(max-width: 767px) 100vw, 56vw" />
            </Reveal>
            <div className="oem-program-list">
              {programs.map((program) => (
                <Reveal className="oem-program" key={program.title}>
                  <h3>{program.title}</h3>
                  <p>{program.copy}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="oem-detail-image">
              <Image src="/images/engineering-detail-concept.png" alt="Close view of parasol connection hardware" fill sizes="(max-width: 767px) 100vw, 28vw" />
            </Reveal>
            <Reveal className="oem-finish-panel">
              <Palette size={28} weight="light" aria-hidden="true" />
              <PencilRuler size={28} weight="light" aria-hidden="true" />
              <h3>One canvas for product and brand.</h3>
              <p>Canopy, finish, identity, packaging, and documents develop as one buyer-facing system.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="manufacturing-proof section-shell">
        <Reveal className="manufacturing-proof-title">
          <h2>Build proof around the actual product.</h2>
          <p>Evidence, ratings, materials, lead times, warranties, and certifications are confirmed for the specific program before publication.</p>
        </Reveal>
        <div className="manufacturing-proof-grid">
          {proofAreas.map(({ icon: Icon, title, copy }) => (
            <Reveal className="manufacturing-proof-item" key={title}>
              <Icon size={26} weight="light" aria-hidden="true" />
              <div><h3>{title}</h3><p>{copy}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="resort-cta section-shell">
        <Reveal>
          <h2>Bring product and manufacturing into one conversation.</h2>
          <p>Share the application, quantity, destination, timing, and evidence your team expects.</p>
        </Reveal>
        <Link className="button button-primary" href="/#contact">Discuss manufacturing <ArrowUpRight size={18} weight="bold" /></Link>
      </section>
    </main>
  );
}
