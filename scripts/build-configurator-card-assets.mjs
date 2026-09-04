import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const generatedRoot =
  "C:\\Users\\Admin\\.codex\\generated_images\\01a06589-cdd1-7b53-8067-1c0b37516c2f";
const outputRoot = path.join(projectRoot, "public", "images", "configurator", "cards");

const generatedAssets = {
  fabric: {
    "contract-outdoor": "exec-eb865063-5073-4474-8380-e7c175def9ae.png",
    "solution-acrylic": "exec-d49f7985-0bfa-4555-9a98-65e81a068914.png",
    "solution-polyester": "exec-fcfe9252-ac18-4f5e-bacb-4b46c27a79f2.png",
    "pvc-membrane": "exec-7f69a43d-be80-4020-9fb1-e48e67dc2390.png",
    "customer-fabric": "exec-11ab40ce-30e6-47b2-9120-99035b013059.png",
  },
  "canopy-color": {
    "warm-ivory": "exec-91bdf112-a407-4dc7-b2bc-27ad3d95ac89.png",
    sand: "exec-f1ae4446-d108-4e5c-9e09-fe845edf9816.png",
    taupe: "exec-862a3c53-fc51-4aa8-8dc6-83a2a15dbba2.png",
    "forest-green": "exec-3bb99740-1009-497c-b38d-5c211d62c56b.png",
    "project-custom": "exec-8835d3e0-cb44-4cba-83d7-c91ce9f54b95.png",
  },
  edge: {
    straight: "exec-08d39039-b090-4dae-9a4c-4d08767238df.png",
    scalloped: "exec-7d8d2194-d644-4eab-9f15-690bfb4a0fdb.png",
    "straight-valance": "exec-3a918774-382a-4376-8dc6-c8046d047b51.png",
    "contrast-binding": "exec-b1646ac5-c884-4cde-9ead-455133c6c472.png",
    "custom-profile": "exec-ff63d644-3922-47ce-91b6-e3eab16c4015.png",
  },
  "frame-finish": {
    "dark-bronze": "exec-e1cfb0c9-b8e1-494b-88aa-5354158b19a8.png",
    charcoal: "exec-5f916128-6f79-421f-acef-cf20e1442559.png",
    "warm-white": "exec-4daead51-46f0-4243-bf8e-4b0d0b44a00a.png",
    "satin-anodized": "exec-1415b2d6-72bd-4bb8-be2e-bf9f0ce4b896.png",
    "timber-look": "exec-0cecc7b0-9057-48de-b89b-be614d717e1e.png",
    "project-ral": "exec-5ad3b529-3e59-426b-a04b-a90fb7821f74.png",
  },
  mounting: {
    "weighted-base": "exec-a74b01f0-7d1f-4ba1-843d-45bc040f3639.png",
    "mobile-base": "exec-5f695c55-eb97-415a-859e-af73350b2e79.png",
    "deck-plate": "exec-098eae92-9598-4584-9b99-9e71818fbc18.png",
    "in-ground-sleeve": "exec-acf590f6-2540-4fac-8e33-e7cd0cda921b.png",
    "engineered-footing": "exec-a02407e9-6035-4a94-85f5-392e7f9def88.png",
  },
  lighting: {
    "no-lighting": "exec-f5dec4a2-6438-49ec-beb4-b5bcbfe71dbe.png",
    "warm-led": "exec-4e7a9e24-fd79-42d9-a2b6-8a9e9308f439.png",
  },
  branding: {
    "no-branding": "exec-4db3d82c-82f7-46bb-b747-c1bb6be0edae.png",
    "printed-logo": "exec-1a5eb308-8574-4e5f-b634-b82454b74aeb.png",
    "embroidered-logo": "exec-24330a2d-1177-4496-9d50-2d0cfa5bed30.png",
    "woven-label": "exec-4938e861-a7f2-4db0-937b-9d7b21e4f83e.png",
    "branded-finial": "exec-861d3ae7-783b-4b4d-af3d-2603d4833f45.png",
  },
  accessories: {
    heater: "exec-12db8d3e-2a13-4a13-9c17-a890e420cc7b.png",
    "rain-gutter": "exec-21960742-adc8-4c99-816e-c8ffb2cc6560.png",
    "protective-cover": "exec-4e27bb5d-5f30-46ad-923a-6af1c07182eb.png",
    "spare-canopy-kit": "exec-ad502328-49de-491d-9a05-6380eb48a4b1.png",
    "custom-dimensions": "exec-b94ec716-5a49-4e72-8d39-dc18e9941dd8.png",
  },
};

const modelAssets = {
  "hs-cp-25sq": "public/images/packshots/center-pole-classic/01-three-quarter.png",
  "hs-cp-30sq": "public/images/packshots/center-pole-classic/01-three-quarter.png",
  "hs-cp-30oc": "public/images/packshots/center-pole-classic/01-three-quarter.png",
  "hs-cp-35oc": "public/images/packshots/center-pole-classic/01-three-quarter.png",
  "hs-cd-30sq": "public/images/packshots/scalloped-center-pole/01-three-quarter.jpg",
  "hs-cl-30sq": "public/images/packshots/square-cantilever/01-three-quarter.jpg",
  "hs-cl-35sq": "public/images/packshots/square-cantilever/01-three-quarter.jpg",
  "hs-lf-custom": "public/images/packshots/dual-canopy-cantilever/01-three-quarter.jpg",
};

await fs.mkdir(outputRoot, { recursive: true });

for (const [group, assets] of Object.entries(generatedAssets)) {
  const groupDir = path.join(outputRoot, group);
  await fs.mkdir(groupDir, { recursive: true });

  for (const [id, sourceName] of Object.entries(assets)) {
    await sharp(path.join(generatedRoot, sourceName))
      .resize(960, 720, { fit: "cover", position: "centre" })
      .webp({ quality: 82, smartSubsample: true })
      .toFile(path.join(groupDir, `${id}.webp`));
  }
}

const modelDir = path.join(outputRoot, "models");
await fs.mkdir(modelDir, { recursive: true });
for (const [id, sourcePath] of Object.entries(modelAssets)) {
  await sharp(path.join(projectRoot, sourcePath))
    .resize(960, 720, {
      fit: "contain",
      position: "centre",
      background: "#eee6d8",
    })
    .webp({ quality: 82, smartSubsample: true })
    .toFile(path.join(modelDir, `${id}.webp`));
}

const written = [];
for (const group of [...Object.keys(generatedAssets), "models"]) {
  const groupDir = path.join(outputRoot, group);
  for (const file of await fs.readdir(groupDir)) {
    const filePath = path.join(groupDir, file);
    const metadata = await sharp(filePath).metadata();
    const { size } = await fs.stat(filePath);
    written.push({
      file: path.relative(projectRoot, filePath).replaceAll("\\", "/"),
      width: metadata.width,
      height: metadata.height,
      kilobytes: Math.round(size / 1024),
    });
  }
}

console.table(written);
console.log(`Built ${written.length} configurator card assets.`);
