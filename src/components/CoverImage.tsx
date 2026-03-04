import { ResponsiveImage } from "@/components/ResponsiveImage";

type CoverImageProps = {
  src?: string;
  srcSet?: string;
  alt: string;
  variant: "card" | "hero";
  sizes: string;
  className?: string;
  imageClassName?: string;
  fallbackLabel?: string;
  priority?: boolean;
};

export function CoverImage({
  src,
  srcSet,
  alt,
  variant,
  sizes,
  className = "",
  imageClassName = "",
  fallbackLabel = "No cover image available",
  priority = false,
}: CoverImageProps) {
  const wrapperClassName =
    variant === "card"
      ? "h-52 w-full overflow-hidden rounded-lg bg-gray-800"
      : "overflow-hidden rounded-lg bg-gray-800";

  const basePictureClassName =
    variant === "card" ? "block h-full w-full" : "block w-full";

  const baseImageClassName =
    variant === "card"
      ? "h-full w-full object-contain object-center"
      : "aspect-[2/1] w-full object-contain object-center shadow-sm";

  if (!src) {
    return (
      <div
        className={`${wrapperClassName} flex items-center justify-center text-sm text-gray-300 ${className}`.trim()}
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    <div className={`${wrapperClassName} ${className}`.trim()}>
      <ResponsiveImage
        src={src}
        srcSet={srcSet}
        alt={alt}
        width={1200}
        height={630}
        sizes={sizes}
        pictureClassName={basePictureClassName}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={`${baseImageClassName} ${imageClassName}`.trim()}
      />
    </div>
  );
}
