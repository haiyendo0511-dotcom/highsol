export type Category = "all" | "center-pole" | "cantilever" | "large-format";

export type ProductImage = {
  src: string;
  alt: string;
  viewLabel: string;
};

export type ProductConcept = {
  id: string;
  name: string;
  category: Exclude<Category, "all">;
  categoryLabel: string;
  images: ProductImage[];
  context: string;
  finish: string;
};

export const products: ProductConcept[] = [
  {
    id: "scalloped-center-pole",
    name: "Scalloped Center Pole",
    category: "center-pole",
    categoryLabel: "Center pole",
    images: [
      {
        src: "/images/packshots/scalloped-center-pole/01-three-quarter.jpg",
        alt: "Ivory scalloped center-pole parasol in a three-quarter view",
        viewLabel: "Three-quarter",
      },
      {
        src: "/images/packshots/scalloped-center-pole/02-front.jpg",
        alt: "Ivory scalloped center-pole parasol from the front",
        viewLabel: "Front",
      },
      {
        src: "/images/packshots/scalloped-center-pole/03-underside-profile.jpg",
        alt: "Ivory scalloped center-pole parasol showing its underside frame",
        viewLabel: "Underside",
      },
    ],
    context: "A classic double-tier canopy for pool decks, villas, and dining terraces.",
    finish: "Warm ivory canopy / bronze frame / scalloped valance",
  },
  {
    id: "square-cantilever",
    name: "Square Cantilever",
    category: "cantilever",
    categoryLabel: "Cantilever",
    images: [
      {
        src: "/images/packshots/square-cantilever/01-three-quarter.jpg",
        alt: "Square offset cantilever parasol in a three-quarter view",
        viewLabel: "Three-quarter",
      },
      {
        src: "/images/packshots/square-cantilever/02-front.jpg",
        alt: "Square offset cantilever parasol from the front",
        viewLabel: "Front",
      },
      {
        src: "/images/packshots/square-cantilever/03-profile.jpg",
        alt: "Square offset cantilever parasol in profile",
        viewLabel: "Profile",
      },
    ],
    context: "Offset shade that keeps lounge and dining layouts open beneath the canopy.",
    finish: "Taupe square canopy / dark bronze frame / offset mast",
  },
  {
    id: "dual-canopy-system",
    name: "Dual Canopy System",
    category: "large-format",
    categoryLabel: "Large format",
    images: [
      {
        src: "/images/packshots/dual-canopy-cantilever/01-three-quarter.jpg",
        alt: "Dual-canopy cantilever parasol system in a three-quarter view",
        viewLabel: "Three-quarter",
      },
      {
        src: "/images/packshots/dual-canopy-cantilever/02-front.jpg",
        alt: "Dual-canopy cantilever parasol system from the front",
        viewLabel: "Front",
      },
      {
        src: "/images/packshots/dual-canopy-cantilever/03-rear-underside.jpg",
        alt: "Dual-canopy cantilever parasol system showing its underside frame",
        viewLabel: "Underside",
      },
    ],
    context: "Two coordinated shade zones supported by one central mast for broad terraces.",
    finish: "Warm ivory twin canopies / charcoal frame / shared weighted base",
  },
  {
    id: "salmon-scallop",
    name: "Salmon Scallop",
    category: "center-pole",
    categoryLabel: "Center pole",
    images: [
      {
        src: "/images/packshots/source-photo-colorways/salmon-white-scallop.jpg",
        alt: "Salmon parasol with white scalloped trim",
        viewLabel: "Packshot",
      },
    ],
    context: "A warm poolside colorway with crisp white piping and a relaxed resort character.",
    finish: "Salmon canopy / white trim / bronze mast",
  },
  {
    id: "ivory-green-scallop",
    name: "Ivory Green Scallop",
    category: "center-pole",
    categoryLabel: "Center pole",
    images: [
      {
        src: "/images/packshots/source-photo-colorways/ivory-green-scallop.jpg",
        alt: "Ivory parasol with moss-green scalloped piping",
        viewLabel: "Packshot",
      },
    ],
    context: "Tailored green piping gives the ivory canopy a garden-led hospitality finish.",
    finish: "Ivory canopy / moss-green piping / timber-tone mast",
  },
  {
    id: "powder-blue-scallop",
    name: "Powder Blue Scallop",
    category: "center-pole",
    categoryLabel: "Center pole",
    images: [
      {
        src: "/images/packshots/source-photo-colorways/powder-blue-white-scallop.jpg",
        alt: "Powder-blue parasol with white scalloped trim",
        viewLabel: "Packshot",
      },
    ],
    context: "A pale blue and white combination suited to pool terraces and coastal settings.",
    finish: "Powder-blue canopy / white trim / bronze mast",
  },
  {
    id: "ivory-coral-scallop",
    name: "Ivory Coral Scallop",
    category: "center-pole",
    categoryLabel: "Center pole",
    images: [
      {
        src: "/images/packshots/source-photo-colorways/ivory-coral-scallop.jpg",
        alt: "Ivory parasol with coral scalloped piping",
        viewLabel: "Packshot",
      },
    ],
    context: "Fine coral piping adds a warmer, residential expression to an ivory canopy.",
    finish: "Ivory canopy / coral piping / timber-tone mast",
  },
  {
    id: "floral-dome",
    name: "Floral Dome",
    category: "center-pole",
    categoryLabel: "Center pole",
    images: [
      {
        src: "/images/packshots/source-photo-colorways/floral-dome-green-trim.jpg",
        alt: "Floral dome parasol with forest-green trim",
        viewLabel: "Packshot",
      },
    ],
    context: "A low domed silhouette with botanical fabric for intimate resort and villa settings.",
    finish: "Botanical fabric / forest-green binding / timber mast",
  },
];

export const productFilters: { label: string; value: Category }[] = [
  { label: "All products", value: "all" },
  { label: "Center pole", value: "center-pole" },
  { label: "Cantilever", value: "cantilever" },
  { label: "Large format", value: "large-format" },
];
