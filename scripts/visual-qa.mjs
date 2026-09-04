import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = "http://localhost:3000";
const outputDir = "artifacts/live-redesign-qa";
const routes = [
  { name: "home", path: "/" },
  { name: "products", path: "/parasols" },
  { name: "customize", path: "/customize" },
  { name: "manufacturing", path: "/manufacturing-vietnam" },
  { name: "resources", path: "/resources" },
];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  for (const route of routes) {
    await page.goto(baseUrl + route.path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(900);
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      title: document.title,
      headerVisible: Boolean(document.querySelector(".site-header")),
      mainTarget: Boolean(document.querySelector("main#main-content")),
      currentPageLinks: document.querySelectorAll('.desktop-nav [aria-current="page"]').length,
    }));
    if (metrics.width > metrics.viewport + 1) {
      failures.push(route.name + " " + viewport.name + " has horizontal overflow: " + metrics.width + " > " + metrics.viewport);
    }
    if (!metrics.headerVisible) failures.push(route.name + " " + viewport.name + " is missing the site header");
    if (!metrics.mainTarget) failures.push(route.name + " " + viewport.name + " is missing the skip-navigation target");
    if (metrics.currentPageLinks !== 1) failures.push(route.name + " " + viewport.name + " has " + metrics.currentPageLinks + " current-page desktop links");

    if (viewport.name === "mobile") {
      await page.getByRole("button", { name: "Open navigation" }).click();
      const mobileState = await page.evaluate(() => ({
        open: document.querySelector(".mobile-menu")?.classList.contains("is-open"),
        currentPageLinks: document.querySelectorAll('.mobile-menu [aria-current="page"]').length,
      }));
      if (!mobileState.open) failures.push(route.name + " mobile navigation did not open");
      if (mobileState.currentPageLinks !== 1) failures.push(route.name + " mobile navigation has " + mobileState.currentPageLinks + " current-page links");
      await page.getByRole("button", { name: "Close navigation" }).click();
    }
    await page.evaluate(async () => {
      const sections = Array.from(document.querySelectorAll("main section"));
      for (const section of sections) {
        section.scrollIntoView({ block: "center" });
        await new Promise((resolve) => setTimeout(resolve, 760));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 900));
    });

    if (route.name === "customize") {
      await page.evaluate(async () => {
        document.querySelectorAll(".customizer-group").forEach((group) => {
          group.open = true;
        });
        const cards = Array.from(
          document.querySelectorAll(".customizer-model-option, .customizer-choice, .customizer-toggle"),
        );
        for (const card of cards) {
          card.scrollIntoView({ block: "center" });
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1500);
      await page.waitForFunction(
        () =>
          Array.from(
            document.querySelectorAll(
              ".customizer-model-option img, .customizer-choice img, .customizer-toggle img",
            ),
          ).every((image) => image.complete && image.naturalWidth > 0),
        undefined,
        { timeout: 20000 },
      );
      const cardImageState = await page.evaluate(() => {
        const selectors = {
          models: ".customizer-model-option",
          choices: ".customizer-choice",
          service: ".customizer-toggle",
        };
        const cards = Object.values(selectors).flatMap((selector) => Array.from(document.querySelectorAll(selector)));
        const images = cards.map((card) => card.querySelector("img"));
        return {
          models: document.querySelectorAll(selectors.models).length,
          choices: document.querySelectorAll(selectors.choices).length,
          service: document.querySelectorAll(selectors.service).length,
          total: cards.length,
          missingImages: images.filter((image) => !image).length,
          missingAlt: images.filter((image) => image && !image.getAttribute("alt")?.trim()).length,
          brokenImages: images.filter((image) => image && (!image.complete || image.naturalWidth === 0)).length,
        };
      });
      if (
        cardImageState.models !== 8 ||
        cardImageState.choices !== 33 ||
        cardImageState.service !== 5 ||
        cardImageState.total !== 46
      ) {
        failures.push(
          `customize ${viewport.name} image-card counts were ${cardImageState.models}/${cardImageState.choices}/${cardImageState.service} instead of 8/33/5`,
        );
      }
      if (cardImageState.missingImages || cardImageState.missingAlt || cardImageState.brokenImages) {
        failures.push(
          `customize ${viewport.name} image coverage failed: ${cardImageState.missingImages} missing, ${cardImageState.missingAlt} without alt text, ${cardImageState.brokenImages} broken`,
        );
      }
    }
    await page.screenshot({ path: outputDir + "/" + route.name + "-" + viewport.name + ".png", fullPage: true });
  }

  if (viewport.name === "desktop") {
    await page.goto(baseUrl + "/parasols", { waitUntil: "domcontentloaded" });
    await page.locator(".catalogue-controls button").filter({ hasText: "Cantilever" }).click();
    await page.waitForFunction(() => document.querySelectorAll(".catalogue-card").length === 1);
    const visibleCards = await page.locator(".catalogue-card").count();
    if (visibleCards !== 1) failures.push("Catalogue Cantilever filter returned " + visibleCards + " cards instead of 1");
    const previewTrigger = page.locator(".catalogue-image").first();
    await previewTrigger.click();
    await page.locator(".catalogue-modal").waitFor({ state: "visible" });
    const focusedClose = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Close product preview");
    if (!focusedClose) failures.push("Catalogue modal did not focus its close control");
    await page.keyboard.press("Escape");
    await page.locator(".catalogue-modal").waitFor({ state: "detached" });
    const focusRestored = await previewTrigger.evaluate((element) => document.activeElement === element);
    if (!focusRestored) failures.push("Catalogue modal did not return focus to its trigger");

    await page.goto(baseUrl + "/customize?model=HS-CL-30SQ", { waitUntil: "domcontentloaded" });
    await page.locator('input[name="model"][value="HS-CL-30SQ"]').waitFor({ state: "attached" });
    await page.waitForFunction(() => document.querySelector('input[name="model"][value="HS-CL-30SQ"]')?.checked);
    const initialCode = await page.locator(".customizer-code-block strong").textContent();
    if (!initialCode?.startsWith("HS-CL-30SQ")) failures.push("Configurator did not load the catalogue model from the query string");

    await page.locator('label:has(input[name="canopyColor"][value="forest-green"])').click();
    const changedCode = await page.locator(".customizer-code-block strong").textContent();
    if (changedCode === initialCode || !changedCode?.includes("FG")) {
      failures.push("Configurator code did not update after a finish selection");
    }

    await page.locator('label:has(input[name="model"][value="HS-LF-CUSTOM"])').click();
    const compatibilityState = await page.evaluate(() => ({
      largeFormatChecked: document.querySelector('input[name="model"][value="HS-LF-CUSTOM"]')?.checked,
      pvcChecked: document.querySelector('input[name="fabric"][value="pvc-membrane"]')?.checked,
      scallopDisabled: document.querySelector('input[name="edge"][value="scalloped"]')?.disabled,
      engineeringVisible: Boolean(document.querySelector(".customizer-engineering-note")),
    }));
    if (!compatibilityState.largeFormatChecked || !compatibilityState.pvcChecked || !compatibilityState.scallopDisabled) {
      failures.push("Configurator did not reconcile incompatible large-format choices");
    }
    if (!compatibilityState.engineeringVisible) failures.push("Large-format selection did not show the engineering review gate");

    await page.getByRole("button", { name: "Request project review" }).click();
    const reviewFocused = await page.evaluate(() => document.activeElement?.classList.contains("customizer-review"));
    if (!reviewFocused) failures.push("Configurator review action did not focus the summary");
    const payloadState = await page.evaluate(() => ({
      visibleCode: document.querySelector(".customizer-review-code strong")?.textContent,
      formCode: document.querySelector('input[name="configurationCode"]')?.value,
      summary: document.querySelector('input[name="configurationSummary"]')?.value,
    }));
    if (payloadState.visibleCode !== payloadState.formCode || !payloadState.summary?.includes("Large Format Project")) {
      failures.push("Configurator RFQ payload does not match the visible summary");
    }

    await page.goto(baseUrl + "/oem-odm", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    if (!page.url().includes("/manufacturing-vietnam#oem-odm")) {
      failures.push("OEM / ODM redirect did not resolve to the Manufacturing anchor");
    }
  }

  if (consoleErrors.length) failures.push(viewport.name + " console errors: " + consoleErrors.join(" | "));
  await context.close();
}

const darkPreferenceContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "dark",
});
const darkPreferencePage = await darkPreferenceContext.newPage();
await darkPreferencePage.goto(baseUrl, { waitUntil: "domcontentloaded" });
const paletteState = await darkPreferencePage.evaluate(() => {
  const styles = getComputedStyle(document.documentElement);
  return {
    paper: styles.getPropertyValue("--paper").trim().toLowerCase(),
    scheme: styles.colorScheme,
  };
});
if (paletteState.paper !== "#f5f0e6" || paletteState.scheme !== "light") {
  failures.push("Dark OS preference overrides the sunlit resort palette");
}
await darkPreferenceContext.close();

await browser.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Visual QA passed for 5 routes at desktop and mobile sizes.");
