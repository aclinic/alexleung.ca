export type ExperimentEntry = {
  description: string;
  id: string;
  lastModified: string;
  pageTitle: string;
  path: string;
  title: string;
};

const EXPERIMENT_LAST_MODIFIED_ISO = "2026-04-20";

type ExperimentsHub = Pick<
  ExperimentEntry,
  "description" | "lastModified" | "pageTitle" | "path" | "title"
>;

export const EXPERIMENTS_HUB: ExperimentsHub = {
  description:
    "Interactive browser-based tools for exploring systems, control, numerical methods, and runtime behavior.",
  path: "/experimental/",
  title: "Experiments | Alex Leung",
  pageTitle: "Experiments",
  lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
};

export function buildExperimentBreadcrumbItems(
  pageTitle: string,
  path: string
) {
  return [
    { name: "Home", item: "/" },
    { name: EXPERIMENTS_HUB.pageTitle, item: EXPERIMENTS_HUB.path },
    { name: pageTitle, item: path },
  ];
}

export const EXPERIMENTS: readonly ExperimentEntry[] = [
  {
    id: "event-loop",
    pageTitle: "Event Loop Visualizer",
    title: "Event Loop Visualizer | Alex Leung",
    description:
      "Interactive event loop visualizer for call stack, microtasks, tasks, timers, and execution order.",
    path: "/experimental/event-loop/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
  {
    id: "learning-dynamics",
    pageTitle: "Learning Dynamics Lab",
    title: "Learning Dynamics Lab | Alex Leung",
    description:
      "A client-side optimizer visualizer for comparing SGD, Momentum, RMSProp, and Adam on 2D loss surfaces.",
    path: "/experimental/learning-dynamics/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
  {
    id: "load-flow",
    pageTitle: "Load Flow",
    title: "Load Flow | Alex Leung",
    description:
      "A browser-based AC load flow workspace for building one-line models and solving bus voltages and power flows.",
    path: "/experimental/load-flow/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
  {
    id: "mandelbrot",
    pageTitle: "Mandelbrot Explorer",
    title: "Mandelbrot Explorer | Alex Leung",
    description:
      "An in-browser Mandelbrot set explorer with arbitrary-precision viewport math, progressive rendering, and shareable deep-zoom state.",
    path: "/experimental/mandelbrot/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
  {
    id: "pid-controller",
    pageTitle: "PID Controller Simulator",
    title: "PID Controller Simulator | Alex Leung",
    description:
      "Interactive fixed-step PID simulation that demonstrates rise time, overshoot, oscillation, and settling behavior.",
    path: "/experimental/pid-controller/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
];
