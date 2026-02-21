import { ReactNode } from "react";

import { LinkText } from "@/components/LinkText";

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function ExternalLink({
  href,
  children,
  className,
}: ExternalLinkProps) {
  return (
    <LinkText href={href} external className={className}>
      {children}
    </LinkText>
  );
}
