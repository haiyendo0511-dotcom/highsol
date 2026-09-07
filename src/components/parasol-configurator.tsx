"use client";

import {
  ArrowCounterClockwise,
  ArrowUpRight,
  Check,
  Info,
  Ruler,
  WarningCircle,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { ContactForm, type InquiryConfiguration } from "@/components/contact-form";
import {
  type ComfortOptionKey,
  type ConfigOption,
  type ConfigOptionGroup,
  type ConfigVisual,
  type ParasolConfiguration,
  comfortOptions,
  createDefaultConfiguration,
  defaultModelId,
  getConfigurationSummary,
  getEngineeringReasons,
  getModel,
  getOption,
  getPreviewAsset,
  isOptionCompatible,
  optionGroups,
  parasolModels,
  reconcileConfiguration,
} from "@/content/configurator";
import { trackEvent } from "@/lib/analytics";

const groupMeta: Array<{
  group: ConfigOptionGroup;
  title: string;
  description: string;
  swatches?: boolean;
}> = [
  { group: "fabric", title: "Fabric", description: "Choose the commercial fabric direction. Final supplier evidence is confirmed with the project." },
  { group: "canopyColor", title: "Canopy colour", description: "Select a standard direction or request a project-matched colour.", swatches: true },
  { group: "edge", title: "Canopy edge", description: "Tailor the perimeter profile while keeping structural compatibility visible." },
  { group: "frameFinish", title: "Frame finish", description: "Coordinate the mast and frame with the surrounding architecture.", swatches: true },
  { group: "mounting", title: "Mounting", description: "Choose the intended mounting route. Site and exposure checks remain part of project review." },
  { group: "lighting", title: "Lighting", description: "Add an integrated lighting direction for evening hospitality settings." },
  { group: "branding", title: "Branding", description: "Keep the product unbranded or prepare a controlled identity treatment." },
];

export function ParasolConfigurator() {
  const [configuration, setConfiguration] = useState<ParasolConfiguration>(() => createDefaultConfiguration());
  const [announcement, setAnnouncement] = useState("");
  const reviewRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const engineeringTrackedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const requestedModel = new URLSearchParams(window.location.search).get("model");
    if (requestedModel && parasolModels.some((model) => model.id === requestedModel)) {
      const timer = window.setTimeout(() => {
        setConfiguration(createDefaultConfiguration(requestedModel));
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const model = getModel(configuration.modelId);
  const summary = useMemo(() => getConfigurationSummary(configuration), [configuration]);
  const preview = useMemo(() => getPreviewAsset(configuration), [configuration]);
  const engineeringReasons = useMemo(() => getEngineeringReasons(configuration), [configuration]);

  useEffect(() => {
    if (engineeringReasons.length > 0 && !engineeringTrackedRef.current) {
      engineeringTrackedRef.current = true;
      trackEvent({ action: "parasol_configurator_engineering_gate", category: "configurator", label: model.family });
    }
    if (engineeringReasons.length === 0) engineeringTrackedRef.current = false;
  }, [engineeringReasons.length, model.family]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent({ action: "parasol_configurator_started", category: "configurator", label: configuration.modelId });
  };

  const selectModel = (modelId: string) => {
    markStarted();
    const next = reconcileConfiguration(configuration, modelId);
    const changed = groupMeta
      .map(({ group }) => group)
      .filter((group) => configuration[group] !== next[group]);
    setConfiguration(next);
    setAnnouncement(changed.length ? `Incompatible choices were reset for ${getModel(modelId).name}.` : `${getModel(modelId).name} selected.`);
    trackEvent({ action: "parasol_configurator_model_changed", category: "configurator", label: modelId });
  };

  const selectOption = (group: ConfigOptionGroup, option: ConfigOption) => {
    if (!isOptionCompatible(option, model.family, model.id)) return;
    markStarted();
    setConfiguration((current) => ({ ...current, [group]: option.id }));
    setAnnouncement(`${option.label} selected for ${groupMeta.find((item) => item.group === group)?.title.toLowerCase()}.`);
    trackEvent({ action: "parasol_configurator_option_selected", category: group, label: option.id });
  };

  const updateBoolean = (key: ComfortOptionKey, value: boolean) => {
    markStarted();
    setConfiguration((current) => ({ ...current, [key]: value }));
    trackEvent({ action: "parasol_configurator_option_selected", category: "accessory", label: `${key}:${value ? "yes" : "no"}` });
  };

  const reset = () => {
    setConfiguration(createDefaultConfiguration(defaultModelId));
    setAnnouncement("Configuration reset to the default center-pole model.");
    startedRef.current = false;
  };

  const openReview = () => {
    trackEvent({ action: "parasol_configurator_review", category: "configurator", label: summary.code });
    reviewRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    reviewRef.current?.focus({ preventScroll: true });
  };

  const inquiryConfiguration = useMemo<InquiryConfiguration>(() => {
    const fields = {
      configurationCode: summary.code,
      baseModel: model.id,
      productFamily: model.familyLabel,
      nominalSize: model.nominalSize,
      configuredQuantity: String(configuration.quantity),
      fabric: getOption("fabric", configuration.fabric).label,
      canopyColour: getOption("canopyColor", configuration.canopyColor).label,
      canopyEdge: getOption("edge", configuration.edge).label,
      frameFinish: getOption("frameFinish", configuration.frameFinish).label,
      mounting: getOption("mounting", configuration.mounting).label,
      lighting: getOption("lighting", configuration.lighting).label,
      heaterProvision: configuration.heater ? "Yes" : "No",
      rainGutter: configuration.rainGutter ? "Yes" : "No",
      branding: getOption("branding", configuration.branding).label,
      protectiveCover: configuration.protectiveCover ? "Yes" : "No",
      spareCanopyKit: configuration.spareCanopyKit ? "Yes" : "No",
      customDimensions: configuration.customDimensions ? "Yes" : "No",
      engineeringReview: engineeringReasons.length ? `Required: ${engineeringReasons.join(", ")}` : "Standard project review",
      sourcePage: "/customize",
    };
    const summaryText = [
      `${model.name} (${model.id})`,
      `${model.nominalSize}; quantity ${configuration.quantity}`,
      ...summary.groups.map((group) => `${group.title}: ${group.items.join(", ")}`),
      engineeringReasons.length ? `Engineering review: ${engineeringReasons.join(", ")}` : "Engineering review: standard project review",
    ].join("\n");
    return { code: summary.code, summary: summaryText, fields };
  }, [configuration, engineeringReasons, model, summary]);

  return (
    <>
      <section className="customizer-workspace section-shell" aria-labelledby="configuration-options">
        <aside className="customizer-preview" aria-label="Product preview and current configuration">
          <div className="customizer-preview-stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="customizer-preview-image"
                key={preview.src}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src={preview.src} alt={preview.alt} fill preload sizes="(max-width: 767px) 100vw, 48vw" />
              </motion.div>
            </AnimatePresence>
            <div className="customizer-preview-swatches" aria-label="Selected visible finishes">
              <span
                className="customizer-preview-swatch"
                style={{ "--swatch": getOption("canopyColor", configuration.canopyColor).swatch } as CSSProperties}
              />
              <span
                className="customizer-preview-swatch"
                style={{ "--swatch": getOption("frameFinish", configuration.frameFinish).swatch } as CSSProperties}
              />
            </div>
          </div>
          <div className="customizer-preview-copy">
            <div>
              <span>{model.familyLabel}</span>
              <h2>{model.name}</h2>
              <p>{model.application}</p>
            </div>
            <dl className="customizer-quick-specs">
              <div><dt>Shape</dt><dd>{model.shape}</dd></div>
              <div><dt>Nominal size</dt><dd>{model.nominalSize}</dd></div>
              <div><dt>Opening</dt><dd>{model.opening}</dd></div>
            </dl>
            <div className="customizer-preview-note" aria-live="polite">
              <Info size={18} weight="bold" aria-hidden="true" />
              <p>{preview.isExact ? `${preview.viewLabel}. Final product details remain subject to project confirmation.` : "The selected canopy colour, frame finish or edge treatment is represented by the closest model-specific product view."}</p>
            </div>
            <div className="customizer-code-block">
              <span>Configuration code</span>
              <strong>{summary.code}</strong>
            </div>
            {engineeringReasons.length > 0 && (
              <div className="customizer-engineering-note">
                <WarningCircle size={21} weight="bold" aria-hidden="true" />
                <div><strong>Engineering review required</strong><p>{engineeringReasons.join(", ")}</p></div>
              </div>
            )}
            <div className="customizer-preview-actions">
              <button className="button button-primary" type="button" onClick={openReview}>
                Request project review <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </button>
              <button className="customizer-reset" type="button" onClick={reset}>
                <ArrowCounterClockwise size={17} weight="bold" aria-hidden="true" /> Reset
              </button>
            </div>
          </div>
        </aside>

        <div className="customizer-controls">
          <div className="customizer-controls-heading">
            <Ruler size={28} weight="light" aria-hidden="true" />
            <h2 id="configuration-options">Build your specification</h2>
            <p>Choose the commercial direction. Highsol confirms engineering, materials, evidence and final availability against the project brief.</p>
          </div>

          <details className="customizer-group" open>
            <summary><span>Base platform</span><small>{model.id}</small></summary>
            <div className="customizer-group-body">
              <fieldset>
                <legend>Model, shape and size</legend>
                <div className="customizer-model-grid">
                  {parasolModels.map((item) => (
                    <label className="customizer-model-option" key={item.id}>
                      <input type="radio" name="model" value={item.id} checked={configuration.modelId === item.id} onChange={() => selectModel(item.id)} />
                      <span className="customizer-card-media">
                        <Image src={item.cardVisual.src} alt={item.cardVisual.alt} fill sizes="(max-width: 767px) 100vw, 260px" />
                        <span className="customizer-option-check"><Check size={14} weight="bold" aria-hidden="true" /></span>
                      </span>
                      <span className="customizer-choice-copy">
                        <strong>{item.name}</strong>
                        <small>{item.nominalSize} | {item.offerType}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="customizer-quantity">
                <span>Estimated quantity</span>
                <input
                  type="number"
                  min={1}
                  max={10000}
                  inputMode="numeric"
                  value={configuration.quantity}
                  onChange={(event) => {
                    markStarted();
                    setConfiguration((current) => ({ ...current, quantity: Math.max(1, Number(event.target.value) || 1) }));
                  }}
                />
                <small>Used for project planning only. No price is calculated.</small>
              </label>
            </div>
          </details>

          {groupMeta.map((meta) => (
            <details className="customizer-group" key={meta.group} open={meta.group === "fabric" || meta.group === "canopyColor"}>
              <summary><span>{meta.title}</span><small>{getOption(meta.group, configuration[meta.group]).label}</small></summary>
              <div className="customizer-group-body">
                <p className="customizer-group-description">{meta.description}</p>
                <OptionPicker
                  group={meta.group}
                  family={model.family}
                  modelId={model.id}
                  value={configuration[meta.group]}
                  swatches={meta.swatches}
                  onSelect={(option) => selectOption(meta.group, option)}
                />
              </div>
            </details>
          ))}

          <details className="customizer-group" open>
            <summary><span>Comfort and service</span><small>Project options</small></summary>
            <div className="customizer-group-body customizer-toggle-grid">
              {comfortOptions.map((option) => {
                const disabled =
                  (option.key === "rainGutter" && model.family === "CP") ||
                  ((option.key === "protectiveCover" || option.key === "spareCanopyKit") && model.family === "LF");
                return (
                  <ToggleOption
                    key={option.key}
                    label={option.label}
                    description={option.description}
                    visual={option.visual}
                    checked={configuration[option.key]}
                    disabled={disabled}
                    onChange={(value) => updateBoolean(option.key, value)}
                  />
                );
              })}
            </div>
          </details>
        </div>
        <p className="sr-only" aria-live="polite">{announcement}</p>
      </section>

      <section className="customizer-review section-shell" ref={reviewRef} tabIndex={-1} aria-labelledby="customizer-review-title">
        <div className="customizer-review-heading">
          <h2 id="customizer-review-title">Review the project direction</h2>
          <p>This summary records your selections. It is not a production approval, quotation or performance statement.</p>
        </div>
        <div className="customizer-summary-grid">
          {summary.groups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="customizer-review-code">
          <span>Reference this configuration</span>
          <strong>{summary.code}</strong>
        </div>
      </section>

      <section id="customizer-inquiry" className="customizer-inquiry section-shell" aria-labelledby="customizer-inquiry-title">
        <div className="customizer-inquiry-heading">
          <h2 id="customizer-inquiry-title">Send the configuration to Highsol.</h2>
          <p>Add the buyer and project context. The selected configuration is included automatically.</p>
        </div>
        <ContactForm
          key={summary.code}
          configuration={inquiryConfiguration}
          onSuccess={() => trackEvent({ action: "parasol_configurator_rfq_submitted", category: "configurator", label: model.family })}
          onError={() => trackEvent({ action: "parasol_configurator_rfq_error", category: "configurator", label: model.family })}
        />
      </section>
    </>
  );
}

function OptionPicker({
  group,
  family,
  modelId,
  value,
  swatches,
  onSelect,
}: {
  group: ConfigOptionGroup;
  family: "CP" | "CL" | "LF";
  modelId: string;
  value: string;
  swatches?: boolean;
  onSelect: (option: ConfigOption) => void;
}) {
  return (
    <fieldset>
      <legend>{groupMeta.find((item) => item.group === group)?.title}</legend>
      <div className={swatches ? "customizer-option-grid has-swatches" : "customizer-option-grid"}>
        {optionGroups[group]
          .filter((option) => !option.appliesToModels || option.appliesToModels.includes(modelId))
          .map((option) => {
            const compatible = isOptionCompatible(option, family, modelId);
            return (
              <label className="customizer-choice" key={option.id} data-disabled={!compatible || undefined}>
                <input
                  type="radio"
                  name={group}
                  value={option.id}
                  checked={value === option.id}
                  disabled={!compatible}
                  onChange={() => onSelect(option)}
                />
                <span className="customizer-card-media">
                  <Image src={option.visual.src} alt={option.visual.alt} fill sizes="(max-width: 767px) 100vw, 260px" />
                  {swatches && (
                    <span className="customizer-choice-swatch" style={{ "--swatch": option.swatch } as CSSProperties} aria-hidden="true" />
                  )}
                  <span className="customizer-option-check"><Check size={14} weight="bold" aria-hidden="true" /></span>
                </span>
                <span className="customizer-choice-copy">
                  <strong>{option.label}</strong>
                  <small>{compatible ? option.classification : `Not available for ${familyLabel(family)}`}</small>
                </span>
              </label>
            );
          })}
      </div>
      {getOption(group, value).note && <p className="customizer-selection-note"><Info size={16} weight="bold" aria-hidden="true" /> {getOption(group, value).note}</p>}
    </fieldset>
  );
}

function ToggleOption({
  label,
  description,
  visual,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  visual: ConfigVisual;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="customizer-toggle" data-disabled={disabled || undefined}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} />
      <span className="customizer-card-media">
        <Image src={visual.src} alt={visual.alt} fill sizes="(max-width: 767px) 100vw, 260px" />
        <span className="customizer-toggle-control"><Check size={14} weight="bold" aria-hidden="true" /></span>
      </span>
      <span className="customizer-choice-copy"><strong>{label}</strong><small>{disabled ? "Not available for this family." : description}</small></span>
    </label>
  );
}

function familyLabel(family: "CP" | "CL" | "LF") {
  if (family === "CP") return "center pole";
  if (family === "CL") return "cantilever";
  return "large format";
}
