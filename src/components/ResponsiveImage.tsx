import Image from "next/image";

type ResponsiveImageProps = {
  src: string;
  srcSet?: string;
  sourceType?: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  pictureClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "sync" | "async" | "auto";
  priority?: boolean;
};

export function ResponsiveImage({
  src,
  srcSet,
  sourceType = "image/webp",
  alt,
  width,
  height,
  sizes,
  className,
  pictureClassName,
  loading,
  fetchPriority,
  decoding,
  priority,
}: ResponsiveImageProps) {
  return (
    <picture className={pictureClassName}>
      {srcSet ? (
        <source type={sourceType} srcSet={srcSet} sizes={sizes} />
      ) : null}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        priority={priority}
      />
    </picture>
  );
}
