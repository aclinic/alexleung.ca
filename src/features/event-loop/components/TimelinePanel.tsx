import { TimelineEvent } from "@/features/event-loop/types";

type TimelinePanelProps = {
  events: TimelineEvent[];
};

const EVENT_COLORS: Record<TimelineEvent["type"], string> = {
  run: "text-sky-200",
  schedule: "text-amber-200",
  complete: "text-lime-200",
  idle: "text-gray-300",
  tick: "text-violet-200",
};

export function TimelinePanel({ events }: TimelinePanelProps) {
  return (
    <section className="rounded-lg border border-gray-700 bg-gray-900/70 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-200">
        Execution timeline
      </h3>
      <p className="mt-1 text-xs text-gray-400">
        Ordered log of what happened and why.
      </p>
      <ol className="mt-3 max-h-80 space-y-2 overflow-y-auto pr-1">
        {[...events].reverse().map((event) => (
          <li
            key={event.id}
            className="rounded border border-gray-700 bg-gray-800/50 p-2"
          >
            <p className={`text-sm ${EVENT_COLORS[event.type]}`}>
              t{event.tick} • {event.label}
            </p>
            <p className="text-xs text-gray-300">{event.details}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
