import { ResponsiveImage } from "@/components/ResponsiveImage";
import {
  getStaticImageFallback,
  getStaticImageSourceSet,
} from "@/lib/localImageMetadata";

export function AppBackground() {
  const backgroundSrcSet = getStaticImageSourceSet("background");
  const backgroundFallback = getStaticImageFallback("background");

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-screen overflow-hidden"
    >
      <ResponsiveImage
        src={backgroundFallback.path}
        srcSet={backgroundSrcSet}
        alt=""
        width={backgroundFallback.width}
        height={backgroundFallback.height}
        sizes="100vw"
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        pictureClassName="absolute inset-0 block h-full w-full"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-slate-700/50" />
    </div>
  );
}
