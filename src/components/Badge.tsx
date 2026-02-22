import { ReactNode } from "react";

import { Chip, chipClassName } from "@/components/Chip";

type BadgeTone = "info" | "success" | "warning";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClasses: Record<BadgeTone, string> = {
  info: "border-accent-link/50 bg-accent-link/25 text-white",
  success: "border-accent-success/40 bg-accent-success/15 text-accent-success",
  warning: "border-accent-warning/40 bg-accent-warning/15 text-accent-warning",
};

export function badgeClassName({
  tone = "info",
  className = "",
}: {
  tone?: BadgeTone;
  className?: string;
}) {
  return chipClassName(`${toneClasses[tone]} ${className}`.trim());
}

export function Badge({ children, tone = "info", className = "" }: BadgeProps) {
  return (
    <Chip className={badgeClassName({ tone, className })}>{children}</Chip>
  );
}
