# Event Loop Visualizer: model notes

## Architecture

- Runtime model and scheduler live under `src/features/event-loop/model/`.
- Shared type contracts live in `src/features/event-loop/types.ts`.
- UI components for stack/queues/timeline/controls live in `src/features/event-loop/components/`.
- The page integration and client composition live in `src/app/event-loop/`.

This split keeps scheduling logic deterministic and testable outside React.

## Intentional simplifications

This visualizer is conceptually faithful while intentionally simplified for teaching:

1. **Discrete ticks instead of wall-clock time.**
   Timer delay is represented as integer ticks (`delayTicks`) rather than milliseconds.
2. **Single task queue.**
   Browser task sources are collapsed into one macrotask queue.
3. **Simplified async/await.**
   `await` continuation is always modeled as an immediately settled microtask.
4. **No rendering pipeline phases.**
   The visualizer focuses on stack + queues + timers.

## Extension points

- Add new queue kinds by extending `QueueKind` and scheduler dequeue policy.
- Add more runnable examples in `examples.ts`.
- Add operation variants (e.g., `requestAnimationFrame`) by extending `Operation` and `runOperation`.
