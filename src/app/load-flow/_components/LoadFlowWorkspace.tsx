export function LoadFlowWorkspace() {
  return (
    <section className="rounded-xl border border-gray-700 bg-gray-900/60 p-6 shadow-sm">
      <h2 className="text-heading-sm text-white">Workspace (MVP)</h2>
      <p className="text-body mt-2 text-gray-300">
        The interactive one-line diagram editor and solver controls will land in
        the next implementation slices.
      </p>

      <div className="mt-6 grid gap-3 text-sm text-gray-300 md:grid-cols-3">
        <div className="rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white">Canvas Panel</h3>
          <p className="mt-1">Node and branch editing placeholder.</p>
        </div>

        <div className="rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white">Properties Panel</h3>
          <p className="mt-1">Element property form placeholder.</p>
        </div>

        <div className="rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white">Solve + Results</h3>
          <p className="mt-1">Solver controls and results placeholder.</p>
        </div>
      </div>
    </section>
  );
}
