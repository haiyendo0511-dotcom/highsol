"use client";

import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="Highsol home" onClick={() => setOpen(false)}>
        <Logo />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "is-active" : undefined}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="nav-cta" href="/#contact" onClick={() => setOpen(false)}>
          Start a project
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={20} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={"mobile-menu" + (open ? " is-open" : "")}
        aria-label="Mobile navigation"
      >
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "is-active" : undefined}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>{item.label}</span>
            <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </header>
  );
}
