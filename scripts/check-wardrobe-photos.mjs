import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const manifestPath = path.join(root, "src/data/wardrobe/photo-slots.json");
const photoDir = path.join(root, "public/wardrobe-photos");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const slots = [...manifest.categories, ...manifest.products, ...manifest.shared];

const missingFiles = slots.filter(
  (slot) => slot.fileName && !fs.existsSync(path.join(photoDir, slot.fileName)),
);
const emptySlots = slots.filter((slot) => !slot.fileName);

console.log(`Wardrobe photo slots: ${slots.length}`);
console.log(`Filled: ${slots.length - emptySlots.length}`);
console.log(`Empty: ${emptySlots.length}`);

if (emptySlots.length) {
  console.log("\nEmpty slots:");
  for (const slot of emptySlots) {
    console.log(`- ${slot.id}: ${slot.name}`);
  }
}

if (missingFiles.length) {
  console.log("\nMissing files:");
  for (const slot of missingFiles) {
    console.log(`- ${slot.id}: ${slot.fileName}`);
  }
  process.exitCode = 1;
}
