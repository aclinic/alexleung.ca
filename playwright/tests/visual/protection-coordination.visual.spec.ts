import {
  expect,
  gotoAndStabilize,
  test,
  waitForStablePage,
} from "../../fixtures/stableRendering";

const ACKNOWLEDGEMENT_STORAGE_KEY =
  "protection-coordination:first-use-acknowledged:v1";

test("protection coordination workspace stays visually stable", async ({
  page,
}) => {
  await page.addInitScript((storageKey) => {
    window.localStorage.setItem(storageKey, "accepted");
  }, ACKNOWLEDGEMENT_STORAGE_KEY);

  await gotoAndStabilize(page, "/experimental/protection-coordination/");
  await page.mouse.wheel(0, 320);
  await waitForStablePage(page);

  await expect(page).toHaveScreenshot("protection-coordination-workspace.png");
});
