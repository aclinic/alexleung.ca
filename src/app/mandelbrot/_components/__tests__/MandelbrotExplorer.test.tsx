import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { MandelbrotExplorer } from "../MandelbrotExplorer";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/mandelbrot/"),
}));

describe("MandelbrotExplorer", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/mandelbrot/");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the canvas shell and explorer controls", () => {
    render(<MandelbrotExplorer />);

    expect(
      screen.getByLabelText("Mandelbrot set rendering canvas")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
    expect(screen.getByLabelText(/Max iterations/i)).toHaveValue(180);
  });

  it("updates the viewport metadata when zoom controls are used", () => {
    render(<MandelbrotExplorer />);

    const initialWidth = screen.getByTestId("mandelbrot-width").textContent;
    fireEvent.click(screen.getAllByRole("button", { name: "Zoom in" })[0]);

    expect(screen.getByTestId("mandelbrot-width").textContent).not.toBe(
      initialWidth
    );
    expect(screen.getByTestId("mandelbrot-magnification")).toHaveTextContent(
      "2"
    );
  });

  it("supports undo, redo, and reset flows", async () => {
    render(<MandelbrotExplorer />);

    const initialWidth = screen.getByTestId("mandelbrot-width").textContent;
    fireEvent.click(screen.getAllByRole("button", { name: "Zoom in" })[0]);

    const zoomedWidth = screen.getByTestId("mandelbrot-width").textContent;
    expect(zoomedWidth).not.toBe(initialWidth);

    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(screen.getByTestId("mandelbrot-width").textContent).toBe(
      initialWidth
    );

    fireEvent.click(screen.getByRole("button", { name: "Redo" }));
    expect(screen.getByTestId("mandelbrot-width").textContent).toBe(
      zoomedWidth
    );

    fireEvent.click(screen.getByRole("button", { name: "Reset view" }));
    await waitFor(() => {
      expect(screen.getByTestId("mandelbrot-width").textContent).toBe(
        initialWidth
      );
    });
  });

  it("updates render settings controls and mirrors state to the URL", async () => {
    const replaceStateSpy = jest.spyOn(window.history, "replaceState");

    render(<MandelbrotExplorer />);

    fireEvent.change(screen.getByLabelText(/Max iterations/i), {
      target: { value: "320" },
    });
    fireEvent.change(screen.getByLabelText(/Render quality/i), {
      target: { value: "1" },
    });

    expect(screen.getByLabelText(/Max iterations/i)).toHaveValue(320);
    expect(screen.getByLabelText(/Render quality/i)).toHaveValue("1");

    await waitFor(() => {
      expect(replaceStateSpy).toHaveBeenCalled();
    });
    expect(replaceStateSpy.mock.calls.at(-1)?.[2]?.toString()).toContain(
      "iter=320"
    );

    replaceStateSpy.mockRestore();
  });

  it("cancels a pending wheel commit before reset commits a new viewport", async () => {
    jest.useFakeTimers();

    render(<MandelbrotExplorer />);

    const widthValue = screen.getByTestId("mandelbrot-width");
    const initialWidth = widthValue.textContent;
    const canvas = screen.getByLabelText("Mandelbrot set rendering canvas");

    fireEvent.wheel(canvas, {
      deltaY: -120,
      clientX: 24,
      clientY: 24,
    });

    expect(widthValue.textContent).not.toBe(initialWidth);

    fireEvent.click(screen.getByRole("button", { name: "Reset view" }));

    await waitFor(() => {
      expect(widthValue.textContent).toBe(initialWidth);
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(widthValue.textContent).toBe(initialWidth);
  });
});
