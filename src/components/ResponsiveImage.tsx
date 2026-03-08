type ResponsiveImageProps = {
  src: string;
  srcSet?: string;
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
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        loading={priority ? "eager" : loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
      />
    </picture>
  );
}
