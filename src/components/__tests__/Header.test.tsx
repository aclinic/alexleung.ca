import { usePathname } from "next/navigation";

import { fireEvent, render, screen } from "@testing-library/react";

import Header from "../Header";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render navigation with logo and links", () => {
    render(<Header />);
    expect(screen.getByText("Alex Leung")).toBeInTheDocument();
    expect(screen.getAllByText("Home")).toHaveLength(1);
    expect(screen.getAllByText("About")).toHaveLength(1);
    expect(screen.getAllByText("Now")).toHaveLength(1);
    expect(screen.getAllByText("Contact")).toHaveLength(1);
  });

  describe("Mobile Menu", () => {
    it("should toggle menu visibility via aria-expanded", () => {
      render(<Header />);
      const button = screen.getByRole("button", { name: "Open menu" });

      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-controls", "mobile-nav-drawer");

      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(button).toHaveAccessibleName("Close menu");

      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAccessibleName("Open menu");
    });

    it("should mount and unmount mobile menu when toggled", () => {
      const { container } = render(<Header />);
      const button = screen.getByRole("button", { name: "Open menu" });

      expect(
        container.querySelector(".mobile-nav-link")
      ).not.toBeInTheDocument();
      expect(screen.getAllByText("Home")).toHaveLength(1);

      fireEvent.click(button);
      expect(container.querySelector(".mobile-nav-link")).toBeInTheDocument();
      expect(screen.getAllByText("Home")).toHaveLength(2);

      fireEvent.click(button);
      expect(
        container.querySelector(".mobile-nav-link")
      ).not.toBeInTheDocument();
      expect(screen.getAllByText("Home")).toHaveLength(1);
    });

    it("should close menu when backdrop is clicked", () => {
      const { container } = render(<Header />);
      const button = screen.getByRole("button", { name: "Open menu" });

      fireEvent.click(button);
      const backdrop = container.querySelector(".fixed.inset-0");
      fireEvent.click(backdrop!);

      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should close menu when navigation link is clicked", () => {
      render(<Header />);
      const button = screen.getByRole("button", { name: "Open menu" });

      fireEvent.click(button);
      const mobileLink = screen.getAllByText("Home")[1];
      fireEvent.click(mobileLink);

      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Active Link Detection", () => {
    it("should mark current page link as active", () => {
      (usePathname as jest.Mock).mockReturnValue("/about/");
      render(<Header />);

      const aboutLink = screen.getByText("About");
      const homeLink = screen.getByText("Home");

      expect(aboutLink).toHaveClass("nav-link--active");
      expect(homeLink).toHaveClass("nav-link--inactive");
    });

    it("should handle trailing slashes in pathname matching", () => {
      (usePathname as jest.Mock).mockReturnValue("/about");
      render(<Header />);

      const aboutLink = screen.getByText("About");
      expect(aboutLink).toHaveClass("nav-link--active");
    });

    it("should mark home link active only on exact home path", () => {
      (usePathname as jest.Mock).mockReturnValue("/");
      render(<Header />);

      const homeLink = screen.getByText("Home");
      expect(homeLink).toHaveClass("nav-link--active");
    });

    it("should set aria-current on active links across desktop and mobile nav", () => {
      (usePathname as jest.Mock).mockReturnValue("/about/");
      render(<Header />);

      const button = screen.getByRole("button", { name: "Open menu" });
      fireEvent.click(button);

      const aboutLinks = screen.getAllByText("About");
      expect(aboutLinks[0]).toHaveAttribute("aria-current", "page");
      expect(aboutLinks[1]).toHaveAttribute("aria-current", "page");

      const homeLinks = screen.getAllByText("Home");
      expect(homeLinks[0]).not.toHaveAttribute("aria-current");
      expect(homeLinks[1]).not.toHaveAttribute("aria-current");
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-label on menu button", () => {
      render(<Header />);
      expect(
        screen.getByRole("button", { name: "Open menu" })
      ).toBeInTheDocument();
    });

    it("should have aria-expanded attribute on menu button", () => {
      render(<Header />);
      const button = screen.getByRole("button", { name: "Open menu" });
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should not render mobile links when menu is closed", () => {
      render(<Header />);
      expect(screen.getAllByText("Home")).toHaveLength(1);
    });

    it("should set tabIndex=0 on mobile links when menu is open", () => {
      render(<Header />);
      const button = screen.getByRole("button", { name: "Open menu" });

      fireEvent.click(button);

      const mobileLink = screen.getAllByText("Home")[1];
      expect(mobileLink).toHaveAttribute("tabindex", "0");
    });

    it("should close the mobile menu when Escape is pressed", () => {
      render(<Header />);
      const button = screen.getByRole("button", { name: "Open menu" });

      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      fireEvent.keyDown(document, { key: "Escape" });
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should return focus to the menu button when the menu closes", () => {
      render(<Header />);
      const button = screen.getByRole("button", { name: "Open menu" });

      fireEvent.click(button);
      fireEvent.keyDown(document, { key: "Escape" });

      expect(button).toHaveFocus();
    });
  });
});
