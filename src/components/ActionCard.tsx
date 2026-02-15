import { ReactNode } from "react";

import Link from "next/link";

export interface ActionCardProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

/**
 * Interactive surface used when an entire card is actionable.
 */
export function ActionCard({
  href,
  children,
  className = "",
  ariaLabel,
  external = false,
}: ActionCardProps) {
  const baseStyles = "action-card group block p-6";
  const combinedClassName = `${baseStyles} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer me"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={combinedClassName}>
      {children}
    </Link>
  );
}
