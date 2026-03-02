const IMAGE_EXTENSION_PATTERN = /\.(webp|jpe?g|png)$/i;

export type CoverVariant = "card" | "hero";

export function getCoverVariantPath(
  src: string | undefined,
  variant: CoverVariant
): string | undefined {
  if (!src) {
    return undefined;
  }

  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;

  if (IMAGE_EXTENSION_PATTERN.test(normalizedSrc)) {
    return normalizedSrc.replace(IMAGE_EXTENSION_PATTERN, `-${variant}.webp`);
  }

  return `${normalizedSrc}-${variant}.webp`;
}
