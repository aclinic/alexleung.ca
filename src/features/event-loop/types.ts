export type QueueKind = "sync" | "microtask" | "task";

export type TimelineEventType =
  | "run"
  | "schedule"
  | "complete"
  | "idle"
  | "tick";

export type Operation =
  | {
      id: string;
      type: "log";
      label: string;
      details?: string;
    }
  | {
      id: string;
      type: "call";
      label: string;
      operations: Operation[];
    }
  | {
      id: string;
      type: "setTimeout";
      label: string;
      delayTicks: number;
      reason: string;
      callback: Operation[];
    }
  | {
      id: string;
      type: "promiseThen";
      label: string;
      reason: string;
      callback: Operation[];
    }
  | {
      id: string;
      type: "await";
      label: string;
      reason: string;
      continuation: Operation[];
    };

export type ScheduledCallback = {
  id: string;
  label: string;
  reason: string;
  queue: Exclude<QueueKind, "sync">;
  operations: Operation[];
  scheduledAtTick: number;
};

export type TimerEntry = ScheduledCallback & {
  dueTick: number;
};

export type Frame = {
  id: string;
  label: string;
  source: QueueKind;
  operations: Operation[];
  cursor: number;
};

export type TimelineEvent = {
  id: string;
  tick: number;
  type: TimelineEventType;
  label: string;
  details: string;
};

export type EventLoopState = {
  tick: number;
  callStack: Frame[];
  microtaskQueue: ScheduledCallback[];
  taskQueue: ScheduledCallback[];
  timers: TimerEntry[];
  timeline: TimelineEvent[];
  completed: boolean;
};

export type RuntimeExample = {
  id: string;
  name: string;
  description: string;
  learningPoints: string[];
  operations: Operation[];
};
