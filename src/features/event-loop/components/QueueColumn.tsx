import { inspectScheduledItem } from "@/features/event-loop/model/scheduler";
import { ScheduledCallback, TimerEntry } from "@/features/event-loop/types";

type QueueColumnProps = {
  title: string;
  subtitle: string;
  items: (ScheduledCallback | TimerEntry)[];
  emptyLabel: string;
};

export function QueueColumn({
  title,
  subtitle,
  items,
  emptyLabel,
}: QueueColumnProps) {
  return (
    <section className="rounded-lg border border-gray-700 bg-gray-900/70 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-200">
        {title}
      </h3>
      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
      <ol className="mt-3 space-y-2">
        {items.length === 0 ? (
          <li className="rounded border border-dashed border-gray-700 p-2 text-xs text-gray-500">
            {emptyLabel}
          </li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className="rounded border border-emerald-700/60 bg-emerald-950/20 p-2"
              title={inspectScheduledItem(item)}
            >
              <p className="text-sm text-emerald-100">{item.label}</p>
              <p className="text-xs text-emerald-300">{item.reason}</p>
            </li>
          ))
        )}
      </ol>
    </section>
  );
}
