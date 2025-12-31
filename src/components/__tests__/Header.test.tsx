import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";
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
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Now")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  describe("Mobile Menu", () => {
    it("should toggle menu when button is clicked", () => {
      const { container } = render(<Header />);
      const button = screen.getByLabelText("Toggle menu");

      expect(container.querySelector(".fixed.inset-0")).not.toBeInTheDocument();

      fireEvent.click(button);
      expect(container.querySelector(".fixed.inset-0")).toBeInTheDocument();

      fireEvent.click(button);
      expect(container.querySelector(".fixed.inset-0")).not.toBeInTheDocument();
    });

    it("should close menu when backdrop is clicked", () => {
      const { container } = render(<Header />);
      const button = screen.getByLabelText("Toggle menu");

      fireEvent.click(button);
      const backdrop = container.querySelector(".fixed.inset-0");
      fireEvent.click(backdrop!);

      expect(container.querySelector(".fixed.inset-0")).not.toBeInTheDocument();
    });

    it("should close menu when navigation link is clicked", () => {
      const { container } = render(<Header />);
      const button = screen.getByLabelText("Toggle menu");

      fireEvent.click(button);
      const mobileLinks = screen.getAllByText("Home");
      fireEvent.click(mobileLinks[mobileLinks.length - 1]);

      expect(container.querySelector(".fixed.inset-0")).not.toBeInTheDocument();
    });
  });

  describe("Active Link Detection", () => {
    it("should mark current page link as active", () => {
      (usePathname as jest.Mock).mockReturnValue("/about/");
      render(<Header />);

      const aboutLink = screen.getByText("About").closest("a");
      const homeLink = screen.getByText("Home").closest("a");

      expect(aboutLink).toHaveClass("nav-link--active");
      expect(homeLink).toHaveClass("nav-link--inactive");
    });

    it("should handle trailing slashes in pathname matching", () => {
      (usePathname as jest.Mock).mockReturnValue("/about");
      render(<Header />);

      const aboutLink = screen.getByText("About").closest("a");
      expect(aboutLink).toHaveClass("nav-link--active");
    });

    it("should mark home link active only on exact home path", () => {
      (usePathname as jest.Mock).mockReturnValue("/");
      render(<Header />);

      const homeLink = screen.getByText("Home").closest("a");
      expect(homeLink).toHaveClass("nav-link--active");
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-label on menu button", () => {
      render(<Header />);
      expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
    });
  });
});
