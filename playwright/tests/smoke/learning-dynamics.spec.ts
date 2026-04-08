import { expect, gotoAndStabilize, test } from "../../fixtures/stableRendering";

test("learning dynamics lab plays and resets a run", async ({ page }) => {
  await gotoAndStabilize(page, "/learning-dynamics/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Learning Dynamics Lab" })
  ).toBeVisible();
  await expect(page.getByLabel("Loss surface")).toBeVisible();

  const runAStep = page.getByTestId("run-a-step");
  await expect(runAStep).toHaveText("0");

  await page.getByRole("button", { name: "Play" }).click();
  await expect(runAStep).not.toHaveText("0");

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(runAStep).toHaveText("0");
});
