import {
  getCoverVariantProfile,
  getImageVariantSourceSet,
  getLargestImageVariant,
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
  return getLargestImageVariant(src, getCoverVariantProfile(variant))?.path;
}
