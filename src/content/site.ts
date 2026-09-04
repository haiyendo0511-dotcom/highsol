export const site = {
  name: "Highsol",
  tagline: "Precision shade architecture",
  email: process.env.NEXT_PUBLIC_HIGHSOL_EMAIL || "inquiry@highsol.example",
  whatsapp: process.env.NEXT_PUBLIC_HIGHSOL_WHATSAPP || "",
  factoryLocation: "Vietnam factory location to be confirmed",
  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/parasols" },
    { label: "Customize", href: "/customize" },
    { label: "Manufacturing", href: "/manufacturing-vietnam" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
  ],
  collections: [
    {
      name: "Center-Pole",
      copy: "A balanced silhouette for pool decks, terraces, dining, and coordinated resort programs.",
    },
    {
      name: "Cantilever",
      copy: "Clear usable space beneath an offset canopy for lounge and hospitality layouts.",
    },
    {
      name: "Large-Format",
      copy: "Statement shade for expansive outdoor zones and project-led specifications.",
    },
  ],
  principles: [
    { label: "Design", copy: "Proportions shaped for contemporary hospitality architecture." },
    { label: "Build", copy: "Details developed for repeatable production and service access." },
    { label: "Adapt", copy: "Finish, canopy, branding, and project options prepared with buyers." },
  ],
  customization: [
    "Highsol collection supply",
    "OEM and private-label programs",
    "Project finish coordination",
    "Canopy color and branding options",
    "Packaging and export documentation",
    "Sample and specification support",
  ],
} as const;
