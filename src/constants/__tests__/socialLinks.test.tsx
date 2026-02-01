import { render } from "@testing-library/react";

import { data } from "../socialLinks";

describe("socialLinks", () => {
  it("should have valid social link data", () => {
    expect(data.length).toBeGreaterThan(0);

    data.forEach((link) => {
      expect(link.id).toBeDefined();
      expect(link.url).toMatch(/^https?:\/\/.+/);
      expect(link.label).toBeTruthy();
      expect(link.icon).toBeDefined();
    });
  });

  it("should have unique IDs", () => {
    const ids = data.map((link) => link.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should render icons without errors", () => {
    data.forEach((link) => {
      const { container } = render(<div>{link.icon}</div>);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });
});
