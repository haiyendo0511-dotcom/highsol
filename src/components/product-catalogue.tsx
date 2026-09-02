"use client";

import { ArrowUpRight, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Category,
  productFilters,
  products,
  type ProductConcept,
} from "@/content/products";

export function ProductCatalogue() {
  const [filter, setFilter] = useState<Category>("all");
  const [selected, setSelected] = useState<ProductConcept | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);
  const visible = useMemo(
    () => products.filter((product) => filter === "all" || product.category === filter),
    [filter],
  );
  const selectedImage = selected?.images[selectedImageIndex] ?? null;

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus();
    };
  }, [selected]);

  const openPreview = (product: ProductConcept, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setSelectedImageIndex(0);
    setSelected(product);
  };

  return (
    <>
      <div className="catalogue-controls" aria-label="Filter products by category">
        {productFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={filter === item.value ? "is-active" : undefined}
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
          >
            <span>{item.label}</span>
            <span>
              {item.value === "all"
                ? products.length
                : products.filter((product) => product.category === item.value).length}
            </span>
          </button>
        ))}
      </div>

      <div className="catalogue-grid">
        {visible.map((product, index) => (
          <article
            className={"catalogue-card catalogue-card-" + ((index % 5) + 1)}
            key={product.id}
          >
            <button
              type="button"
              className="catalogue-image"
              onClick={(event) => openPreview(product, event.currentTarget)}
              aria-label={"Open " + product.name}
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 40vw"
              />
              {product.images.length > 1 && (
                <span className="catalogue-view-count">{product.images.length} views</span>
              )}
            </button>
            <div className="catalogue-caption">
              <div>
                <span>{product.categoryLabel}</span>
                <h2>{product.name}</h2>
                <p>{product.context}</p>
              </div>
              <button
                type="button"
                onClick={(event) => openPreview(product, event.currentTarget)}
                aria-label={"View " + product.name + " details"}
              >
                <ArrowUpRight size={19} weight="bold" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected && selectedImage && (
        <div
          className="catalogue-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="catalogue-modal-title"
          onMouseDown={() => setSelected(null)}
        >
          <div
            className="catalogue-modal-panel"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="catalogue-modal-close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close product preview"
            >
              <X size={22} weight="bold" />
            </button>
            <div className="catalogue-modal-media">
              <div className="catalogue-modal-image">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="(max-width: 767px) 94vw, 65vw"
                />
              </div>
              {selected.images.length > 1 && (
                <div
                  className="catalogue-thumbnails"
                  role="group"
                  aria-label={"Choose a view of " + selected.name}
                >
                  {selected.images.map((image, index) => (
                    <button
                      type="button"
                      key={image.src}
                      className={selectedImageIndex === index ? "is-active" : undefined}
                      aria-pressed={selectedImageIndex === index}
                      aria-label={"Show " + image.viewLabel.toLowerCase() + " view"}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image src={image.src} alt="" fill sizes="88px" />
                      <span>{image.viewLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="catalogue-modal-copy">
              <span>{selected.categoryLabel}</span>
              <h2 id="catalogue-modal-title">{selected.name}</h2>
              <p>{selected.context}</p>
              <p className="catalogue-finish">{selected.finish}</p>
              <p className="reference-disclaimer">
                Packshot shown for design review. Dimensions, engineering, fabrics, finishes,
                and commercial availability are confirmed against the project brief.
              </p>
              <Link className="button button-primary" href="/#contact">
                Discuss this product <ArrowUpRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
