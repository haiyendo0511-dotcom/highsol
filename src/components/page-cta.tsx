import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

type PageCtaProps = {
  title: string;
  copy: string;
  label?: string;
};

export function PageCta({ title, copy, label = "Start an inquiry" }: PageCtaProps) {
  return (
    <section className="page-cta section-shell">
      <Reveal className="page-cta-copy">
        <h2>{title}</h2>
        <p>{copy}</p>
      </Reveal>
      <Reveal className="page-cta-action">
        <Link className="button button-primary" href="/#contact">
          {label}
          <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
