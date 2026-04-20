import type { ReactNode } from "react";

import { render } from "@testing-library/react";

import { Analytics } from "../Analytics";

let mockedPathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => mockedPathname),
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({
    children,
    dangerouslySetInnerHTML,
    id,
    src,
  }: {
    children?: ReactNode;
    dangerouslySetInnerHTML?: { __html: string };
    id?: string;
    src?: string;
  }) =>
    src ? (
      <script id={id} src={src} />
    ) : (
      <script id={id} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
        {children}
      </script>
    ),
}));

describe("Analytics", () => {
  beforeEach(() => {
    mockedPathname = "/";
    document.title = "Test title";

    const analyticsWindow = window as Window & {
      dataLayer?: unknown[];
      gtag?: jest.Mock;
    };

    delete analyticsWindow.dataLayer;
    delete analyticsWindow.gtag;
  });

  it("disables GA auto page views in the init script", () => {
    const { container } = render(<Analytics gaId="G-TEST123" />);

    expect(container.querySelector("#ga-init")?.textContent).toContain(
      "send_page_view: false"
    );
  });

  it("sends page views only when the pathname changes", () => {
    const gtag = jest.fn();
    const analyticsWindow = window as Window & {
      gtag?: jest.Mock;
    };

    analyticsWindow.gtag = gtag;

    const { rerender } = render(<Analytics gaId="G-TEST123" />);

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenLastCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_location: "http://localhost/",
        page_path: "/",
        page_title: "Test title",
      })
    );

    rerender(<Analytics gaId="G-TEST123" />);
    expect(gtag).toHaveBeenCalledTimes(1);

    mockedPathname = "/about/";
    rerender(<Analytics gaId="G-TEST123" />);

    expect(gtag).toHaveBeenCalledTimes(2);
    expect(gtag).toHaveBeenLastCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_location: "http://localhost/about/",
        page_path: "/about/",
      })
    );
  });
});
