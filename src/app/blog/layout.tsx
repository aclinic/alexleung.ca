import { PropsWithChildren } from "react";

// Import KaTeX here (blog segment layout) instead of globals so Next only
// includes math CSS on /blog routes. This keeps the home page's initial CSS
// payload and style parsing work lower.
import "katex/dist/katex.min.css";

export default function BlogLayout({ children }: PropsWithChildren) {
  return children;
}
