import { ReactNode } from "react";

type IconTextRowProps = {
  icon: string;
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function IconTextRow({
  icon,
  title,
  children,
  className,
  contentClassName,
}: IconTextRowProps) {
  return (
    <div className={`flex items-start gap-3 ${className ?? ""}`.trim()}>
      <span aria-hidden="true" className="mt-1 flex-shrink-0 text-xl">
        {icon}
      </span>
      <div className={contentClassName}>
        <h3 className="text-heading-sm mb-2 font-semibold">{title}</h3>
        <div className="space-y-3 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
