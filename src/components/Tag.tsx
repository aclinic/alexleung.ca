import { ReactNode } from "react";

import { Chip } from "@/components/Chip";

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className = "" }: TagProps) {
  return (
    <Chip className={`border-white/20 text-gray-200 ${className}`.trim()}>
      {children}
    </Chip>
  );
}
