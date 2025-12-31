import { data } from "@/constants/socialLinks";

export default function SocialLinks() {
  return (
    <aside className="fixed bottom-[12%] left-12 z-[99] hidden translate-y-1/2 after:relative after:top-2.5 after:ml-2.5 after:block after:h-[150px] after:w-px after:bg-gray-300 after:content-[''] lg:block">
      <ul>
        {data.map((link) => (
          <li key={link.id} className="my-2 list-none">
            <a
              href={link.url}
              className="text-xl text-hover"
              rel="me noopener"
              target="_blank"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
