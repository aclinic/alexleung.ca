import { ReactNode } from "react";

import Link from "next/link";

import { Chip, chipClassName } from "@/components/Chip";

type TagProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

export function Tag({ children, className = "", href }: TagProps) {
  const sharedClassName = `border-white/20 text-gray-200 ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={chipClassName(
          `${sharedClassName} transition-colors hover:border-accent-link hover:text-white`
        )}
      >
        {children}
      </Link>
    );
  }

  return <Chip className={sharedClassName}>{children}</Chip>;
}
