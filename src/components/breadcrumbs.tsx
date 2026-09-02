import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {index < items.length - 1 && <CaretRight size={12} weight="bold" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
