import { MetadataRoute } from "next";

import { BASE_URL } from "@/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep Next.js runtime/build assets crawlable so search engines can render pages correctly.
      // Blocking /_next/ can prevent Googlebot from fetching required CSS/JS resources.
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
