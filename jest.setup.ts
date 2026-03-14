// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock window.matchMedia for components that use media queries
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

if (!window.performance.mark) {
  // `@next/third-parties` records feature usage on mount, but JSDOM doesn't
  // implement `performance.mark`, so layout tests need a lightweight shim.
  Object.defineProperty(window.performance, "mark", {
    writable: true,
    value: jest.fn(),
  });
}
