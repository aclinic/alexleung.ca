export function AppBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-screen bg-[linear-gradient(rgba(47,54,64,0.5),rgba(47,54,64,0.5)),url('/assets/background.webp')] bg-cover bg-center bg-no-repeat"
    />
  );
}
