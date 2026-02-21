import { ReactNode } from "react";

type BadgeTone = "info" | "success" | "warning";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClasses: Record<BadgeTone, string> = {
  info: "border-accent-link/40 bg-accent-link/15 text-accent-link",
  success: "border-accent-success/40 bg-accent-success/15 text-accent-success",
  warning: "border-accent-warning/40 bg-accent-warning/15 text-accent-warning",
};

export function Badge({ children, tone = "info", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
