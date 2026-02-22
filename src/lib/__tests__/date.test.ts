import { formatIsoDateForDisplay } from "@/lib/date";

describe("formatIsoDateForDisplay", () => {
  it("formats ISO dates using UTC so output is timezone-stable", () => {
    expect(formatIsoDateForDisplay("2026-02-22T00:00:00.000Z")).toBe(
      "February 22, 2026"
    );
  });

  it("formats YYYY-MM-DD values as the same calendar day", () => {
    expect(formatIsoDateForDisplay("2026-02-22")).toBe("February 22, 2026");
  });
});
