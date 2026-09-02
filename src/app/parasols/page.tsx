import { ArrowUpRight, Compass, HouseLine, MapPin, Users } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProductCatalogue } from "@/components/product-catalogue";
import { Reveal } from "@/components/reveal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Products Catalogue",
  description: "Browse Highsol center-pole, cantilever, and large-format parasols for hospitality and outdoor project applications.",
  path: "/parasols",
  image: "/images/packshots/dual-canopy-cantilever/02-front.jpg",
});

const applications = [
  { icon: MapPin, title: "Pool and beach", copy: "Coordinate shade, circulation, loungers, views, and service routes." },
  { icon: Users, title: "Dining and social", copy: "Keep furniture zones flexible while supporting a consistent guest experience." },
  { icon: HouseLine, title: "Villa and residence", copy: "Balance private shade, architectural lines, and the surrounding landscape." },
  { icon: Compass, title: "Resort-wide programs", copy: "Connect several outdoor zones through one considered shade language." },
] as const;

export default function ProductsPage() {
  return (
    <main id="main-content" className="products-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Highsol Products Catalogue",
          url: "/parasols",
          description: "Highsol center-pole, cantilever, and large-format parasols for hospitality projects.",
        }}
      />

      <section className="products-hero section-shell">
        <Reveal className="products-hero-copy">
          <h1>Choose how shade meets the space.</h1>
          <p>Browse by structure, setting, and project scale. Each direction can become the starting point for a Highsol conversation.</p>
          <a className="button button-primary" href="#catalogue">Browse the catalogue <ArrowUpRight size={18} weight="bold" /></a>
        </Reveal>
        <div className="products-hero-gallery">
          <Reveal className="products-hero-image products-hero-image-main">
            <Image
              src="/images/packshots/dual-canopy-cantilever/02-front.jpg"
              alt="Dual-canopy parasol system shown from the front"
              fill
              preload
              sizes="(max-width: 767px) 100vw, 48vw"
            />
          </Reveal>
          <Reveal className="products-hero-image">
            <Image
              src="/images/packshots/scalloped-center-pole/01-three-quarter.jpg"
              alt="Ivory scalloped center-pole parasol"
              fill
              sizes="(max-width: 767px) 50vw, 24vw"
            />
          </Reveal>
          <Reveal className="products-hero-image">
            <Image
              src="/images/packshots/square-cantilever/01-three-quarter.jpg"
              alt="Square cantilever parasol in a three-quarter view"
              fill
              sizes="(max-width: 767px) 50vw, 24vw"
            />
          </Reveal>
        </div>
      </section>

      <div className="prototype-banner">
        <div className="section-shell">
          <strong>Highsol product collection</strong>
          <span>Open each product to compare available packshot views and finish directions.</span>
        </div>
      </div>

      <section id="catalogue" className="catalogue-section section-shell">
        <Reveal className="catalogue-intro">
          <h2>Find the shade structure that fits the setting.</h2>
          <p>Filter the collection, compare product views, then bring the site plan and commercial brief into the conversation.</p>
        </Reveal>
        <ProductCatalogue />
      </section>

      <section className="products-applications">
        <div className="section-shell products-application-layout">
          <Reveal className="products-application-title">
            <h2>The setting decides what the product must do.</h2>
          </Reveal>
          <div className="products-application-list">
            {applications.map(({ icon: Icon, title, copy }) => (
              <Reveal className="products-application-item" key={title}>
                <Icon size={25} weight="light" aria-hidden="true" />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="resort-cta section-shell">
        <Reveal>
          <h2>Bring us the setting. We will help frame the shade.</h2>
          <p>Share the application, quantities, destination, and visual references already guiding the project.</p>
        </Reveal>
        <Link className="button button-primary" href="/#contact">Start a project <ArrowUpRight size={18} weight="bold" /></Link>
      </section>
    </main>
  );
}
