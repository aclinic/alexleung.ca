import fs from "fs";
import { join } from "path";

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
  const variantPath = IMAGE_EXTENSION_PATTERN.test(normalizedSrc)
    ? normalizedSrc.replace(IMAGE_EXTENSION_PATTERN, `-${variant}.webp`)
    : `${normalizedSrc}-${variant}.webp`;
  const absoluteVariantPath = join(
    process.cwd(),
    "public",
    variantPath.slice(1)
  );

  return fs.existsSync(absoluteVariantPath) ? variantPath : undefined;
}
