import type { Page } from "@playwright/test";

import {
  expect,
  gotoAndStabilize,
  test,
  waitForStablePage,
} from "../../fixtures/stableRendering";

async function clickPrimaryNavLink(page: Page, label: string) {
  const menuButton = page.getByRole("button", { name: /Open menu|Close menu/ });

  if (await menuButton.isVisible().catch(() => false)) {
    await menuButton.click();
    await page
      .locator("#mobile-nav-drawer")
      .getByRole("link", { name: label })
      .click();
    return;
  }

  await page
    .locator("header")
    .getByRole("link", { name: label, exact: true })
    .click();
}

test("home page renders the hero content", async ({ page }) => {
  await gotoAndStabilize(page, "/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Alex Leung" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What you'll find here" })
  ).toBeVisible();
});

test("primary navigation routes render expected page headings", async ({
  page,
}) => {
  await gotoAndStabilize(page, "/");

  const routes = [
    { label: "About", heading: "About Me" },
    { label: "Blog", heading: "Blog" },
    { label: "Contact", heading: "Contact" },
  ];

  for (const route of routes) {
    await clickPrimaryNavLink(page, route.label);
    await waitForStablePage(page);

    await expect(
      page.getByRole("heading", { level: 1, name: route.heading })
    ).toBeVisible();
  }
});
