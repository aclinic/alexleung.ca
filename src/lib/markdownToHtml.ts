import type { Schema } from "hast-util-sanitize";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkRehype from "remark-rehype";

const sanitizeSchema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    pre: [...(defaultSchema.attributes?.pre || []), ["className"]],
    code: [...(defaultSchema.attributes?.code || []), ["className"]],
    span: [...(defaultSchema.attributes?.span || []), ["className"], ["style"]],
    div: [...(defaultSchema.attributes?.div || []), ["className"]],
  },
};

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
