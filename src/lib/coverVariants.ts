import {
  getCoverVariantProfile,
  getImageVariantPath,
  getImageVariantSourceSet,
} from "@/lib/imageVariantManifest";

export type CoverVariant = "card" | "hero";

export function getCoverVariantSourceSet(
  src: string | undefined,
  variant: CoverVariant
): string | undefined {
  const variantNames = getCoverVariantProfile(variant);
  return getImageVariantSourceSet(src, variantNames);
}

export function getCoverVariantPath(
  src: string | undefined,
  variant: CoverVariant
): string | undefined {
  if (!src) {
    return undefined;
  }

  const variantNames = getCoverVariantProfile(variant);
  for (let index = variantNames.length - 1; index >= 0; index -= 1) {
    const variantPath = getImageVariantPath(src, variantNames[index]);
    if (variantPath) {
      return variantPath;
    }
  }

  return undefined;
}
