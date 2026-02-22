import { ReactNode } from "react";

import { Chip, chipClassName } from "@/components/Chip";

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function tagClassName(className = "") {
  return chipClassName(`border-white/20 text-gray-200 ${className}`.trim());
}

export function Tag({ children, className = "" }: TagProps) {
  return <Chip className={tagClassName(className)}>{children}</Chip>;
}
