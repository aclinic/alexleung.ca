import { BASE_URL } from "@/constants";

function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function ensureTrailingSlash(path: string): string {
  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path : `${path}/`;
}

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//.test(value);
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (isAbsoluteUrl(pathOrUrl)) {
    return new URL(pathOrUrl).toString();
  }

  return new URL(ensureLeadingSlash(pathOrUrl), BASE_URL).toString();
}

export function toCanonical(pathOrUrl: string): string {
  const url = new URL(toAbsoluteUrl(pathOrUrl));

  url.hash = "";
  url.search = "";
  url.pathname = ensureTrailingSlash(url.pathname);

  return url.toString();
}
