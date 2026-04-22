import { act, fireEvent, render, screen } from "@testing-library/react";

import { LearningDynamicsLab } from "../LearningDynamicsLab";

describe("LearningDynamicsLab", () => {
  let originalRequestAnimationFrame: typeof window.requestAnimationFrame;
  let originalCancelAnimationFrame: typeof window.cancelAnimationFrame;

  beforeEach(() => {
    jest.useFakeTimers();
    originalRequestAnimationFrame = window.requestAnimationFrame;
    originalCancelAnimationFrame = window.cancelAnimationFrame;

    window.requestAnimationFrame = (callback) =>
      window.setTimeout(() => callback(Date.now()), 16);
    window.cancelAnimationFrame = (handle) => {
      window.clearTimeout(handle);
    };
  });

  afterEach(() => {
    window.requestAnimationFrame = originalRequestAnimationFrame;
    window.cancelAnimationFrame = originalCancelAnimationFrame;
    jest.useRealTimers();
  });

  it("updates the optimizer explanation when a run switches optimizers", () => {
    render(<LearningDynamicsLab />);

    fireEvent.change(screen.getByLabelText(/Run A optimizer/i), {
      target: { value: "momentum" },
    });

    expect(screen.getByText(/running velocity/i)).toBeInTheDocument();
  });

  it("plays, pauses, and resets the simulation", () => {
    render(<LearningDynamicsLab />);

    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    act(() => {
      jest.advanceTimersByTime(700);
    });

    const stepAfterPlay = Number(
      screen.getByTestId("run-a-step").textContent ?? "0"
    );
    expect(stepAfterPlay).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(screen.getByTestId("run-a-step")).toHaveTextContent(
      String(stepAfterPlay)
    );

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByTestId("run-a-step")).toHaveTextContent("0");
  });

  it("stops autoplay once the committed runs are no longer active", () => {
    render(<LearningDynamicsLab />);

    fireEvent.change(screen.getByLabelText("Start x"), {
      target: { value: "0" },
    });
    fireEvent.change(screen.getByLabelText("Start y"), {
      target: { value: "0" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Play" }));

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
    expect(screen.getByTestId("run-a-step")).toHaveTextContent("0");
  });

  it("single-steps and reflects the updated metrics", () => {
    render(<LearningDynamicsLab />);

    const initialPosition =
      screen.getByTestId("run-a-position").textContent ?? "";

    fireEvent.click(screen.getByRole("button", { name: "Single-step" }));

    expect(screen.getByTestId("run-a-step")).toHaveTextContent("1");
    expect(screen.getByTestId("run-a-position")).not.toHaveTextContent(
      initialPosition
    );
  });

  it("annotates the saddle surface with stable and unstable directions", () => {
    render(<LearningDynamicsLab />);

    fireEvent.change(screen.getAllByRole("combobox")[0], {
      target: { value: "saddle" },
    });

    expect(screen.getByText(/stable manifold y = 0/i)).toBeInTheDocument();
    expect(screen.getByText(/unstable direction/i)).toBeInTheDocument();
  });
});
