import type { Schema } from "hast-util-sanitize";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";

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

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
