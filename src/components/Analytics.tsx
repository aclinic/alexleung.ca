"use client";

import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";
import Script from "next/script";

type AnalyticsProps = {
  gaId: string;
};

type GtagCommand =
  | ["js", Date]
  | ["config", string, Record<string, unknown>]
  | ["event", string, Record<string, unknown>];

type AnalyticsWindow = Window & {
  dataLayer?: GtagCommand[];
  gtag?: (...args: GtagCommand) => void;
};

function ensureGtag(windowObject: AnalyticsWindow) {
  windowObject.dataLayer = windowObject.dataLayer ?? [];
  windowObject.gtag =
    windowObject.gtag ??
    ((...args: GtagCommand) => {
      windowObject.dataLayer?.push(args);
    });

  return windowObject.gtag;
}

export function Analytics({ gaId }: AnalyticsProps) {
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (lastTrackedPathRef.current === pathname) {
      return;
    }

    lastTrackedPathRef.current = pathname;

    const analyticsWindow = window as AnalyticsWindow;
    const gtag = ensureGtag(analyticsWindow);

    gtag("event", "page_view", {
      page_location: new URL(pathname, window.location.origin).toString(),
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return (
    <>
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${gaId}', { send_page_view: false });
          `,
        }}
      />
      <Script
        id="ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
