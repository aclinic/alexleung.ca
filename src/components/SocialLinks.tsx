import { data } from "@/constants/socialLinks";

export default function SocialLinks() {
  return (
    <aside className="fixed bottom-[12%] left-6 z-[99] hidden translate-y-1/2 opacity-80 after:relative after:top-2.5 after:ml-2.5 after:block after:h-[120px] after:w-px after:bg-gray-400/70 after:content-[''] hover:opacity-100 lg:block xl:left-10">
      <ul>
        {data.map((link) => (
          <li key={link.id} className="my-2 list-none">
            <a
              href={link.url}
              className="text-xl text-gray-400 transition-colors hover:text-gray-200"
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
