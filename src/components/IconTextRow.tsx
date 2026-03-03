import { ReactNode } from "react";

type IconTextRowProps = {
  icon: string;
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headingLevel?: "h2" | "h3" | "h4";
};

export function IconTextRow({
  icon,
  title,
  children,
  className,
  contentClassName,
  headingLevel = "h3",
}: IconTextRowProps) {
  const HeadingTag = headingLevel;

  return (
    <div className={`flex items-start gap-3 ${className ?? ""}`.trim()}>
      <span aria-hidden="true" className="mt-1 flex-shrink-0 text-xl">
        {icon}
      </span>
      <div className={contentClassName}>
        <HeadingTag className="text-heading-sm mb-2 font-semibold">
          {title}
        </HeadingTag>
        <div className="space-y-3 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
