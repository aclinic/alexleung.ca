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
    // Both desktop and mobile links exist, so use getAllByText
    expect(screen.getAllByText("Home")).toHaveLength(2);
    expect(screen.getAllByText("About")).toHaveLength(2);
    expect(screen.getAllByText("Now")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
  });

  describe("Mobile Menu", () => {
    it("should toggle menu visibility via aria-expanded", () => {
      render(<Header />);
      const button = screen.getByLabelText("Toggle menu");

      expect(button).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should toggle menu open state classes when button is clicked", () => {
      const { container } = render(<Header />);
      const button = screen.getByLabelText("Toggle menu");
      const backdrop = container.querySelector("[aria-hidden]");

      // Initially closed - backdrop has opacity-0
      expect(backdrop).toHaveClass("opacity-0");

      fireEvent.click(button);
      // After opening - backdrop has opacity-100
      expect(backdrop).toHaveClass("opacity-100");

      fireEvent.click(button);
      // After closing - backdrop back to opacity-0
      expect(backdrop).toHaveClass("opacity-0");
    });

    it("should close menu when backdrop is clicked", () => {
      const { container } = render(<Header />);
      const button = screen.getByLabelText("Toggle menu");

      fireEvent.click(button);
      const backdrop = container.querySelector(".fixed.inset-0");
      fireEvent.click(backdrop!);

      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should close menu when navigation link is clicked", () => {
      render(<Header />);
      const button = screen.getByLabelText("Toggle menu");

      fireEvent.click(button);
      const mobileLinks = screen.getAllByText("Home");
      fireEvent.click(mobileLinks[mobileLinks.length - 1]);

      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Active Link Detection", () => {
    it("should mark current page link as active", () => {
      (usePathname as jest.Mock).mockReturnValue("/about/");
      render(<Header />);

      // Get desktop nav links (first occurrence)
      const aboutLinks = screen.getAllByText("About");
      const homeLinks = screen.getAllByText("Home");

      expect(aboutLinks[0].closest("a")).toHaveClass("nav-link--active");
      expect(homeLinks[0].closest("a")).toHaveClass("nav-link--inactive");
    });

    it("should handle trailing slashes in pathname matching", () => {
      (usePathname as jest.Mock).mockReturnValue("/about");
      render(<Header />);

      const aboutLinks = screen.getAllByText("About");
      expect(aboutLinks[0].closest("a")).toHaveClass("nav-link--active");
    });

    it("should mark home link active only on exact home path", () => {
      (usePathname as jest.Mock).mockReturnValue("/");
      render(<Header />);

      const homeLinks = screen.getAllByText("Home");
      expect(homeLinks[0].closest("a")).toHaveClass("nav-link--active");
    });

    it("should set aria-current on active links across desktop and mobile nav", () => {
      (usePathname as jest.Mock).mockReturnValue("/about/");
      render(<Header />);

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
      expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
    });

    it("should have aria-expanded attribute on menu button", () => {
      render(<Header />);
      const button = screen.getByLabelText("Toggle menu");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should set tabIndex=-1 on mobile links when menu is closed", () => {
      render(<Header />);
      const mobileLinks = screen.getAllByText("Home");
      // Mobile link is the second one
      expect(mobileLinks[1]).toHaveAttribute("tabindex", "-1");
    });

    it("should set tabIndex=0 on mobile links when menu is open", () => {
      render(<Header />);
      const button = screen.getByLabelText("Toggle menu");

      fireEvent.click(button);

      const mobileLinks = screen.getAllByText("Home");
      expect(mobileLinks[1]).toHaveAttribute("tabindex", "0");
    });
  });
});
