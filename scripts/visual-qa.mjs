import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = "http://localhost:3000";
const outputDir = "artifacts/live-redesign-qa";
const routes = [
  { name: "home", path: "/" },
  { name: "products", path: "/parasols" },
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

console.log("Visual QA passed for 4 routes at desktop and mobile sizes.");
