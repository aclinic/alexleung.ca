"use client";

import { usePathname } from "next/navigation";

type BackgroundVariant = "default" | "reading" | "minimal";

const variantStyles: Record<BackgroundVariant, string> = {
  default: "after:bg-black/50",
  reading: "after:bg-black/68",
  minimal: "after:bg-black/35",
};

function resolveVariant(pathname: string): BackgroundVariant {
  if (pathname.startsWith("/blog/") && pathname !== "/blog/") {
    return "reading";
  }

  if (pathname === "/contact/") {
    return "minimal";
  }

  return "default";
}

export function AppBackground() {
  const pathname = usePathname() ?? "/";
  const variant = resolveVariant(pathname);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 -z-10 h-screen bg-[url('/assets/background.webp')] bg-cover bg-center bg-no-repeat after:absolute after:inset-0 ${variantStyles[variant]}`}
    />
  );
}
