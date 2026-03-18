import type { FullConfig } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
  const firstProject = config.projects[0];
  const baseURL = firstProject?.use.baseURL;

  if (typeof baseURL !== "string" || baseURL.length === 0) {
    throw new Error("Playwright requires a configured baseURL.");
  }

  if (
    process.env.PLAYWRIGHT_BASE_URL &&
    !/^https?:\/\//.test(process.env.PLAYWRIGHT_BASE_URL)
  ) {
    throw new Error("PLAYWRIGHT_BASE_URL must start with http:// or https://");
  }
}
