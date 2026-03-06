import { FaRss } from "react-icons/fa6";

import { LinkText } from "@/components/LinkText";
import { data } from "@/constants/socialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="section-center py-4 text-center">
      <ul>
        {data.map((link) => (
          <li
            key={link.id}
            className="mx-2 mb-4 inline-block list-none lg:hidden"
          >
            <a
              href={link.url}
              className="text-xl text-white"
              rel="me noopener"
              target="_blank"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-body-sm pb-1">
        <LinkText href="/feed.xml" className="inline-flex items-center gap-2">
          <FaRss aria-hidden="true" />
          <span>Subscribe via RSS</span>
        </LinkText>
      </p>
      <p>Copyright &copy; 2020 - {currentYear} Alex Leung</p>
    </section>
  );
}
