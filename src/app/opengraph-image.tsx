import { ImageResponse } from "next/og";

export const alt = "Alex Leung | Syntropy Engineer and Programmer, P.Eng.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "relative",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at 10% 15%, rgba(56,189,248,0.30), transparent 35%), radial-gradient(circle at 85% 80%, rgba(167,139,250,0.28), transparent 35%), linear-gradient(140deg, #0b1020 0%, #111827 50%, #172554 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 58,
          borderRadius: 32,
          border: "1px solid rgba(148, 163, 184, 0.35)",
          background: "rgba(2, 6, 23, 0.58)",
          padding: "48px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            border: "1px solid rgba(56, 189, 248, 0.55)",
            color: "#bae6fd",
            borderRadius: 999,
            padding: "8px 20px",
            fontSize: 24,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          alexleung.ca
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Alex Leung
        </div>
        <div
          style={{
            fontSize: 38,
            color: "#cbd5e1",
            lineHeight: 1.25,
          }}
        >
          Syntropy Engineer • Programmer • Writer
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#93c5fd",
          }}
        >
          Software, systems, and learning in public
        </div>
      </div>
    </div>,
    { ...size }
  );
}
