export type ParasolFamily = "CP" | "CL" | "LF";

export type ConfigOptionGroup =
  | "fabric"
  | "canopyColor"
  | "edge"
  | "frameFinish"
  | "mounting"
  | "lighting"
  | "branding";

export type ConfigVisual = {
  src: string;
  alt: string;
};

export type ConfigOption = {
  id: string;
  label: string;
  code: string;
  appliesTo: ParasolFamily[];
  classification: "Standard" | "Premium" | "Decorative" | "Project" | "Custom" | "Engineered";
  visual: ConfigVisual;
  note?: string;
  swatch?: string;
  requiresApproval?: boolean;
  requiresEngineering?: boolean;
};

export type ParasolModel = {
  id: string;
  name: string;
  family: ParasolFamily;
  familyLabel: string;
  format: string;
  shape: string;
  nominalSize: string;
  opening: string;
  offerType: string;
  application: string;
  preview: {
    src: string;
    alt: string;
    viewLabel: string;
  };
  cardVisual: ConfigVisual;
  defaults: Pick<
    ParasolConfiguration,
    "fabric" | "canopyColor" | "edge" | "frameFinish" | "mounting" | "lighting" | "branding"
  >;
};

export type ParasolConfiguration = {
  modelId: string;
  quantity: number;
  fabric: string;
  canopyColor: string;
  edge: string;
  frameFinish: string;
  mounting: string;
  lighting: string;
  branding: string;
  heater: boolean;
  rainGutter: boolean;
  protectiveCover: boolean;
  spareCanopyKit: boolean;
  customDimensions: boolean;
};

export type PreviewAsset = {
  src: string;
  alt: string;
  viewLabel: string;
  isExact: boolean;
};

export type ComfortOptionKey =
  | "heater"
  | "rainGutter"
  | "protectiveCover"
  | "spareCanopyKit"
  | "customDimensions";

export type ComfortOption = {
  key: ComfortOptionKey;
  label: string;
  description: string;
  visual: ConfigVisual;
};

const allFamilies: ParasolFamily[] = ["CP", "CL", "LF"];

const optionVisual = (group: string, id: string, alt: string): ConfigVisual => ({
  src: `/images/configurator/cards/${group}/${id}.webp`,
  alt,
});

export const comfortOptions: ComfortOption[] = [
  { key: "heater", label: "Heater provision", description: "Requires electrical and engineering review.", visual: optionVisual("accessories", "heater", "Compact radiant heater mounted beneath a hospitality parasol") },
  { key: "rainGutter", label: "Rain gutter", description: "Available for cantilever and large-format projects.", visual: optionVisual("accessories", "rain-gutter", "Integrated rain gutter detail between adjoining parasol canopies") },
  { key: "protectiveCover", label: "Protective cover", description: "A size-specific storage cover direction.", visual: optionVisual("accessories", "protective-cover", "Tailored protective cover for a closed hospitality parasol") },
  { key: "spareCanopyKit", label: "Spare canopy kit", description: "Supports planned maintenance and replacement.", visual: optionVisual("accessories", "spare-canopy-kit", "Folded replacement canopy kit with installation hardware") },
  { key: "customDimensions", label: "Custom dimensions", description: "Moves the product into project engineering review.", visual: optionVisual("accessories", "custom-dimensions", "Parasol component with dimensional tools for custom sizing") },
];

export const optionGroups: Record<ConfigOptionGroup, ConfigOption[]> = {
  fabric: [
    { id: "contract-outdoor", label: "Contract outdoor fabric", code: "COF", appliesTo: ["CP", "CL"], classification: "Standard", visual: optionVisual("fabric", "contract-outdoor", "Woven contract outdoor fabric in a warm neutral tone"), note: "Final composition and test data to be confirmed." },
    { id: "solution-acrylic", label: "Solution-dyed acrylic", code: "SDA", appliesTo: ["CP", "CL"], classification: "Premium", visual: optionVisual("fabric", "solution-acrylic", "Dense solution-dyed acrylic outdoor fabric close-up"), requiresApproval: true, note: "Supplier and test evidence required." },
    { id: "solution-polyester", label: "Solution-dyed polyester", code: "SDP", appliesTo: ["CP", "CL"], classification: "Standard", visual: optionVisual("fabric", "solution-polyester", "Solution-dyed polyester canopy fabric with a refined weave"), requiresApproval: true, note: "Supplier and test evidence required." },
    { id: "pvc-membrane", label: "PVC-coated membrane", code: "PVC", appliesTo: ["LF"], classification: "Project", visual: optionVisual("fabric", "pvc-membrane", "Smooth architectural PVC-coated membrane material"), requiresApproval: true, requiresEngineering: true, note: "Engineering and fire evidence may be required." },
    { id: "customer-fabric", label: "Customer-nominated fabric", code: "CNF", appliesTo: allFamilies, classification: "Custom", visual: optionVisual("fabric", "customer-fabric", "Curated stack of customer-nominated outdoor fabric samples"), requiresApproval: true, requiresEngineering: true, note: "Compatibility approval required." },
  ],
  canopyColor: [
    { id: "warm-ivory", label: "Warm ivory", code: "IV", appliesTo: allFamilies, classification: "Standard", visual: optionVisual("canopy-color", "warm-ivory", "Warm ivory outdoor fabric swatch"), swatch: "#e9e0cf", note: "Physical swatch approval." },
    { id: "sand", label: "Sand", code: "SD", appliesTo: allFamilies, classification: "Standard", visual: optionVisual("canopy-color", "sand", "Sand-coloured outdoor fabric swatch"), swatch: "#c9b18a", note: "Physical swatch approval." },
    { id: "taupe", label: "Taupe", code: "TP", appliesTo: allFamilies, classification: "Standard", visual: optionVisual("canopy-color", "taupe", "Taupe outdoor fabric swatch"), swatch: "#9f8e78", note: "Physical swatch approval." },
    { id: "forest-green", label: "Forest green", code: "FG", appliesTo: allFamilies, classification: "Premium", visual: optionVisual("canopy-color", "forest-green", "Forest green outdoor fabric swatch"), swatch: "#314f43", requiresApproval: true, note: "Physical swatch approval." },
    { id: "project-custom", label: "Project custom colour", code: "PC", appliesTo: allFamilies, classification: "Custom", visual: optionVisual("canopy-color", "project-custom", "Fan of custom project colour fabric samples"), swatch: "linear-gradient(135deg, #d6b875 0 33%, #2a706a 33% 66%, #875d4c 66%)", requiresApproval: true, note: "Colour tolerance must be agreed." },
  ],
  edge: [
    { id: "straight", label: "Straight edge", code: "ST", appliesTo: allFamilies, classification: "Standard", visual: optionVisual("edge", "straight", "Clean straight parasol canopy edge detail") },
    { id: "scalloped", label: "Scalloped edge", code: "SC", appliesTo: ["CP"], classification: "Decorative", visual: optionVisual("edge", "scalloped", "Decorative scalloped parasol canopy edge detail"), requiresApproval: true, note: "Template approval required." },
    { id: "straight-valance", label: "Straight valance", code: "SV", appliesTo: ["CP", "CL"], classification: "Decorative", visual: optionVisual("edge", "straight-valance", "Straight hanging valance on a parasol canopy"), requiresApproval: true, requiresEngineering: true, note: "Wind behaviour requires review." },
    { id: "contrast-binding", label: "Contrast binding", code: "CB", appliesTo: ["CP", "CL"], classification: "Decorative", visual: optionVisual("edge", "contrast-binding", "Canopy edge finished with contrasting binding"), requiresApproval: true, note: "Colour and seam sample required." },
    { id: "custom-profile", label: "Custom canopy profile", code: "CPR", appliesTo: allFamilies, classification: "Custom", visual: optionVisual("edge", "custom-profile", "Tailored wave-profile parasol canopy edge"), requiresApproval: true, requiresEngineering: true, note: "Prototype required." },
  ],
  frameFinish: [
    { id: "dark-bronze", label: "Dark bronze powder coat", code: "DB", appliesTo: allFamilies, classification: "Standard", visual: optionVisual("frame-finish", "dark-bronze", "Dark bronze powder-coated parasol frame junction"), swatch: "#3f312b", requiresApproval: true, note: "Finish chip approval." },
    { id: "charcoal", label: "Charcoal powder coat", code: "CH", appliesTo: allFamilies, classification: "Standard", visual: optionVisual("frame-finish", "charcoal", "Charcoal powder-coated parasol frame junction"), swatch: "#424746", requiresApproval: true, note: "Finish chip approval." },
    { id: "warm-white", label: "Warm white powder coat", code: "WW", appliesTo: allFamilies, classification: "Premium", visual: optionVisual("frame-finish", "warm-white", "Warm white powder-coated parasol frame junction"), swatch: "#e7e2d6", requiresApproval: true, note: "Finish chip approval." },
    { id: "satin-anodized", label: "Satin anodized aluminium", code: "SA", appliesTo: ["CP", "CL"], classification: "Premium", visual: optionVisual("frame-finish", "satin-anodized", "Satin anodized aluminium parasol frame junction"), swatch: "#aeb5b2", requiresApproval: true, note: "Alloy and anodizing specification to be confirmed." },
    { id: "timber-look", label: "Timber-look finish", code: "TL", appliesTo: ["CP", "CL"], classification: "Decorative", visual: optionVisual("frame-finish", "timber-look", "Timber-look finish on an aluminium parasol frame"), swatch: "#7b5a3a", requiresApproval: true, note: "Approved sample required." },
    { id: "project-ral", label: "Project RAL finish", code: "RAL", appliesTo: allFamilies, classification: "Custom", visual: optionVisual("frame-finish", "project-ral", "Custom powder-coat colour samples beside a parasol frame"), swatch: "linear-gradient(135deg, #7b8790 0 50%, #876151 50%)", requiresApproval: true, note: "Colour tolerance must be agreed." },
  ],
  mounting: [
    { id: "weighted-base", label: "Weighted freestanding base", code: "WB", appliesTo: ["CP", "CL"], classification: "Standard", visual: optionVisual("mounting", "weighted-base", "Low-profile weighted freestanding parasol base"), requiresApproval: true, note: "Base mass must match the confirmed configuration." },
    { id: "mobile-base", label: "Mobile weighted base", code: "MB", appliesTo: ["CP", "CL"], classification: "Premium", visual: optionVisual("mounting", "mobile-base", "Mobile weighted parasol base with locking castors"), requiresApproval: true, note: "Movement and locking controls require project confirmation." },
    { id: "deck-plate", label: "Deck plate", code: "DP", appliesTo: allFamilies, classification: "Project", visual: optionVisual("mounting", "deck-plate", "Bolted parasol deck plate and anchor detail"), requiresEngineering: true, note: "Substrate and anchors must be verified." },
    { id: "in-ground-sleeve", label: "In-ground sleeve", code: "IS", appliesTo: allFamilies, classification: "Project", visual: optionVisual("mounting", "in-ground-sleeve", "Stainless-steel in-ground sleeve for a parasol mast"), requiresEngineering: true, note: "Foundation detail required." },
    { id: "engineered-footing", label: "Engineered footing", code: "EF", appliesTo: ["CL", "LF"], classification: "Engineered", visual: optionVisual("mounting", "engineered-footing", "Engineered footing assembly with anchor cage and base plate"), requiresEngineering: true, note: "Site and exposure inputs are mandatory." },
  ],
  lighting: [
    { id: "no-lighting", label: "No integrated lighting", code: "N0", appliesTo: allFamilies, classification: "Standard", visual: optionVisual("lighting", "no-lighting", "Clean parasol underside without integrated lighting") },
    { id: "warm-led", label: "Warm-white LED", code: "LED", appliesTo: allFamilies, classification: "Project", visual: optionVisual("lighting", "warm-led", "Warm-white LED strips integrated beneath a parasol canopy"), requiresApproval: true, requiresEngineering: true, note: "Electrical specification and IP rating must be verified." },
  ],
  branding: [
    { id: "no-branding", label: "No visible branding", code: "B0", appliesTo: allFamilies, classification: "Standard", visual: optionVisual("branding", "no-branding", "Unbranded warm ivory parasol canopy panel") },
    { id: "printed-logo", label: "Printed logo", code: "PL", appliesTo: ["CP", "CL"], classification: "Custom", visual: optionVisual("branding", "printed-logo", "Generic printed identity mark on a parasol canopy"), requiresApproval: true, note: "Artwork and print proof required." },
    { id: "embroidered-logo", label: "Embroidered logo", code: "EL", appliesTo: ["CP", "CL"], classification: "Custom", visual: optionVisual("branding", "embroidered-logo", "Generic embroidered identity mark on outdoor fabric"), requiresApproval: true, note: "Stitch sample required." },
    { id: "woven-label", label: "Woven identity label", code: "WL", appliesTo: allFamilies, classification: "Custom", visual: optionVisual("branding", "woven-label", "Blank woven identity label stitched into canopy fabric"), requiresApproval: true, note: "Artwork approval required." },
    { id: "branded-finial", label: "Branded finial", code: "BF", appliesTo: ["CP", "CL"], classification: "Custom", visual: optionVisual("branding", "branded-finial", "Custom embossed metal finial for a hospitality parasol"), requiresApproval: true, requiresEngineering: true, note: "Prototype required." },
  ],
};

export const parasolModels: ParasolModel[] = [
  {
    id: "HS-CP-25SQ",
    name: "Center Pole Classic 2.5 Square",
    family: "CP",
    familyLabel: "Center pole",
    format: "Classic contract",
    shape: "Square",
    nominalSize: "2.5 x 2.5 m",
    opening: "Push-up",
    offerType: "Standard",
    application: "Dining tables, compact pool decks and balconies",
    preview: { src: "/images/packshots/center-pole-classic/01-three-quarter.png", alt: "Representative straight-edge center-pole parasol in warm ivory and dark bronze", viewLabel: "Representative view" },
    cardVisual: optionVisual("models", "hs-cp-25sq", "Center Pole Classic 2.5 Square hospitality parasol"),
    defaults: { fabric: "solution-acrylic", canopyColor: "warm-ivory", edge: "straight", frameFinish: "dark-bronze", mounting: "weighted-base", lighting: "no-lighting", branding: "no-branding" },
  },
  {
    id: "HS-CP-30SQ",
    name: "Center Pole Classic 3.0 Square",
    family: "CP",
    familyLabel: "Center pole",
    format: "Classic contract",
    shape: "Square",
    nominalSize: "3.0 x 3.0 m",
    opening: "Push-up or pulley",
    offerType: "Standard",
    application: "Dining, pool decks and beach clubs",
    preview: { src: "/images/packshots/center-pole-classic/01-three-quarter.png", alt: "Representative straight-edge center-pole parasol in warm ivory and dark bronze", viewLabel: "Representative view" },
    cardVisual: optionVisual("models", "hs-cp-30sq", "Center Pole Classic 3.0 Square hospitality parasol"),
    defaults: { fabric: "solution-acrylic", canopyColor: "warm-ivory", edge: "straight", frameFinish: "dark-bronze", mounting: "weighted-base", lighting: "no-lighting", branding: "no-branding" },
  },
  {
    id: "HS-CP-30OC",
    name: "Center Pole Classic 3.0 Octagonal",
    family: "CP",
    familyLabel: "Center pole",
    format: "Classic contract",
    shape: "Octagonal",
    nominalSize: "3.0 m diameter",
    opening: "Push-up or pulley",
    offerType: "Standard",
    application: "Dining, pool decks and repeated resort programs",
    preview: { src: "/images/packshots/center-pole-classic/01-three-quarter.png", alt: "Representative center-pole parasol; selected octagonal shape is not shown exactly", viewLabel: "Representative view" },
    cardVisual: optionVisual("models", "hs-cp-30oc", "Center Pole Classic 3.0 Octagonal hospitality parasol"),
    defaults: { fabric: "solution-acrylic", canopyColor: "warm-ivory", edge: "straight", frameFinish: "dark-bronze", mounting: "weighted-base", lighting: "no-lighting", branding: "no-branding" },
  },
  {
    id: "HS-CP-35OC",
    name: "Center Pole Classic 3.5 Octagonal",
    family: "CP",
    familyLabel: "Center pole",
    format: "Classic contract",
    shape: "Octagonal",
    nominalSize: "3.5 m diameter",
    opening: "Pulley",
    offerType: "Standard",
    application: "Pool decks, beach clubs and lounge settings",
    preview: { src: "/images/packshots/center-pole-classic/01-three-quarter.png", alt: "Representative center-pole parasol; selected octagonal shape is not shown exactly", viewLabel: "Representative view" },
    cardVisual: optionVisual("models", "hs-cp-35oc", "Center Pole Classic 3.5 Octagonal hospitality parasol"),
    defaults: { fabric: "solution-acrylic", canopyColor: "warm-ivory", edge: "straight", frameFinish: "dark-bronze", mounting: "weighted-base", lighting: "no-lighting", branding: "no-branding" },
  },
  {
    id: "HS-CD-30SQ",
    name: "Center Pole Decorative 3.0 Square",
    family: "CP",
    familyLabel: "Center pole",
    format: "Decorative canopy",
    shape: "Square",
    nominalSize: "3.0 x 3.0 m",
    opening: "Push-up or pulley",
    offerType: "Project custom",
    application: "Boutique resorts, branded pool clubs and villas",
    preview: { src: "/images/packshots/scalloped-center-pole/01-three-quarter.jpg", alt: "Representative scalloped center-pole parasol in warm ivory and dark bronze", viewLabel: "Representative view" },
    cardVisual: optionVisual("models", "hs-cd-30sq", "Center Pole Decorative 3.0 Square scalloped parasol"),
    defaults: { fabric: "solution-acrylic", canopyColor: "warm-ivory", edge: "scalloped", frameFinish: "dark-bronze", mounting: "weighted-base", lighting: "no-lighting", branding: "no-branding" },
  },
  {
    id: "HS-CL-30SQ",
    name: "Cantilever Premium 3.0 Square",
    family: "CL",
    familyLabel: "Cantilever",
    format: "Single canopy",
    shape: "Square",
    nominalSize: "3.0 x 3.0 m",
    opening: "Crank assisted",
    offerType: "Standard",
    application: "Lounges, pool edges and outdoor dining",
    preview: { src: "/images/packshots/square-cantilever/01-three-quarter.jpg", alt: "Representative square cantilever parasol in taupe and dark bronze", viewLabel: "Representative view" },
    cardVisual: optionVisual("models", "hs-cl-30sq", "Cantilever Premium 3.0 Square hospitality parasol"),
    defaults: { fabric: "solution-acrylic", canopyColor: "taupe", edge: "straight", frameFinish: "dark-bronze", mounting: "weighted-base", lighting: "no-lighting", branding: "no-branding" },
  },
  {
    id: "HS-CL-35SQ",
    name: "Cantilever Premium 3.5 Square",
    family: "CL",
    familyLabel: "Cantilever",
    format: "Single canopy",
    shape: "Square",
    nominalSize: "3.5 x 3.5 m",
    opening: "Crank assisted",
    offerType: "Project custom",
    application: "Large lounges, terraces and hospitality dining",
    preview: { src: "/images/packshots/square-cantilever/01-three-quarter.jpg", alt: "Representative square cantilever parasol in taupe and dark bronze", viewLabel: "Representative view" },
    cardVisual: optionVisual("models", "hs-cl-35sq", "Cantilever Premium 3.5 Square hospitality parasol"),
    defaults: { fabric: "solution-acrylic", canopyColor: "taupe", edge: "straight", frameFinish: "dark-bronze", mounting: "engineered-footing", lighting: "no-lighting", branding: "no-branding" },
  },
  {
    id: "HS-LF-CUSTOM",
    name: "Large Format Project",
    family: "LF",
    familyLabel: "Large format",
    format: "Telescopic or multi-canopy",
    shape: "Project defined",
    nominalSize: "Custom",
    opening: "Project defined",
    offerType: "Engineered project",
    application: "Large terraces, resort programs and event areas",
    preview: { src: "/images/packshots/dual-canopy-cantilever/01-three-quarter.jpg", alt: "Representative dual-canopy large-format parasol system", viewLabel: "Representative project view" },
    cardVisual: optionVisual("models", "hs-lf-custom", "Representative large-format dual-canopy parasol system"),
    defaults: { fabric: "pvc-membrane", canopyColor: "warm-ivory", edge: "straight", frameFinish: "charcoal", mounting: "engineered-footing", lighting: "no-lighting", branding: "no-branding" },
  },
];

export const defaultModelId = "HS-CP-30SQ";

export function getModel(modelId: string) {
  return parasolModels.find((model) => model.id === modelId) ?? parasolModels.find((model) => model.id === defaultModelId)!;
}

export function getOption(group: ConfigOptionGroup, optionId: string) {
  return optionGroups[group].find((option) => option.id === optionId) ?? optionGroups[group][0];
}

export function isOptionCompatible(option: ConfigOption, family: ParasolFamily) {
  return option.appliesTo.includes(family);
}

export function createDefaultConfiguration(modelId = defaultModelId): ParasolConfiguration {
  const model = getModel(modelId);
  return {
    modelId: model.id,
    quantity: 20,
    ...model.defaults,
    heater: false,
    rainGutter: false,
    protectiveCover: model.family !== "LF",
    spareCanopyKit: model.family !== "LF",
    customDimensions: model.family === "LF",
  };
}

export function reconcileConfiguration(current: ParasolConfiguration, nextModelId: string): ParasolConfiguration {
  const model = getModel(nextModelId);
  const next = createDefaultConfiguration(model.id);
  const keys: ConfigOptionGroup[] = ["fabric", "canopyColor", "edge", "frameFinish", "mounting", "lighting", "branding"];
  for (const key of keys) {
    const selected = getOption(key, current[key]);
    if (isOptionCompatible(selected, model.family)) next[key] = current[key];
  }
  next.quantity = current.quantity;
  next.heater = current.heater;
  next.rainGutter = model.family === "CP" ? false : current.rainGutter;
  next.protectiveCover = model.family === "LF" ? false : current.protectiveCover;
  next.spareCanopyKit = model.family === "LF" ? false : current.spareCanopyKit;
  next.customDimensions = model.family === "LF" ? true : current.customDimensions;
  return next;
}

export function getEngineeringReasons(configuration: ParasolConfiguration) {
  const model = getModel(configuration.modelId);
  const reasons: string[] = [];
  if (model.family === "LF") reasons.push("Large-format project");
  for (const group of ["fabric", "edge", "mounting", "lighting", "branding"] as ConfigOptionGroup[]) {
    const option = getOption(group, configuration[group]);
    if (option.requiresEngineering) reasons.push(option.label);
  }
  if (configuration.heater) reasons.push("Heater provision");
  if (configuration.rainGutter) reasons.push("Rain gutter");
  if (configuration.customDimensions) reasons.push("Custom dimensions");
  return [...new Set(reasons)];
}

export function getConfigurationCode(configuration: ParasolConfiguration) {
  const codes = [
    getOption("fabric", configuration.fabric).code + getOption("canopyColor", configuration.canopyColor).code,
    getOption("edge", configuration.edge).code,
    getOption("frameFinish", configuration.frameFinish).code,
    getOption("mounting", configuration.mounting).code,
    getOption("branding", configuration.branding).code,
  ];
  if (configuration.lighting !== "no-lighting") codes.push(getOption("lighting", configuration.lighting).code);
  if (configuration.heater) codes.push("HTR");
  if (configuration.rainGutter) codes.push("RGT");
  if (configuration.protectiveCover) codes.push("CVR");
  if (configuration.spareCanopyKit) codes.push("SCK");
  if (configuration.customDimensions) codes.push("CUS");
  return [configuration.modelId, ...codes].join("-");
}

export function getPreviewAsset(configuration: ParasolConfiguration): PreviewAsset {
  const model = getModel(configuration.modelId);
  let preview = model.preview;
  let exactEdge = configuration.edge === model.defaults.edge;

  if (model.family === "CP" && configuration.edge === "scalloped") {
    preview = {
      src: "/images/packshots/scalloped-center-pole/01-three-quarter.jpg",
      alt: "Representative scalloped center-pole parasol in warm ivory and dark bronze",
      viewLabel: "Scalloped canopy view",
    };
    exactEdge = true;
  } else if (model.family === "CP" && configuration.edge === "straight") {
    preview = {
      src: "/images/packshots/center-pole-classic/01-three-quarter.png",
      alt: "Representative straight-edge center-pole parasol in warm ivory and dark bronze",
      viewLabel: "Straight canopy view",
    };
    exactEdge = true;
  }

  const visualDefaults =
    model.family === "CP"
      ? configuration.canopyColor === "warm-ivory" && configuration.frameFinish === "dark-bronze"
      : model.family === "CL"
        ? configuration.canopyColor === "taupe" && configuration.frameFinish === "dark-bronze"
        : configuration.canopyColor === "warm-ivory" && configuration.frameFinish === "charcoal";

  const exactShape = model.shape === "Square" || model.id === "HS-CD-30SQ" || model.family !== "CP";
  return { ...preview, isExact: visualDefaults && exactEdge && exactShape };
}

export function getConfigurationSummary(configuration: ParasolConfiguration) {
  const model = getModel(configuration.modelId);
  const engineeringReasons = getEngineeringReasons(configuration);
  return {
    code: getConfigurationCode(configuration),
    model,
    engineeringReasons,
    groups: [
      {
        title: "Canopy",
        items: [
          getOption("fabric", configuration.fabric).label,
          getOption("canopyColor", configuration.canopyColor).label,
          getOption("edge", configuration.edge).label,
        ],
      },
      {
        title: "Structure",
        items: [getOption("frameFinish", configuration.frameFinish).label, getOption("mounting", configuration.mounting).label],
      },
      {
        title: "Identity and comfort",
        items: [
          getOption("lighting", configuration.lighting).label,
          configuration.heater ? "Heater provision" : "No heater provision",
          configuration.rainGutter ? "Rain gutter" : "No rain gutter",
          getOption("branding", configuration.branding).label,
        ],
      },
      {
        title: "Service",
        items: [
          configuration.protectiveCover ? "Protective cover" : "No protective cover",
          configuration.spareCanopyKit ? "Spare canopy kit" : "No spare canopy kit",
          configuration.customDimensions ? "Custom dimensions requested" : "Standard nominal dimensions",
        ],
      },
    ],
  };
}
