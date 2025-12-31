import { ReactNode } from "react";

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function ExternalLink({
  href,
  children,
  className = "text-accent-link hover:text-accent-link-hover transition-colors underline decoration-accent-link/50 hover:decoration-accent-link-hover",
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
