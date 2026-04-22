import imageVariantManifest from "@/generated/imageVariantManifest.json";

export type VariantInfo = {
  path: string;
  width: number;
  height: number;
};

type SourceInfo = {
  variants: Record<string, VariantInfo>;
};

type ImageVariantManifest = {
  schemaVersion: number;
  profiles?: {
    cover?: Record<string, string[]>;
    inlineContent?: string[];
  };
  sources: Record<string, SourceInfo>;
};

const manifest: ImageVariantManifest = imageVariantManifest;

function ensureStringArray(
  value: unknown,
  context: string
): asserts value is string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`[image-variants] Missing required profile: ${context}`);
  }

  if (value.some((entry) => typeof entry !== "string" || !entry)) {
    throw new Error(`[image-variants] Invalid profile entries: ${context}`);
  }
}

function ensureManifestProfiles() {
  const coverProfiles = manifest.profiles?.cover;
  if (!coverProfiles) {
    throw new Error(
      "[image-variants] Missing required manifest section: profiles.cover"
    );
  }

  ensureStringArray(coverProfiles.card, "profiles.cover.card");
  ensureStringArray(coverProfiles.hero, "profiles.cover.hero");
  ensureStringArray(manifest.profiles?.inlineContent, "profiles.inlineContent");
}

ensureManifestProfiles();

function normalizeSourcePath(sourcePath: string | undefined) {
  if (!sourcePath) {
    return undefined;
  }

  return sourcePath.startsWith("/") ? sourcePath : `/${sourcePath}`;
}

function getSourceVariants(sourcePath: string | undefined) {
  const normalizedSourcePath = normalizeSourcePath(sourcePath);
  if (!normalizedSourcePath) {
    return undefined;
  }

  return manifest.sources[normalizedSourcePath]?.variants;
}

export function getImageVariant(
  sourcePath: string | undefined,
  variantName: string
): VariantInfo | undefined {
  const variants = getSourceVariants(sourcePath);
  if (!variants) {
    return undefined;
  }

  return variants[variantName];
}

export function getImageVariantSourceSet(
  sourcePath: string | undefined,
  orderedVariantNames: string[],
  minVariants = 2
): string | undefined {
  const variants = orderedVariantNames
    .map((variantName) => getImageVariant(sourcePath, variantName))
    .filter((variant): variant is VariantInfo => Boolean(variant));

  if (variants.length < minVariants) {
    return undefined;
  }

  return variants
    .map((variant) => `${variant.path} ${variant.width}w`)
    .join(", ");
}

export function getLargestImageVariant(
  sourcePath: string | undefined,
  orderedVariantNames: string[]
): VariantInfo | undefined {
  for (let index = orderedVariantNames.length - 1; index >= 0; index -= 1) {
    const variant = getImageVariant(sourcePath, orderedVariantNames[index]);
    if (variant) {
      return variant;
    }
  }

  return undefined;
}

export function getCoverVariantProfile(variant: string): string[] {
  const profile = manifest.profiles?.cover?.[variant];
  ensureStringArray(profile, `profiles.cover.${variant}`);
  return profile;
}

export function getInlineContentVariantProfile(): string[] {
  const profile = manifest.profiles?.inlineContent;
  ensureStringArray(profile, "profiles.inlineContent");
  return profile;
}
