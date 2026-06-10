import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const clientDir = path.join(repoRoot, "dist", "client");
const pagesDir = path.join(repoRoot, "dist", "github-pages");
const basePath = normalizeBasePath(process.argv[2] ?? process.env.GITHUB_PAGES_BASE_PATH ?? "");

await rm(pagesDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });
await cp(path.join(clientDir, "assets"), path.join(pagesDir, "assets"), { recursive: true });

const assets = await readdir(path.join(pagesDir, "assets"));
const entryScript = assets
  .filter((file) => /^index-[\w-]+\.js$/.test(file))
  .sort()
  .at(-1);
const stylesheet = assets.find((file) => /^styles-[\w-]+\.css$/.test(file));

if (!entryScript) {
  throw new Error("Could not find TanStack client entry asset in dist/client/assets.");
}

const packageJson = JSON.parse(await readFile(path.join(repoRoot, "package.json"), "utf8"));
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shades & Space - Quote Studio</title>
    <meta
      name="description"
      content="Internal quote generator for Shades & Space: luxury blinds, shutters and window dressings."
    />
    ${stylesheet ? `<link rel="stylesheet" href="${assetHref(basePath, stylesheet)}" />` : ""}
    <script type="module" crossorigin src="${assetHref(basePath, entryScript)}"></script>
  </head>
  <body></body>
</html>
`;

await writeFile(path.join(pagesDir, "index.html"), html);
await writeFile(path.join(pagesDir, "404.html"), html);
await writeFile(path.join(pagesDir, ".nojekyll"), "");

console.log(
  `GitHub Pages artifact ready: dist/github-pages (${packageJson.name}, basePath=${basePath || "/"})`,
);

function normalizeBasePath(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function assetHref(basePath, filename) {
  return `${basePath}/assets/${filename}`;
}
