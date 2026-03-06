export function AppBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-screen overflow-hidden"
    >
      <div className="app-background-image absolute inset-0" />
      <div className="absolute inset-0 bg-slate-700/50" />
    </div>
  );
}
