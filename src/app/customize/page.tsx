import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/json-ld";
import { ParasolConfigurator } from "@/components/parasol-configurator";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hospitality Parasol Customizer",
  description:
    "Configure a Highsol hospitality parasol by platform, canopy, finish, mounting, accessories, and branding, then send one project-ready inquiry.",
  path: "/customize",
  image: "/images/packshots/center-pole-classic/01-three-quarter.png",
  imageWidth: 1024,
  imageHeight: 1024,
  imageAlt: "Representative Highsol center-pole hospitality parasol",
});

export default function CustomizePage() {
  return (
    <main id="main-content" className="customizer-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Highsol Hospitality Parasol Customizer",
          url: absoluteUrl("/customize"),
          description:
            "A guided specification tool for Highsol hospitality parasol project inquiries.",
          isPartOf: {
            "@type": "WebSite",
            name: "Highsol",
            url: absoluteUrl("/"),
          },
        }}
      />

      <section className="customizer-intro section-shell">
        <div className="customizer-intro-copy">
          <span>Hospitality parasol system</span>
          <h1>Configure shade for the setting.</h1>
          <p>
            Choose a base platform, tailor its visible details, then send one clear
            specification for project review.
          </p>
        </div>
        <a className="customizer-jump" href="#configuration-options">
          Start configuring <ArrowDown size={18} weight="bold" aria-hidden="true" />
        </a>
      </section>

      <ParasolConfigurator />
    </main>
  );
}
