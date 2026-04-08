import { RuntimeExample } from "@/features/event-loop/types";

export const EVENT_LOOP_EXAMPLES: RuntimeExample[] = [
  {
    id: "sync-basics",
    name: "Simple synchronous flow",
    description: "Shows stack-first execution with no queued async work.",
    learningPoints: [
      "Synchronous statements run immediately in order.",
      "The call stack must clear before the loop checks queues.",
    ],
    operations: [
      {
        id: "sync-1",
        type: "log",
        label: "console.log('A')",
      },
      {
        id: "sync-2",
        type: "call",
        label: "runHelper()",
        operations: [
          {
            id: "sync-2-1",
            type: "log",
            label: "helper body",
          },
        ],
      },
      {
        id: "sync-3",
        type: "log",
        label: "console.log('B')",
      },
    ],
  },
  {
    id: "timeout-vs-promise",
    name: "setTimeout(0) vs Promise.then",
    description:
      "Illustrates microtasks running before the next task queue callback.",
    learningPoints: [
      "Promise callbacks are microtasks.",
      "Microtasks are drained before the event loop takes the next task.",
      "setTimeout(..., 0) still becomes a task that runs later.",
    ],
    operations: [
      {
        id: "tp-1",
        type: "log",
        label: "script start",
      },
      {
        id: "tp-2",
        type: "setTimeout",
        label: "timeout callback",
        delayTicks: 0,
        reason: "Timers enqueue their callback into the task queue.",
        callback: [{ id: "tp-2-1", type: "log", label: "timeout fired" }],
      },
      {
        id: "tp-3",
        type: "promiseThen",
        label: "promise then callback",
        reason: "A resolved Promise queues then-callbacks as microtasks.",
        callback: [{ id: "tp-3-1", type: "log", label: "promise then fired" }],
      },
      {
        id: "tp-4",
        type: "log",
        label: "script end",
      },
    ],
  },
  {
    id: "nested-queues",
    name: "Nested scheduling",
    description:
      "Demonstrates async callbacks that schedule more work while running.",
    learningPoints: [
      "A task callback can queue microtasks and additional timers.",
      "Microtasks still run before the loop returns to tasks.",
    ],
    operations: [
      {
        id: "nq-1",
        type: "setTimeout",
        label: "outer timeout",
        delayTicks: 1,
        reason: "The first timer callback is deferred by one tick.",
        callback: [
          { id: "nq-1-1", type: "log", label: "outer timeout starts" },
          {
            id: "nq-1-2",
            type: "promiseThen",
            label: "microtask from timeout",
            reason: "Promise.then inside timeout queues microtask.",
            callback: [
              { id: "nq-1-2-1", type: "log", label: "nested microtask runs" },
            ],
          },
          {
            id: "nq-1-3",
            type: "setTimeout",
            label: "inner timeout",
            delayTicks: 0,
            reason: "Timer callback enqueues another task.",
            callback: [
              { id: "nq-1-3-1", type: "log", label: "inner timeout runs" },
            ],
          },
        ],
      },
      { id: "nq-2", type: "log", label: "sync tail" },
    ],
  },
  {
    id: "async-await",
    name: "Async / await style flow",
    description:
      "Uses a simplified await model where continuation resumes as a microtask.",
    learningPoints: [
      "await pauses the async function body.",
      "After awaited value resolves, continuation runs as a microtask.",
    ],
    operations: [
      { id: "aa-1", type: "log", label: "before async call" },
      {
        id: "aa-2",
        type: "call",
        label: "runAsync()",
        operations: [
          { id: "aa-2-1", type: "log", label: "async start" },
          {
            id: "aa-2-2",
            type: "await",
            label: "await fetchData()",
            reason:
              "In real runtimes, continuation is queued after promise settlement. This model treats it as immediate settlement for clarity.",
            continuation: [
              { id: "aa-2-2-1", type: "log", label: "async resumed" },
            ],
          },
        ],
      },
      { id: "aa-3", type: "log", label: "after async call" },
    ],
  },
];

export const getExampleById = (id: string): RuntimeExample | undefined =>
  EVENT_LOOP_EXAMPLES.find((example) => example.id === id);
