import type { Metadata } from "next";

export type SeoImage = {
  alt?: string;
  height?: number;
  url: string;
  width?: number;
};

export type SeoInput = {
  description: string;
  images?: SeoImage[];
  keywords?: Metadata["keywords"];
  path: string;
  title: string;
  type?: "article" | "website";
  twitterCard?: "summary" | "summary_large_image";
};
