import { JsonLd } from "react-schemaorg";
import { BreadcrumbList } from "schema-dts";
import { BASE_URL } from "@/constants";

export type JsonLdBreadcrumbItem = {
  name: string;
  item: string;
};

export type JsonLdBreadcrumbsProps = {
  items: JsonLdBreadcrumbItem[];
};

export function JsonLdBreadcrumbs({ items }: JsonLdBreadcrumbsProps) {
  return (
    <JsonLd<BreadcrumbList>
      item={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.item.startsWith("http")
            ? item.item
            : `${BASE_URL}${item.item}`,
        })),
      }}
    />
  );
}
