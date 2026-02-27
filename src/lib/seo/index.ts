export { buildPageMetadata } from "./metadata";
export {
  buildBlogCollectionPageSchema,
  buildBlogItemListSchema,
  buildBlogPostingSchema,
  buildContactPageSchema,
  buildHomePageSchema,
  buildPersonSchema,
  buildProfilePageSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
  getPersonId,
} from "./jsonld";
export type { SeoImage, SeoInput } from "./types";
export { toAbsoluteUrl, toCanonical } from "./url";
