import { expect, gotoAndStabilize, test } from "../../fixtures/stableRendering";

test("experiments hub top fold stays visually stable", async ({ page }) => {
  await gotoAndStabilize(page, "/experimental/");

  await expect(page).toHaveScreenshot("experiments-index-top-fold.png");
});
