import { expect, gotoAndStabilize, test } from "../../fixtures/stableRendering";

test("mandelbrot explorer zooms and resets cleanly", async ({ page }) => {
  await gotoAndStabilize(page, "/mandelbrot/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Mandelbrot Explorer" })
  ).toBeVisible();
  await expect(
    page.getByLabel("Mandelbrot set rendering canvas")
  ).toBeVisible();

  const widthValue = page.getByTestId("mandelbrot-width");
  const initialWidth = await widthValue.textContent();

  await page.getByRole("button", { name: "Reset view" }).click();
  await page.getByRole("button", { name: "Zoom in" }).first().click();

  await expect(widthValue).not.toHaveText(initialWidth ?? "");
  await expect(page.getByTestId("mandelbrot-magnification")).toContainText("2");

  await page.getByRole("button", { name: "Reset view" }).click();
  await expect(widthValue).toHaveText(initialWidth ?? "");
});
