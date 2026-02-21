import { ReactNode } from "react";

type ProseContentProps = {
  className?: string;
  children?: ReactNode;
  html?: string;
};

const proseClasses =
  "prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent-link prose-a:no-underline hover:prose-a:text-accent-link-hover hover:prose-a:underline prose-strong:text-white prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/50 md:prose-lg";

export function ProseContent({
  className = "",
  children,
  html,
}: ProseContentProps) {
  if (html) {
    return (
      <div
        className={`${proseClasses} ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className={`${proseClasses} ${className}`.trim()}>{children}</div>
  );
}
