import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-main section-shell">
        <div className="footer-brand">
          <Link href="/" aria-label="Highsol home">
            <Logo inverse />
          </Link>
          <p>Architectural shade for hospitality, resorts, and outdoor living.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/parasols">Products</Link>
          <Link href="/manufacturing-vietnam">Manufacturing</Link>
          <Link href="/resources">Resources</Link>
        </nav>

        <div className="footer-contacts">
          <address>22 Street 19A, Binh Trung, HCMC, VN</address>
          <div className="footer-contact-list">
            <div className="footer-contact">
              <strong>Jonathan Dao</strong>
              <a href="tel:+84909809755">+84 909 809 755</a>
              <a href="mailto:jonathan@furny.asia">jonathan@furny.asia</a>
            </div>
            <div className="footer-contact">
              <strong>Harley Do</strong>
              <a href="tel:+84848777797">+84 848 777 797</a>
              <a href="mailto:harley@furny.asia">harley@furny.asia</a>
            </div>
          </div>
        </div>

        <div className="footer-cta">
          <p>Planning shade for a new outdoor space?</p>
          <Link className="footer-project-link" href="/#contact">
            Start a project
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="footer-base section-shell">
        <small>&copy; 2026 Highsol. Designed and manufactured in Vietnam.</small>
        <small>Reference photography is used for design review. Product claims remain subject to Highsol verification.</small>
      </div>
    </footer>
  );
}
