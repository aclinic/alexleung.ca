#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

import matter from "gray-matter";

const repoRoot = process.cwd();
const postsDir = path.join(repoRoot, "content", "posts");
const publicDir = path.join(repoRoot, "public");
const args = new Set(process.argv.slice(2));
const stagedOnly = args.has("--staged");
const stageGenerated = args.has("--stage-generated");

const variants = [
  {
    name: "card",
    width: process.env.COVER_CARD_WIDTH || "768",
    quality: process.env.COVER_CARD_QUALITY || "72",
  },
  {
    name: "hero",
    width: process.env.COVER_HERO_WIDTH || "1280",
    quality: process.env.COVER_HERO_QUALITY || "75",
  },
];

function log(message) {
  process.stdout.write(`${message}\n`);
}

function warn(message) {
  process.stderr.write(`${message}\n`);
}

function hasCommand(command) {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function normalizePublicPath(inputPath) {
  return inputPath.startsWith("/") ? inputPath : `/${inputPath}`;
}

function getStagedFiles() {
  try {
    const output = execFileSync(
      "git",
      ["diff", "--cached", "--name-only", "--diff-filter=ACMR"],
      {
        cwd: repoRoot,
        encoding: "utf8",
      }
    );

    return new Set(
      output
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    );
  } catch {
    return new Set();
  }
}

function getAllPostFiles() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join("content", "posts", file));
}

function getCoverImageFromPost(postFile) {
  const fullPath = path.join(repoRoot, postFile);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const source = fs.readFileSync(fullPath, "utf8");
  const frontMatter = matter(source).data || {};
  if (typeof frontMatter.coverImage !== "string" || !frontMatter.coverImage) {
    return undefined;
  }

  return normalizePublicPath(frontMatter.coverImage);
}

function resolveCoverImages() {
  const allPostFiles = getAllPostFiles();

  if (!stagedOnly) {
    return new Set(
      allPostFiles
        .map((postFile) => getCoverImageFromPost(postFile))
        .filter(Boolean)
    );
  }

  const stagedFiles = getStagedFiles();
  const stagedPostFiles = [...stagedFiles].filter(
    (file) => file.startsWith("content/posts/") && file.endsWith(".md")
  );
  const stagedPublicFiles = new Set(
    [...stagedFiles]
      .filter((file) => file.startsWith("public/"))
      .map((file) => normalizePublicPath(file.slice("public/".length)))
  );

  const coverImages = new Set();

  for (const postFile of stagedPostFiles) {
    const coverImage = getCoverImageFromPost(postFile);
    if (coverImage) {
      coverImages.add(coverImage);
    }
  }

  if (stagedPublicFiles.size > 0) {
    for (const postFile of allPostFiles) {
      const coverImage = getCoverImageFromPost(postFile);
      if (coverImage && stagedPublicFiles.has(coverImage)) {
        coverImages.add(coverImage);
      }
    }
  }

  return coverImages;
}

function toVariantPath(sourcePublicPath, variantName) {
  if (/\.(webp|jpe?g|png)$/i.test(sourcePublicPath)) {
    return sourcePublicPath.replace(/\.(webp|jpe?g|png)$/i, `-${variantName}.webp`);
  }

  return `${sourcePublicPath}-${variantName}.webp`;
}

function run() {
  if (!hasCommand("cwebp")) {
    warn(
      "[cover:variants] Skipping generation: `cwebp` not found on PATH. Build will continue with original covers."
    );
    return;
  }

  const coverImages = resolveCoverImages();
  if (coverImages.size === 0) {
    log("[cover:variants] No cover images to process.");
    return;
  }

  const generated = [];

  for (const coverImage of coverImages) {
    const sourcePath = path.join(publicDir, coverImage.slice(1));

    if (!fs.existsSync(sourcePath)) {
      warn(`[cover:variants] Missing source image: ${sourcePath}`);
      continue;
    }

    for (const variant of variants) {
      const targetPublicPath = toVariantPath(coverImage, variant.name);
      const targetPath = path.join(publicDir, targetPublicPath.slice(1));

      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      execFileSync(
        "cwebp",
        [
          "-quiet",
          "-q",
          variant.quality,
          "-resize",
          variant.width,
          "0",
          sourcePath,
          "-o",
          targetPath,
        ],
        { stdio: "inherit" }
      );

      generated.push(path.relative(repoRoot, targetPath));
    }
  }

  if (stageGenerated && generated.length > 0) {
    execFileSync("git", ["add", ...generated], {
      cwd: repoRoot,
      stdio: "inherit",
    });
  }

  log(`[cover:variants] Generated ${generated.length} variant(s).`);
}

run();
