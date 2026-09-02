import { chromium } from "playwright-core";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});

const pages = [
  ["parasols", "http://localhost:3000/parasols"],
  ["oem-odm", "http://localhost:3000/oem-odm"],
  ["manufacturing", "http://localhost:3000/manufacturing-vietnam"],
  ["resources", "http://localhost:3000/resources"],
];

for (const [name, url] of pages) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({
    path: "artifacts/page-qa/" + name + "-hero.jpg",
    type: "jpeg",
    quality: 58,
  });
  await page.screenshot({
    path: "artifacts/page-qa/" + name + "-desktop.png",
    fullPage: true,
  });
  await page.close();
}

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
});
await mobile.goto("http://localhost:3000/parasols", { waitUntil: "networkidle" });
await mobile.screenshot({
  path: "artifacts/page-qa/parasols-mobile-hero.jpg",
  type: "jpeg",
  quality: 58,
});
await mobile.screenshot({
  path: "artifacts/page-qa/parasols-mobile.png",
  fullPage: true,
});

await browser.close();
