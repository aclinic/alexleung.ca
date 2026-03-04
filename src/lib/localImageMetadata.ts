import { type VariantInfo, getImageVariant } from "@/lib/imageVariantManifest";

const staticImageProfiles = {
  aboutPortrait: {
    source: "/assets/about_portrait.webp",
    orderedVariants: ["sm", "md", "lg"] as const,
    fallbackVariant: "md",
  },
  background: {
    source: "/assets/background.webp",
    orderedVariants: ["mobile", "tablet", "desktop"] as const,
    fallbackVariant: "tablet",
  },
} as const;

export type StaticImageProfileName = keyof typeof staticImageProfiles;

function getRequiredVariant(
  sourcePath: string,
  variantName: string
): VariantInfo {
  const variant = getImageVariant(sourcePath, variantName);
  if (!variant) {
    throw new Error(
      `[image-variants] Missing required static image variant: ${sourcePath}#${variantName}`
    );
  }

  return variant;
}

export function getStaticImageSourceSet(
  profile: StaticImageProfileName
): string {
  const { source, orderedVariants } = staticImageProfiles[profile];

  return orderedVariants
    .map((variantName) => {
      const variant = getRequiredVariant(source, variantName);
      return `${variant.path} ${variant.width}w`;
    })
    .join(", ");
}

export function getStaticImageFallback(
  profile: StaticImageProfileName
): VariantInfo {
  const { source, fallbackVariant } = staticImageProfiles[profile];
  return getRequiredVariant(source, fallbackVariant);
}
