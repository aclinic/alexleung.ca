import {
  expect,
  gotoAndStabilize,
  test,
  waitForStablePage,
} from "../../fixtures/stableRendering";

test("home top fold stays visually stable", async ({ page }) => {
  await gotoAndStabilize(page, "/");

  await expect(page).toHaveScreenshot("home-top-fold.png");
});

test("about top fold stays visually stable", async ({ page }) => {
  await gotoAndStabilize(page, "/about/");
  await page.mouse.wheel(0, 240);
  await waitForStablePage(page);

  await expect(page).toHaveScreenshot("about-top-fold.png");
});
