import { defineConfig, devices } from "@playwright/test";

const isLiveTarget = Boolean(process.env.PLAYWRIGHT_BASE_URL);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const webServerCommand =
  "yarn build && yarn http-server out -a 127.0.0.1 -p 3000 -c-1 --silent";

export default defineConfig({
  testDir: "./playwright/tests",
  outputDir: "test-results/playwright",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],
  globalSetup: "./playwright/global.setup.ts",
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      scale: "css",
    },
  },
  use: {
    baseURL,
    locale: "en-CA",
    screenshot: "only-on-failure",
    timezoneId: "UTC",
    trace: "on-first-retry",
    video: "on-first-retry",
    viewport: {
      width: 1440,
      height: 1080,
    },
  },
  webServer: isLiveTarget
    ? undefined
    : {
        command: webServerCommand,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        url: baseURL,
      },
  projects: [
    {
      name: "chromium-smoke",
      testMatch: /smoke\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "webkit-smoke",
      testMatch: /smoke\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "mobile-chromium-smoke",
      testMatch: /smoke\/.*\.spec\.ts/,
      use: {
        ...devices["Pixel 7"],
      },
    },
    {
      name: "mobile-webkit-smoke",
      testMatch: /smoke\/.*\.spec\.ts/,
      use: {
        ...devices["iPhone 13"],
      },
    },
    {
      name: "chromium-visual",
      testMatch: /visual\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "mobile-chromium-visual",
      testMatch: /visual\/.*\.spec\.ts/,
      use: {
        ...devices["Pixel 7"],
      },
    },
  ],
});
