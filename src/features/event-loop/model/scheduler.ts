import {
  EventLoopState,
  Frame,
  Operation,
  QueueKind,
  RuntimeExample,
  ScheduledCallback,
  TimelineEvent,
  TimerEntry,
} from "@/features/event-loop/types";

let idCounter = 0;
const nextId = (prefix: string) => `${prefix}-${++idCounter}`;

const createTimelineEvent = (
  state: EventLoopState,
  type: TimelineEvent["type"],
  label: string,
  details: string
): TimelineEvent => ({
  id: nextId("evt"),
  tick: state.tick,
  type,
  label,
  details,
});

const pushTimeline = (
  state: EventLoopState,
  type: TimelineEvent["type"],
  label: string,
  details: string
): EventLoopState => ({
  ...state,
  timeline: [
    ...state.timeline,
    createTimelineEvent(state, type, label, details),
  ],
});

const pushFrame = (
  state: EventLoopState,
  label: string,
  source: QueueKind,
  operations: Operation[]
): EventLoopState => ({
  ...state,
  callStack: [
    ...state.callStack,
    {
      id: nextId("frame"),
      label,
      source,
      operations,
      cursor: 0,
    },
  ],
});

const replaceTopFrame = (
  state: EventLoopState,
  frame: Frame
): EventLoopState => ({
  ...state,
  callStack: [...state.callStack.slice(0, -1), frame],
});

const popFrame = (state: EventLoopState): EventLoopState => {
  const topFrame = state.callStack.at(-1);
  if (!topFrame) {
    return state;
  }

  const completedState = {
    ...state,
    callStack: state.callStack.slice(0, -1),
  };

  return pushTimeline(
    completedState,
    "complete",
    topFrame.label,
    `${topFrame.label} completed on the ${topFrame.source} queue.`
  );
};

const enqueueTask = (
  state: EventLoopState,
  callback: Omit<ScheduledCallback, "id" | "scheduledAtTick">
): EventLoopState => {
  const entry: ScheduledCallback = {
    ...callback,
    id: nextId("task"),
    scheduledAtTick: state.tick,
  };

  return {
    ...state,
    taskQueue: [...state.taskQueue, entry],
  };
};

const enqueueMicrotask = (
  state: EventLoopState,
  callback: Omit<ScheduledCallback, "id" | "scheduledAtTick">
): EventLoopState => {
  const entry: ScheduledCallback = {
    ...callback,
    id: nextId("microtask"),
    scheduledAtTick: state.tick,
  };

  return {
    ...state,
    microtaskQueue: [...state.microtaskQueue, entry],
  };
};

const scheduleTimer = (
  state: EventLoopState,
  callback: Omit<TimerEntry, "id" | "scheduledAtTick" | "queue">
): EventLoopState => ({
  ...state,
  timers: [
    ...state.timers,
    {
      ...callback,
      id: nextId("timer"),
      queue: "task",
      scheduledAtTick: state.tick,
    },
  ],
});

const promoteDueTimers = (state: EventLoopState): EventLoopState => {
  const dueTimers = state.timers
    .filter((timer) => timer.dueTick <= state.tick)
    .sort((left, right) => left.dueTick - right.dueTick);

  if (dueTimers.length === 0) {
    return state;
  }

  let nextState: EventLoopState = {
    ...state,
    timers: state.timers.filter((timer) => timer.dueTick > state.tick),
  };

  for (const timer of dueTimers) {
    nextState = enqueueTask(nextState, {
      label: timer.label,
      reason: timer.reason,
      operations: timer.operations,
      queue: "task",
    });

    nextState = pushTimeline(
      nextState,
      "schedule",
      timer.label,
      `${timer.label} moved from timers to the task queue at tick ${nextState.tick}.`
    );
  }

  return nextState;
};

const runOperation = (
  state: EventLoopState,
  frame: Frame,
  op: Operation
): EventLoopState => {
  let nextState = replaceTopFrame(state, {
    ...frame,
    cursor: frame.cursor + 1,
  });

  if (op.type === "log") {
    return pushTimeline(
      nextState,
      "run",
      op.label,
      op.details ?? `${op.label} runs immediately on the call stack.`
    );
  }

  if (op.type === "call") {
    nextState = pushTimeline(
      nextState,
      "run",
      op.label,
      `${op.label} is called synchronously and pushed onto the call stack.`
    );

    return pushFrame(nextState, op.label, "sync", op.operations);
  }

  if (op.type === "setTimeout") {
    nextState = scheduleTimer(nextState, {
      label: op.label,
      reason: op.reason,
      dueTick: nextState.tick + op.delayTicks,
      operations: op.callback,
    });

    return pushTimeline(
      nextState,
      "schedule",
      op.label,
      `${op.label} was scheduled with delay ${op.delayTicks} tick(s).`
    );
  }

  if (op.type === "promiseThen") {
    nextState = enqueueMicrotask(nextState, {
      label: op.label,
      reason: op.reason,
      operations: op.callback,
      queue: "microtask",
    });

    return pushTimeline(
      nextState,
      "schedule",
      op.label,
      `${op.label} was queued as a microtask by a resolved promise.`
    );
  }

  nextState = enqueueMicrotask(nextState, {
    label: op.label,
    reason: op.reason,
    operations: op.continuation,
    queue: "microtask",
  });

  nextState = pushTimeline(
    nextState,
    "schedule",
    op.label,
    `${op.label} continuation is queued as a microtask (async/await simplification).`
  );

  return popFrame(nextState);
};

export const createInitialState = (
  example: RuntimeExample
): EventLoopState => ({
  tick: 0,
  callStack: [
    {
      id: nextId("frame"),
      label: "global()",
      source: "sync",
      operations: example.operations,
      cursor: 0,
    },
  ],
  microtaskQueue: [],
  taskQueue: [],
  timers: [],
  timeline: [
    {
      id: nextId("evt"),
      tick: 0,
      type: "run",
      label: "Script start",
      details: `Started example: ${example.name}`,
    },
  ],
  completed: false,
});

const drainQueues = (state: EventLoopState): EventLoopState => {
  let nextState = promoteDueTimers(state);

  if (nextState.microtaskQueue.length > 0) {
    const [nextMicrotask, ...rest] = nextState.microtaskQueue;
    return pushFrame(
      {
        ...nextState,
        microtaskQueue: rest,
      },
      nextMicrotask.label,
      "microtask",
      nextMicrotask.operations
    );
  }

  if (nextState.taskQueue.length > 0) {
    const [nextTask, ...rest] = nextState.taskQueue;
    return pushFrame(
      {
        ...nextState,
        taskQueue: rest,
      },
      nextTask.label,
      "task",
      nextTask.operations
    );
  }

  if (nextState.timers.length > 0) {
    const nextTick = Math.min(
      ...nextState.timers.map((timer) => timer.dueTick)
    );
    nextState = {
      ...nextState,
      tick: nextTick,
    };

    return pushTimeline(
      nextState,
      "tick",
      "Clock advanced",
      `The event loop advanced to tick ${nextTick} waiting for the next timer.`
    );
  }

  return {
    ...pushTimeline(
      nextState,
      "idle",
      "Runtime idle",
      "All queues and timers are empty."
    ),
    completed: true,
  };
};

export const stepEventLoop = (state: EventLoopState): EventLoopState => {
  if (state.completed) {
    return state;
  }

  const topFrame = state.callStack.at(-1);
  if (topFrame) {
    const nextOperation = topFrame.operations[topFrame.cursor];

    if (nextOperation) {
      return runOperation(state, topFrame, nextOperation);
    }

    return popFrame(state);
  }

  return drainQueues({
    ...state,
    tick: state.tick + 1,
  });
};

export const inspectScheduledItem = (
  item: ScheduledCallback | TimerEntry
): string => {
  if ("dueTick" in item) {
    return `${item.label} (timer) waits until tick ${item.dueTick}. ${item.reason}`;
  }

  return `${item.label} (${item.queue}) queued at tick ${item.scheduledAtTick}. ${item.reason}`;
};

export const isFrameActive = (frame: Frame): boolean =>
  frame.cursor < frame.operations.length;
