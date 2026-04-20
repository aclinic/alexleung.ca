import { expect, gotoAndStabilize, test } from "../../fixtures/stableRendering";

test("blog index top fold stays visually stable", async ({ page }) => {
  await gotoAndStabilize(page, "/blog/");

  await expect(page).toHaveScreenshot("blog-index-top-fold.png");
});

test("blog post top fold stays visually stable", async ({ page }) => {
  await gotoAndStabilize(page, "/blog/boring-blog-architecture/");

  await expect(page).toHaveScreenshot("blog-post-top-fold.png");
});

test("tag archive top fold stays visually stable", async ({ page }) => {
  await gotoAndStabilize(page, "/blog/tags/ai/");

  await expect(page).toHaveScreenshot("blog-tag-archive-top-fold.png");
});
