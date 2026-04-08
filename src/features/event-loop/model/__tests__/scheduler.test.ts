import {
  EVENT_LOOP_EXAMPLES,
  getExampleById,
} from "@/features/event-loop/model/examples";
import {
  createInitialState,
  inspectScheduledItem,
  stepEventLoop,
} from "@/features/event-loop/model/scheduler";

const runToCompletion = (exampleId: string) => {
  const example = getExampleById(exampleId);
  if (!example) {
    throw new Error(`Missing example ${exampleId}`);
  }

  let state = createInitialState(example);
  let safety = 0;

  while (!state.completed && safety < 150) {
    state = stepEventLoop(state);
    safety += 1;
  }

  if (!state.completed) {
    throw new Error("state did not complete");
  }

  return state;
};

describe("event loop scheduler", () => {
  it("executes promise microtasks before timeout tasks", () => {
    const state = runToCompletion("timeout-vs-promise");

    const labels = state.timeline
      .filter((event) => event.type === "run")
      .map((event) => event.label);

    expect(labels).toEqual([
      "Script start",
      "script start",
      "script end",
      "promise then fired",
      "timeout fired",
    ]);
  });

  it("drains nested microtasks before returning to task queue", () => {
    const state = runToCompletion("nested-queues");

    const labels = state.timeline
      .filter((event) => event.type === "run")
      .map((event) => event.label);

    expect(labels.indexOf("nested microtask runs")).toBeLessThan(
      labels.indexOf("inner timeout runs")
    );
  });

  it("marks runtime complete when queues are empty", () => {
    const state = runToCompletion("sync-basics");

    expect(state.completed).toBe(true);
    expect(state.callStack).toHaveLength(0);
    expect(state.taskQueue).toHaveLength(0);
    expect(state.microtaskQueue).toHaveLength(0);
    expect(state.timers).toHaveLength(0);
  });

  it("describes queued items for inspection tooltips", () => {
    const example = EVENT_LOOP_EXAMPLES[1];
    let state = createInitialState(example);
    state = stepEventLoop(state);
    state = stepEventLoop(state);

    expect(inspectScheduledItem(state.timers[0])).toMatch(/waits until tick/i);
  });

  it("handles simplified async-await continuation as a microtask", () => {
    const state = runToCompletion("async-await");
    const runLabels = state.timeline
      .filter((event) => event.type === "run")
      .map((event) => event.label);

    expect(runLabels).toEqual([
      "Script start",
      "before async call",
      "runAsync()",
      "async start",
      "after async call",
      "async resumed",
    ]);
  });
});
