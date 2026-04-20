import {
  expect,
  gotoAndStabilize,
  test,
  waitForStablePage,
} from "../../fixtures/stableRendering";

test("protection coordination workspace opens after acknowledgement and renders multiple curves", async ({
  page,
}) => {
  await gotoAndStabilize(page, "/experimental/protection-coordination/");

  const acknowledgementDialog = page.getByRole("dialog", {
    name: "Read this before using the TCC explorer",
  });

  await expect(acknowledgementDialog).toBeVisible();
  await acknowledgementDialog.getByRole("checkbox").check();
  await acknowledgementDialog
    .getByRole("button", { name: "Open workspace" })
    .click();
  await waitForStablePage(page);

  await expect(
    page.getByRole("heading", { level: 2, name: "Time-current plot" })
  ).toBeVisible();
  await expect(page.locator('[data-testid^="tcc-curve-"]')).toHaveCount(2);
  await expect(
    page.getByRole("heading", { level: 2, name: "Results and warnings" })
  ).toBeVisible();
});
