import { getCoverVariantPath } from "@/lib/coverVariants";

describe("coverVariants", () => {
  test("returns undefined when source is missing", () => {
    expect(getCoverVariantPath(undefined, "card")).toBeUndefined();
  });

  test("returns variant path when generated asset exists on disk", () => {
    expect(
      getCoverVariantPath(
        "/assets/blog/everyone-is-a-builder/cover.webp",
        "card"
      )
    ).toBe("/assets/blog/everyone-is-a-builder/cover-card.webp");
    expect(
      getCoverVariantPath(
        "/assets/blog/everyone-is-a-builder/cover.webp",
        "hero"
      )
    ).toBe("/assets/blog/everyone-is-a-builder/cover-hero.webp");
  });

  test("normalizes relative source paths", () => {
    expect(
      getCoverVariantPath(
        "assets/blog/everyone-is-a-builder/cover.webp",
        "card"
      )
    ).toBe("/assets/blog/everyone-is-a-builder/cover-card.webp");
  });

  test("returns undefined when generated asset does not exist", () => {
    expect(
      getCoverVariantPath("/assets/blog/not-a-real-post/cover.webp", "card")
    ).toBeUndefined();
    expect(
      getCoverVariantPath("/assets/blog/not-a-real-post/cover.jpg", "hero")
    ).toBeUndefined();
  });

  test("returns undefined when source has no extension and generated file is missing", () => {
    expect(
      getCoverVariantPath("/assets/blog/not-a-real-post/cover", "card")
    ).toBeUndefined();
  });
});
