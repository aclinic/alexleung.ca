import { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/20 px-2.5 py-1 text-xs font-semibold text-gray-200 ${className}`.trim()}
    >
      {children}
    </span>
  );
}
