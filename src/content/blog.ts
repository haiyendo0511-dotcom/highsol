export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogSource = {
  title: string;
  publisher: string;
  url?: string;
  note?: string;
};

export type BlogTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type BlogChecklist = {
  title?: string;
  items: Array<{ title: string; desc: string }>;
};

export type BlogDiagram = {
  type: "center-vs-cantilever" | "pool-deck-layout" | "oem-workflow";
  caption: string;
};

export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  table?: BlogTable;
  checklist?: BlogChecklist;
  diagram?: BlogDiagram;
  subsections?: Array<{
    id: string;
    heading: string;
    paragraphs: string[];
  }>;
};

export type BlogArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  publishedDate: string;
  modifiedDate: string;
  author: {
    name: "Harley Do";
  };
  category: string;
  readingTime: string;
  summary: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  sources: BlogSource[];
  relatedSlugs: string[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "center-pole-vs-cantilever-parasols-hospitality",
    title: "Center-Pole vs Cantilever Parasols for Hospitality Projects",
    seoTitle: "Center-Pole vs Cantilever Parasols: Hospitality Comparison",
    description:
      "An architectural comparison of center-pole and cantilever parasols examining mast placement, layout flexibility, and project decision factors.",
    publishedDate: "2026-09-03",
    modifiedDate: "2026-09-03",
    author: {
      name: "Harley Do",
    },
    category: "Hospitality Architecture",
    readingTime: "5 min read",
    summary:
      "Center-pole parasols locate the vertical mast at the canopy center, fitting between paired loungers or dining tables. Cantilever parasols position the mast outside the shaded perimeter, keeping the floor area open for lounge seating while requiring space planning for the offset base, consideration of model-specific operation, and project-specific mounting verification.",
    keyTakeaways: [
      "Mast placement shapes furniture coordination: center poles partition seating areas symmetrically, while cantilevers keep the floor area beneath the canopy open for continuous arrangements.",
      "Mounting requires project-specific verification: evaluate base positioning, available deck depth, and local site conditions with the project engineer and product manufacturer.",
      "Operating mechanisms vary by model: review how staff will open, rotate, tilt, and secure each structure during daily service and weather changes.",
      "Layout planning depends on use zones: center poles suit dining tables with umbrella ports and paired loungers; cantilevers accommodate modular sectionals and flexible lounge seating.",
    ],
    sections: [
      {
        id: "direct-comparison",
        heading: "Comparing Mast Envelopes in Hospitality Spaces",
        paragraphs: [
          "In commercial hospitality planning, outdoor shade structures form an active part of the architectural envelope. The geometric relationship between the canopy and its supporting mast determines how guests move through an outdoor room, how furniture is grouped, and how staff service the space.",
          "Center-pole parasols represent the traditional shade typology. A single mast ascends directly through the center of the canopy framework. This concentric layout positions the mast centrally within the furniture grouping and requires a central base or ground fitting.",
          "Cantilever parasols position the vertical mast entirely outside the canopy boundary. An overhead boom arm suspends the shade structure from above, leaving the floor surface beneath the canopy free of a central vertical obstruction.",
        ],
        diagram: {
          type: "center-vs-cantilever",
          caption: "Illustrative schematic comparing central mast placement and offset cantilever envelopes.",
        },
      },
      {
        id: "specification-matrix",
        heading: "Spatial and Operational Comparison Matrix",
        paragraphs: [
          "When evaluating shade structures for hotel terraces, resort decks, or restaurant patios, project teams balance floor usability with site-specific planning considerations.",
        ],
        table: {
          caption: "Typology Comparison for Hospitality Planning",
          headers: ["Planning Factor", "Center-Pole Parasol", "Cantilever (Offset) Parasol"],
          rows: [
            ["Mast Location", "Center of canopy footprint", "External to canopy footprint"],
            ["Usable Floor Area", "Divided by central mast", "Open space beneath canopy"],
            ["Mounting Considerations", "Base placed centrally between furniture", "Base positioned outside shaded perimeter"],
            ["Mounting Verification", "Review with project engineer and manufacturer", "Review with project engineer and manufacturer"],
            ["Furniture Coordination", "Dining tables with umbrella ports, lounger pairs", "Sectional seating, deep lounge chairs, daybeds"],
            ["Operation & Adjustments", "Model-specific lift mechanism", "Model-specific boom, rotation, and tilt controls"],
            ["Maintenance Review", "Routine inspection of lift components and fabric attachment", "Routine inspection of moving joints, locks, and boom hardware"],
          ],
        },
      },
      {
        id: "site-exposure-and-mounting",
        heading: "Mounting and Exposure Decision Factors",
        paragraphs: [
          "Outdoor exposure conditions vary across hospitality environments. Elevated rooftop terraces, open coastal properties, and inland garden courtyards experience distinct wind patterns and local microclimates.",
          "Because each site presents unique physical conditions, mounting options—such as freestanding weighted bases, surface mounting plates, or in-ground sleeves—should never be selected based on general assumptions. Base dimensions, anchoring depth, and clearance around the mast require site-specific review.",
          "Project specifiers should coordinate mounting decisions directly with project structural engineers and verified manufacturer guidelines to ensure the chosen method suits the specific deck substrate and exposure profile.",
        ],
      },
      {
        id: "circulation-and-service",
        heading: "Staff Operation and Daily Workflow",
        paragraphs: [
          "From an operational standpoint, mast placement influences server ergonomics and guest circulation paths. A central mast must be positioned thoughtfully so it does not impede food and beverage delivery or interrupt key visual sightlines.",
          "Cantilever parasols offer flexibility in lounge zones where guests adjust their seating orientation throughout the day. Depending on the model, rotation mechanisms allow staff to adjust canopy coverage as the sun moves without shifting heavy furniture.",
          "However, the offset mast and base of a cantilever require deliberate floor planning. If positioned along primary pedestrian pathways, the external mast can become an obstacle. Center-pole parasols nestle naturally between paired loungers or beneath dining tables, keeping surrounding walkways open.",
        ],
      },
      {
        id: "decision-checklist",
        heading: "Project Decision Checklist",
        paragraphs: [
          "Use this sequential checklist during project schematic planning to determine the suitable shade typology for each exterior zone.",
        ],
        checklist: {
          title: "Typology Decision Steps",
          items: [
            {
              title: "1. Clarify Zone Seating Layout",
              desc: "Determine whether the space requires dining tables with central openings, paired loungers with a shared side table, or open lounge seating.",
            },
            {
              title: "2. Assess Local Exposure Conditions",
              desc: "Review site exposure, coastal gust patterns, and surrounding architectural wind funnels to understand physical stability requirements.",
            },
            {
              title: "3. Evaluate Substrate and Mounting Options",
              desc: "Identify whether the deck surface allows in-ground sleeves, surface anchor plates, or requires freestanding bases, and verify with the engineer.",
            },
            {
              title: "4. Confirm Daily Staff Operating Procedures",
              desc: "Establish operational protocols for daily canopy opening, closing during inclement weather, and seasonal storage.",
            },
            {
              title: "5. Plan Maintenance and Component Care",
              desc: "Account for mechanical complexity, hardware care in humid or maritime air, and routine cleaning procedures.",
            },
          ],
        },
      },
    ],
    faqs: [
      {
        question: "How does mast position affect furniture arrangements?",
        answer:
          "Center-pole masts sit within the furniture footprint, such as between two loungers or through a table port. Cantilever masts sit outside the canopy footprint, leaving the area under the canopy open for flexible groupings.",
      },
      {
        question: "How should teams select between center-pole and cantilever options for pool areas?",
        answer:
          "Selection depends on the planned furniture and circulation. Paired loungers often align well with center poles, while daybeds or modular seating often benefit from an offset mast.",
      },
      {
        question: "How should mounting methods be evaluated for a project?",
        answer:
          "Mounting options—including freestanding bases, surface plates, or in-ground sleeves—should be evaluated based on deck structure, guest circulation, and manufacturer guidelines verified by the project engineer.",
      },
      {
        question: "What operational factors should staff consider?",
        answer:
          "Teams should evaluate how easily staff can access and operate the lift, tilt, or rotation controls for the specific model, and establish clear routines for closing and securing canopies when weather conditions change.",
      },
    ],
    sources: [],
    relatedSlugs: [
      "how-to-plan-parasol-layouts-resort-pool-decks-dining",
      "oem-private-label-parasols-buyers-project-brief",
    ],
  },
  {
    slug: "how-to-plan-parasol-layouts-resort-pool-decks-dining",
    title: "How to Plan Parasol Layouts for Resort Pool Decks and Outdoor Dining",
    seoTitle: "Planning Parasol Layouts for Pool Decks & Dining",
    description:
      "Architectural guidelines for coordinating canopy coverage, guest circulation, solar movement, and mounting on hospitality terraces.",
    publishedDate: "2026-09-03",
    modifiedDate: "2026-09-03",
    author: {
      name: "Harley Do",
    },
    category: "Site Planning",
    readingTime: "6 min read",
    summary:
      "Effective outdoor shade planning coordinates solar movement, guest and service circulation, and perimeter buffers across pool decks and dining terraces. Evaluating how sunlight shifts throughout afternoon hours helps teams position canopies where shade covers guests while treating all mounting options as possibilities requiring selected-product and engineer review.",
    keyTakeaways: [
      "Observe afternoon solar shifts: study projected shade angles during peak operating hours to ensure canopies cover seated guests rather than vacant paving.",
      "Protect primary circulation routes: maintain generous walkways between parasol bases, furniture groupings, and service doors for staff and guest comfort.",
      "Respect pool edge perimeters: position parasol bases back from pool edges to preserve open walking areas and reduce splash contact.",
      "Treat mounting as a project-specific review: consider in-ground sleeves, surface plates, or freestanding bases as options requiring review with project engineers and the selected product manufacturer.",
    ],
    sections: [
      {
        id: "spatial-planning-fundamentals",
        heading: "Spatial Coordination for Hospitality Terraces",
        paragraphs: [
          "Designing outdoor shade for commercial resorts and dining terraces requires balancing guest comfort, visual rhythm, and operational movement. Commercial decks accommodate guests alongside hospitality staff, maintenance rounds, and service equipment.",
          "When parasol layouts are coordinated during early schematic planning, teams prevent common operational challenges: canopies that contact one another during wind movement, base plates placed across natural walking paths, or shade projected onto empty pavement during peak hours.",
          "Thoughtful layout planning begins with functional zoning: identifying wet pool edges, primary lounger modules, dining seating areas, and primary service circulation corridors.",
        ],
        diagram: {
          type: "pool-deck-layout",
          caption: "Illustrative plan view indicating pool perimeter setback, lounger shade modules, and circulation corridors.",
        },
      },
      {
        id: "circulation-and-zoning",
        heading: "Deck Zoning and Clearance Considerations",
        paragraphs: [
          "To maintain comfortable guest movement and smooth service operations, landscape architects and interior specifiers evaluate clearance envelopes across distinct terrace zones.",
          "Canopy heights should provide comfortable walk-under headroom beneath ribs and valances when open, allowing hospitality staff and guests to navigate without ducking.",
        ],
        table: {
          caption: "Deck Zoning and Layout Planning Considerations",
          headers: ["Deck Zone", "Planning Considerations", "Review Objective"],
          rows: [
            ["Pool Coping Edge", "Maintain clear buffer from water edge", "Preserve open perimeter for walking and maintenance"],
            ["Lounger Groupings", "Align masts between paired loungers", "Provide shared canopy coverage with space for side tables"],
            ["Service Arteries", "Keep primary paths clear of bases and overhangs", "Allow comfortable passage for service staff and hospitality carts"],
            ["Canopy Spacing", "Leave open gap between adjacent canopies", "Prevent canopy contact during natural breeze movement"],
            ["Dining Terraces", "Coordinate mast location with chair movement", "Enable guests to slide chairs back without contacting masts or bases"],
          ],
        },
      },
      {
        id: "solar-orientation",
        heading: "Solar Movement and Afternoon Shade Angles",
        paragraphs: [
          "Overhead shade is rarely cast directly beneath a canopy throughout the day. During peak afternoon hours, the sun sits at an angle that projects shadows away from the canopy footprint.",
          "On terraces oriented toward afternoon views, a parasol placed directly above a lounger may cast shade behind the backrest while leaving the guest exposed. Understanding site orientation helps project teams determine whether static masts should be positioned with a slight offset or whether adjustable canopies are advantageous.",
          "Where fixed ground sleeves are planned, project teams benefit from reviewing sun path diagrams for key operating months to align canopy locations with primary guest use hours.",
        ],
      },
      {
        id: "anchorage-methods",
        heading: "Mounting Considerations: Sleeves, Plates, and Bases",
        paragraphs: [
          "Mounting decisions influence deck appearance, floor circulation, and operational flexibility. Commercial environments typically evaluate three primary possibilities:",
          "1. In-ground Sleeves: Installed into concrete during deck construction, allowing flush surface caps when parasols are removed for seasonal storage.",
          "2. Surface Mounting Plates: Bolted directly to structural slabs where subsurface sleeves cannot be accommodated.",
          "3. Freestanding Bases: Weighted bases that provide positioning flexibility but occupy floor area and require careful placement.",
          "Every mounting approach presents distinct engineering and installation considerations. Teams should review the selected product's specifications and have the installation plan evaluated by the project engineer.",
        ],
      },
      {
        id: "layout-checklist",
        heading: "Deck Layout Planning Checklist",
        paragraphs: [
          "Follow this sequential checklist when coordinating shade layouts from schematic design through site review.",
        ],
        checklist: {
          title: "Layout Planning Steps",
          items: [
            {
              title: "1. Coordinate with Civil and Landscape Teams",
              desc: "Review deck drainage slopes, expansion joints, and subsurface utilities before finalizing fixed mounting locations.",
            },
            {
              title: "2. Review Local Sun Paths",
              desc: "Evaluate solar angles during peak guest hours to ensure shade lands across intended seating zones.",
            },
            {
              title: "3. Map Primary and Service Circulation",
              desc: "Verify that parasol bases and canopies leave generous, unobstructed pathways for guests and staff.",
            },
            {
              title: "4. Maintain Canopy Separation Offsets",
              desc: "Ensure neighboring canopies have sufficient open air space between fabric edges to avoid contact during breezes.",
            },
            {
              title: "5. Establish Weather Operating Procedures",
              desc: "Define staff responsibilities for closing canopies during sudden wind shifts and staging secure storage during storms.",
            },
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Why is spacing between adjacent canopies important on a resort deck?",
        answer:
          "Maintaining an open air gap between neighboring canopies prevents fabric and rib contact during natural breeze movement and allows air to circulate freely.",
      },
      {
        question: "How should mounting options be selected for a pool deck?",
        answer:
          "In-ground sleeves, surface mounting plates, and freestanding bases are all possibilities. The appropriate choice depends on deck construction, guest circulation, and manufacturer guidelines, and must be reviewed with the project engineer.",
      },
      {
        question: "How can teams plan for shade coverage during late afternoon hours?",
        answer:
          "By reviewing local sun path angles during planning, teams can determine whether static masts should be positioned with a deliberate offset or whether adjustable canopies are desirable for the space.",
      },
      {
        question: "Why should parasol bases be placed away from pool water edges?",
        answer:
          "Keeping bases set back from the coping preserves an open walking perimeter for guests and staff and reduces exposure to wet deck splash zones.",
      },
    ],
    sources: [],
    relatedSlugs: [
      "center-pole-vs-cantilever-parasols-hospitality",
      "oem-private-label-parasols-buyers-project-brief",
    ],
  },
  {
    slug: "oem-private-label-parasols-buyers-project-brief",
    title: "OEM and Private-Label Parasols: A Buyer’s Project Brief",
    seoTitle: "OEM & Private-Label Parasols: Buyer's Project Brief",
    description:
      "A technical procurement guide for hospitality brands and distributors preparing an OEM or private-label parasol development brief.",
    publishedDate: "2026-09-03",
    modifiedDate: "2026-09-03",
    author: {
      name: "Harley Do",
    },
    category: "OEM & Manufacturing",
    readingTime: "6 min read",
    summary:
      "A structured OEM or private-label parasol brief records desired appearance, site context, evidence requests, prototype samples, packaging expectations, review milestones, and approval owners. Defining these parameters upfront helps buyers and manufacturing teams align on expectations without prescribing rigid specifications before technical consultation.",
    keyTakeaways: [
      "Record project scope and context: outline desired appearance, intended exterior application, target milestones, and shipping destinations at project kickoff.",
      "Identify development approach: determine whether the project seeks to brand an existing chassis, adapt standard options, or pursue custom tooling.",
      "Request supporting evidence and documentation: ask manufacturers for finish documentation, textile performance data, and assembly details suitable for the intended site.",
      "Establish milestones and approval ownership: define prototype sample reviews, packaging protection expectations, and explicit signoff responsibilities before production authorization.",
    ],
    sections: [
      {
        id: "brief-importance",
        heading: "The Role of a Structured Project Brief",
        paragraphs: [
          "For hotel groups, outdoor furniture brands, and commercial FF&E distributors, developing parasols under OEM (Original Equipment Manufacturer) or private-label programs requires clear technical alignment. Because commercial parasols endure sun exposure, humidity, wind gusts, and daily handling, ambiguous requirements can lead to mismatched expectations.",
          "A comprehensive project brief establishes a shared technical foundation between the buyer's product team and the manufacturing engineering group, outlining design boundaries, material preferences, and quality verification steps before production begins.",
        ],
        diagram: {
          type: "oem-workflow",
          caption: "Illustrative four-phase development lifecycle from project brief through to production release.",
        },
      },
      {
        id: "development-models",
        heading: "Selecting the Development Model: Private-Label vs Custom Tooling",
        paragraphs: [
          "Early in brief preparation, buyers decide whether their program involves private-labeling an existing chassis, adapting a standard platform, or investing in bespoke tooling.",
        ],
        table: {
          caption: "Comparison of Commercial Parasol Development Approaches",
          headers: ["Project Parameter", "Private-Label Approach", "Modified Platform Approach", "Custom Tooling Program"],
          rows: [
            ["Design Foundation", "Existing manufacturer chassis", "Standard chassis with customized aesthetic elements", "Proprietary design and unique tooling"],
            ["Tooling Scope", "Uses established tooling", "Minor tooling or component adjustments", "Requires dedicated tooling investment"],
            ["Development Considerations", "Focused on branding and finish selection", "Requires prototype review of modified components", "Involves full prototyping and mechanical validation"],
            ["Assortment Focus", "Defined product lines", "Tailored options for specific project palettes", "Bespoke collection development"],
            ["Branding & Appearance", "Brand tags, selected finishes, custom packaging", "Custom colorways, tailored trims, distinctive details", "Unique geometry, bespoke hardware, proprietary details"],
            ["Project Context", "Properties needing established designs", "Hospitality projects with specific aesthetic requirements", "Brands developing signature proprietary products"],
          ],
        },
      },
      {
        id: "core-brief-components",
        heading: "Core Components of a Technical Parasol Brief",
        paragraphs: [
          "A clear project brief organizes requirements into practical operational categories:",
          "1. Desired Appearance and Aesthetic Direction: Color palettes, frame profile aesthetics, valance and trim styles, and branding placements.",
          "2. Site Context and Environmental Conditions: Intended exterior setting, such as coastal exposure, high humidity, desert UV levels, or rooftop conditions.",
          "3. Evidence Requests and Technical Documentation: Requesting test documentation, fabric care data, and technical assembly drawings from the manufacturer.",
          "4. Operational Mechanisms and Controls: Reviewing lift methods, rotation locks, and tilt functionality appropriate for the intended user group.",
          "5. Prototype Samples and Material Swatches: Establishing milestone dates for reviewing physical finish swatches, fabric samples, and functional golden samples.",
          "6. Packaging, Labeling, and Transit Protection: Documenting carton requirements, protective padding, labeling standards, and assembly guide inclusions.",
        ],
      },
      {
        id: "inspection-and-quality",
        heading: "Review Milestones and Approval Ownership",
        paragraphs: [
          "A thorough brief outlines verification milestones throughout the development cycle to ensure consistency between approved prototypes and production units.",
          "Assigning clear ownership for approving finish samples, functional prototypes, and pre-shipment inspections ensures both the buyer and manufacturer share accountability at each project stage.",
        ],
      },
      {
        id: "brief-checklist",
        heading: "Buyer Brief Preparation Checklist",
        paragraphs: [
          "Use this checklist to confirm that key requirements are defined before submitting a technical brief for manufacturer review.",
        ],
        checklist: {
          title: "Technical Brief Verification Steps",
          items: [
            {
              title: "1. Outline Commercial Requirements",
              desc: "Record required delivery dates, batch sizes, container shipping considerations, and destination port details.",
            },
            {
              title: "2. Document Site and Exposure Context",
              desc: "Note environmental factors such as coastal salt spray, intense UV exposure, or high-humidity resort conditions.",
            },
            {
              title: "3. Define Finish and Aesthetic Preferences",
              desc: "Provide color references for powder-coating and note desired canopy appearance and trims.",
            },
            {
              title: "4. Confirm Clearance and Dimension Constraints",
              desc: "Identify table clearance needs, maximum canopy spans, and closed mast height parameters.",
            },
            {
              title: "5. Establish Milestones and Approval Owners",
              desc: "Define prototype approval criteria, packaging protection requirements, and signoff ownership.",
            },
          ],
        },
      },
    ],
    faqs: [
      {
        question: "What canopy information belongs in a parasol project brief?",
        answer:
          "A brief should document the desired fabric color or weave appearance, dimensional span, shape requirements, valance or trim preferences, and request manufacturer performance documentation regarding lightfastness and weather resistance for outdoor use.",
      },
      {
        question: "How should a buyer describe a coastal site in a brief?",
        answer:
          "Buyers should describe proximity to salt spray, typical breeze exposure, high humidity, intense sun hours, and any rooftop or elevated deck conditions so the manufacturer can suggest appropriate materials and hardware for evaluation.",
      },
      {
        question: "What is the difference between private-label and OEM project approaches?",
        answer:
          "Private-label projects apply buyer branding, colorways, and packaging to an existing chassis design. OEM programs involve custom profiles, proprietary brackets, or unique structural geometry engineered for the buyer.",
      },
      {
        question: "Why should packaging and transit requirements be outlined in the brief?",
        answer:
          "Parasol components and masts are long items subject to freight handling. Recording packaging expectations, internal cushioning, carton labeling, and handling instructions in the brief helps prevent damage during transit.",
      },
    ],
    sources: [],
    relatedSlugs: [
      "center-pole-vs-cantilever-parasols-hospitality",
      "how-to-plan-parasol-layouts-resort-pool-decks-dining",
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return blogArticles.map((article) => article.slug);
}
