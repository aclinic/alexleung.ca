import {
  expect,
  gotoAndStabilize,
  test,
  waitForStablePage,
} from "../../fixtures/stableRendering";

test("blog index navigates into a post and renders article metadata", async ({
  page,
}) => {
  await gotoAndStabilize(page, "/blog/");

  const firstPostCard = page
    .locator("main a[aria-label][href^='/blog/']")
    .first();
  const postTitle = await firstPostCard.getAttribute("aria-label");

  if (!postTitle) {
    throw new Error("Expected the first blog card to expose an aria-label.");
  }

  await firstPostCard.click();
  await waitForStablePage(page);

  await expect(
    page.getByRole("heading", { level: 1, name: postTitle })
  ).toBeVisible();
  await expect(page.locator("article time").first()).toContainText("Published");
  await expect(
    page.getByRole("heading", { name: "Get new posts by email" })
  ).toBeVisible();
});

test("contact page shows the email CTA and social profile links", async ({
  page,
}) => {
  await gotoAndStabilize(page, "/contact/");

  const main = page.locator("main");

  await expect(page.getByText("alex [at] alexleung.ca")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Subscribe" })).toBeVisible();
  await expect(main.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/aclyx"
  );
  await expect(main.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://www.github.com/aclyx"
  );
});

test("unknown routes render the exported not found page", async ({ page }) => {
  await gotoAndStabilize(page, "/this-route-should-not-exist/");

  await expect(
    page.getByRole("heading", { level: 1, name: "404" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Page Not Found" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Return Home" })).toHaveAttribute(
    "href",
    "/"
  );
});
