type ExperimentEntry = {
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
    "Small browser tools for exploring systems, control loops, numerical methods, and runtime behavior.",
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
      "A small event loop visualizer for call stack, microtasks, tasks, timers, and execution order.",
    path: "/experimental/event-loop/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
  {
    id: "learning-dynamics",
    pageTitle: "Learning Dynamics Lab",
    title: "Learning Dynamics Lab | Alex Leung",
    description:
      "A client-side optimizer visualizer for comparing SGD, Momentum, RMSProp, and Adam on simple 2D loss surfaces.",
    path: "/experimental/learning-dynamics/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
  {
    id: "load-flow",
    pageTitle: "Load Flow",
    title: "Load Flow | Alex Leung",
    description:
      "A browser AC load flow workspace for editing one-line models and solving bus voltages and branch flows.",
    path: "/experimental/load-flow/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
  {
    id: "mandelbrot",
    pageTitle: "Mandelbrot Explorer",
    title: "Mandelbrot Explorer | Alex Leung",
    description:
      "An in-browser Mandelbrot explorer with arbitrary-precision viewport math, progressive rendering, and shareable zoom state.",
    path: "/experimental/mandelbrot/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
  {
    id: "pid-controller",
    pageTitle: "PID Controller Simulator",
    title: "PID Controller Simulator | Alex Leung",
    description:
      "Fixed-step PID simulation for trying gains and seeing rise time, overshoot, oscillation, and settling behavior.",
    path: "/experimental/pid-controller/",
    lastModified: EXPERIMENT_LAST_MODIFIED_ISO,
  },
];
