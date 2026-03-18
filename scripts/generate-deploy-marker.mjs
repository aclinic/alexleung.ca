#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";

const outDir = path.join(process.cwd(), "out");
const deployMarkerPath = path.join(outDir, "deploy-meta.json");

const deployMeta = {
  sha:
    process.env.GITHUB_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.DEPLOY_SHA ||
    "dev",
  ref:
    process.env.GITHUB_REF_NAME ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.DEPLOY_REF ||
    "local",
  deployedAt: new Date().toISOString(),
};

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(
  deployMarkerPath,
  `${JSON.stringify(deployMeta, null, 2)}\n`,
  "utf8"
);

console.log(`Wrote deploy marker to ${deployMarkerPath}`);
