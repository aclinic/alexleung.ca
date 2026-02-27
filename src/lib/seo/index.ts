export { buildPageMetadata } from "./metadata";
export {
  buildBlogCollectionPageSchema,
  buildArticleSchema,
  buildBlogItemListSchema,
  buildBlogPostingSchema,
  buildContactPageSchema,
  buildPersonSchema,
  buildProfilePageSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
  getPersonId,
} from "./jsonld";
export type { SeoImage, SeoInput } from "./types";
export { toAbsoluteUrl, toCanonical } from "./url";
