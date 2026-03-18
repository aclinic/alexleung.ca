import {
  expect,
  gotoAndStabilize,
  test,
  waitForStablePage,
} from "../../fixtures/stableRendering";

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

  const header = page.locator("header");
  const routes = [
    { label: "About", heading: "About Me" },
    { label: "Blog", heading: "Blog" },
    { label: "Contact", heading: "Contact" },
  ];

  for (const route of routes) {
    await header.getByRole("link", { name: route.label }).click();
    await waitForStablePage(page);

    await expect(
      page.getByRole("heading", { level: 1, name: route.heading })
    ).toBeVisible();
  }
});
