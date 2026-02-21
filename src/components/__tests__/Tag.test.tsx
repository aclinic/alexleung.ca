import { render, screen } from "@testing-library/react";

import { Tag } from "../Tag";

describe("Tag", () => {
  it("renders content with base classes", () => {
    render(<Tag>TypeScript</Tag>);

    const tag = screen.getByText("TypeScript");
    expect(tag).toHaveClass("rounded-full", "border", "text-xs");
  });
});
