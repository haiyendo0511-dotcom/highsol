import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";

type InteriorHeroProps = {
  current: string;
  title: string;
  lede: string;
  image: string;
  alt: string;
  objectPosition?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function InteriorHero({
  current,
  title,
  lede,
  image,
  alt,
  objectPosition,
  ctaLabel = "Start an inquiry",
  ctaHref = "/#contact",
}: InteriorHeroProps) {
  return (
    <section className="page-hero section-shell">
      <Reveal className="page-hero-copy">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: current }]} />
        <h1>{title}</h1>
        <p>{lede}</p>
        <Link className="button button-primary" href={ctaHref}>
          {ctaLabel}
          <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
        </Link>
      </Reveal>
      <Reveal className="page-hero-media">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 58vw"
          style={objectPosition ? { objectPosition } : undefined}
        />
        <span className="concept-note">Concept visual. Replace with verified Highsol photography before launch.</span>
      </Reveal>
    </section>
  );
}
