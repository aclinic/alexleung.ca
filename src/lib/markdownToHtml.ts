import type { Element, Root, RootContent } from "hast";
import type { Schema } from "hast-util-sanitize";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";

import {
  getImageVariantSourceSet,
  getInlineContentVariantProfile,
  getLargestImageVariant,
} from "@/lib/imageVariantManifest";

const sanitizeSchema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    pre: [...(defaultSchema.attributes?.pre || []), ["className"]],
    code: [...(defaultSchema.attributes?.code || []), ["className"]],
    span: [...(defaultSchema.attributes?.span || []), ["className"], ["style"]],
    div: [...(defaultSchema.attributes?.div || []), ["className"]],
    math: [...(defaultSchema.attributes?.math || []), ["xmlns"]],
    annotation: [...(defaultSchema.attributes?.annotation || []), ["encoding"]],
    mtable: [...(defaultSchema.attributes?.mtable || []), ["columnalign"]],
    mtd: [...(defaultSchema.attributes?.mtd || []), ["columnalign"]],
    svg: [
      ...(defaultSchema.attributes?.svg || []),
      ["xmlns"],
      ["width"],
      ["height"],
      ["viewBox"],
    ],
    path: [...(defaultSchema.attributes?.path || []), ["d"]],
    line: [
      ...(defaultSchema.attributes?.line || []),
      ["x1"],
      ["x2"],
      ["y1"],
      ["y2"],
      ["stroke"],
      ["stroke-width"],
    ],
    img: [
      ...(defaultSchema.attributes?.img || []),
      ["width"],
      ["height"],
      ["loading"],
      ["decoding"],
      ["fetchPriority"],
      ["sizes"],
      ["srcSet"],
    ],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "math",
    "annotation",
    "semantics",
    "mrow",
    "mi",
    "mn",
    "mo",
    "msup",
    "msub",
    "mfrac",
    "msqrt",
    "mspace",
    "mtable",
    "mtr",
    "mtd",
    "svg",
    "path",
    "line",
  ],
};

function visitElements(
  nodes: readonly RootContent[],
  visitor: (node: Element) => void
) {
  for (const node of nodes) {
    if (node.type !== "element") {
      continue;
    }

    visitor(node);
    visitElements(node.children, visitor);
  }
}

function rehypeResponsiveImages() {
  const inlineContentVariantProfile = getInlineContentVariantProfile();

  return (tree: Root) => {
    visitElements(tree.children, (node) => {
      if (node.tagName !== "img") {
        return;
      }

      const properties = (node.properties ||= {});
      const src = properties.src;
      if (typeof src !== "string" || !src.startsWith("/")) {
        return;
      }

      const primaryVariant = getLargestImageVariant(
        src,
        inlineContentVariantProfile
      );
      const primarySrc = primaryVariant?.path || src;
      properties.src = primarySrc;
      properties.loading = "lazy";
      properties.decoding = "async";
      properties.fetchPriority = "low";
      properties.sizes = "(min-width: 1024px) 896px, 100vw";

      const srcSet = getImageVariantSourceSet(src, inlineContentVariantProfile);
      if (srcSet) {
        properties.srcSet = srcSet;
      }

      if (primaryVariant) {
        properties.width = primaryVariant.width;
        properties.height = primaryVariant.height;
      }
    });
  };
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeResponsiveImages)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
