import { ArrowDownRight, ArrowUpRight, Factory, GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

const collectionImages = [
  {
    name: "Center pole",
    copy: "A balanced silhouette for pool decks, terraces, dining, and coordinated resort programs.",
    image: "/reference/parasol-categories/center-pole/tuuci-center-pole-aegon-mykonos.jpg",
    alt: "Center pole parasols beside a resort pool",
  },
  {
    name: "Cantilever",
    copy: "Clear usable space beneath an offset canopy for lounges, dining, and hospitality layouts.",
    image: "/reference/parasol-categories/cantilever-offset/tuuci-cantilever-sagaponack.jpg",
    alt: "Cantilever parasols integrated into a landscaped resort",
  },
  {
    name: "Large format",
    copy: "Project-led shade for expansive terraces and expressive architectural settings.",
    image: "/reference/parasol-categories/large-format-telescopic/mdt-xxl-tulip-view-1.jpg",
    alt: "Large format parasol structure",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <section id="top" className="home-hero">
        <Reveal className="home-hero-copy">
          <h1>Made for life outdoors.</h1>
          <p>Parasols for resorts, residences, hospitality programs, and remarkable outdoor places.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Start a project <ArrowUpRight size={18} weight="bold" /></a>
            <Link className="text-link" href="/parasols">Explore products <ArrowDownRight size={17} weight="bold" /></Link>
          </div>
          <div className="home-hero-details">
            <span>Project-led development</span>
            <span>Manufacturing in Vietnam</span>
          </div>
        </Reveal>
        <div className="home-hero-media">
          <Image
            src="/reference/parasol-categories/cantilever-offset/tuuci-cantilever-kailua-kona.jpg"
            alt="Cantilever parasol shading an outdoor dining table at sunset"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 60vw"
          />
          <span className="photo-review-note">Reference photography for design review</span>
        </div>
      </section>

      <section className="home-foundation section-shell">
        <Reveal className="home-foundation-title">
          <h2>Shade should belong to the architecture.</h2>
          <p>Highsol brings product direction and manufacturing coordination together for outdoor hospitality environments.</p>
        </Reveal>
        <div className="home-principles">
          {site.principles.map((item) => (
            <Reveal className="home-principle" key={item.label}>
              <strong>{item.label}</strong>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-collections">
        <div className="section-shell">
          <Reveal className="home-collections-heading">
            <h2>Three ways to shape the space.</h2>
            <p>Start with the mast relationship, then develop the canopy, scale, finish, and operating details for the project.</p>
          </Reveal>
          <div className="home-collection-grid">
            {collectionImages.map((item, index) => (
              <Reveal className={"home-collection home-collection-" + (index + 1)} key={item.name}>
                <Link href="/parasols" className="home-collection-image" aria-label={"Explore " + item.name + " products"}>
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 767px) 100vw, 33vw" />
                </Link>
                <div><h3>{item.name}</h3><p>{item.copy}</p><Link href="/parasols">View collection <ArrowUpRight size={16} weight="bold" /></Link></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-hospitality">
        <Image
          src="/images/hospitality-concept.png"
          alt="Coordinated parasols across a contemporary coastal resort"
          fill
          sizes="100vw"
        />
        <div className="home-hospitality-shade" />
        <Reveal className="home-hospitality-copy">
          <h2>Connect the pool, dining, beach, and villa experience.</h2>
          <p>One considered shade program can give each outdoor zone a clear role while keeping the property visually connected.</p>
          <a className="text-link text-link-light" href="#contact">Discuss the property <ArrowUpRight size={17} weight="bold" /></a>
        </Reveal>
      </section>

      <section className="home-manufacturing section-shell">
        <Reveal className="home-manufacturing-image">
          <Image
            src="/images/manufacturing-assembly-concept.png"
            alt="Parasol frame being assembled in a workshop"
            fill
            sizes="(max-width: 767px) 100vw, 55vw"
          />
        </Reveal>
        <Reveal className="home-manufacturing-copy">
          <Factory size={30} weight="light" aria-hidden="true" />
          <h2>Built around the project brief.</h2>
          <p>Coordinate product direction, finishes, canopy, identity, prototype review, inspection, packaging, and export preparation through one team.</p>
          <Link className="text-link" href="/manufacturing-vietnam">Explore manufacturing <ArrowUpRight size={17} weight="bold" /></Link>
          <div className="home-manufacturing-location">
            <GlobeHemisphereWest size={24} weight="light" />
            <span>Vietnam</span>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="contact section-shell">
        <Reveal className="contact-copy">
          <h2>Tell us what you need to shade.</h2>
          <p>Share the project type, destination, product direction, and expected quantity. Highsol will prepare the next conversation.</p>
          <dl>
            <div><dt>Email</dt><dd>{site.email}</dd></div>
            <div><dt>WhatsApp</dt><dd>{site.whatsapp || "Number to be connected"}</dd></div>
            <div><dt>Manufacturing</dt><dd>Vietnam</dd></div>
          </dl>
        </Reveal>
        <Reveal><ContactForm /></Reveal>
      </section>
    </main>
  );
}
