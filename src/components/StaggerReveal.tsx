import { ReactNode } from "react";

type StaggerRevealProps = {
  children: ReactNode;
  delayMs: number;
  className?: string;
};

export function StaggerReveal({
  children,
  delayMs,
  className = "",
}: StaggerRevealProps) {
  return (
    <div
      className={`animate-showTopText opacity-0 ${className}`.trim()}
      style={{ animationDelay: `${delayMs}ms`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
}
