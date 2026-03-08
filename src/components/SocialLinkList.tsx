import { ReactNode } from "react";

import { data } from "@/constants/socialLinks";

type SocialLinkListProps = {
  className?: string;
  itemClassName?: string;
  linkClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
  rel?: string;
  showLabel?: boolean;
  labelFormatter?: (label: string) => ReactNode;
};

export function SocialLinkList({
  className,
  itemClassName,
  linkClassName,
  labelClassName,
  iconClassName,
  rel = "me noopener",
  showLabel = false,
  labelFormatter = (label) => label,
}: SocialLinkListProps) {
  return (
    <ul className={className}>
      {data.map((link) => (
        <li key={link.id} className={itemClassName}>
          <a
            href={link.url}
            className={linkClassName}
            rel={rel}
            target="_blank"
            aria-label={link.label}
          >
            <span className={iconClassName}>{link.icon}</span>
            {showLabel ? (
              <span className={labelClassName}>
                {labelFormatter(link.label)}
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
