import {
  expect as baseExpect,
  test as baseTest,
  type Page,
} from "@playwright/test";

const BLOCKED_REQUEST_PATTERNS = [
  "https://www.googletagmanager.com/**",
  "https://www.google-analytics.com/**",
];

const STABLE_RENDERING_CSS = `
  *,
  *::before,
  *::after {
    animation-delay: 0s !important;
    animation-duration: 0s !important;
    caret-color: transparent !important;
    scroll-behavior: auto !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
  }
`;

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    for (const pattern of BLOCKED_REQUEST_PATTERNS) {
      await page.route(pattern, (route) => route.abort());
    }

    await use(page);
  },
});

export const expect = baseExpect;

export async function gotoAndStabilize(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await waitForStablePage(page);
}

export async function waitForStablePage(page: Page) {
  await expect(page.locator("main")).toBeVisible();
  await page.addStyleTag({ content: STABLE_RENDERING_CSS });
  await waitForFonts(page);
  await waitForImages(page);
  await waitForBackgroundImages(page);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      })
  );
}

async function waitForFonts(page: Page) {
  await page.evaluate(async () => {
    if ("fonts" in document) {
      await document.fonts.ready;
    }
  });
}

async function waitForImages(page: Page) {
  await page.evaluate(async () => {
    const imageLoadTimeoutMs = 5_000;
    const images = Array.from(document.images).filter((image) => {
      if (image.loading !== "lazy") {
        return true;
      }

      const rect = image.getBoundingClientRect();
      return rect.top < window.innerHeight * 1.5;
    });

    await Promise.all(
      images.map(
        (image) =>
          new Promise<void>((resolve) => {
            if (image.complete) {
              resolve();
              return;
            }

            const finish = () => {
              clearTimeout(timeoutId);
              resolve();
            };

            const timeoutId = window.setTimeout(finish, imageLoadTimeoutMs);

            image.addEventListener("load", finish, { once: true });
            image.addEventListener("error", finish, { once: true });
          })
      )
    );
  });
}

async function waitForBackgroundImages(page: Page) {
  await page.evaluate(async () => {
    const backgroundLoadTimeoutMs = 5_000;
    const relevantViewportBottom = window.innerHeight * 1.5;
    const backgroundUrls = new Set<string>();

    const getBackgroundUrls = (value: string) =>
      Array.from(value.matchAll(/url\((['"]?)(.*?)\1\)/g))
        .map((match) => match[2])
        .filter((url) => Boolean(url));

    const isRelevantElement = (element: Element) => {
      const rect = element.getBoundingClientRect();

      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < relevantViewportBottom
      );
    };

    for (const element of document.querySelectorAll("*")) {
      if (!isRelevantElement(element)) {
        continue;
      }

      const backgroundImage = window.getComputedStyle(element).backgroundImage;

      if (!backgroundImage || backgroundImage === "none") {
        continue;
      }

      for (const url of getBackgroundUrls(backgroundImage)) {
        backgroundUrls.add(url);
      }
    }

    await Promise.all(
      Array.from(backgroundUrls).map(
        (url) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            const finish = () => {
              clearTimeout(timeoutId);
              resolve();
            };

            const timeoutId = window.setTimeout(
              finish,
              backgroundLoadTimeoutMs
            );

            image.addEventListener("load", finish, { once: true });
            image.addEventListener("error", finish, { once: true });
            image.src = url;
          })
      )
    );
  });
}
