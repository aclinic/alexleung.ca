export function AppBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-screen bg-[url('/assets/background.webp')] bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:bg-black/50"
    />
  );
}
