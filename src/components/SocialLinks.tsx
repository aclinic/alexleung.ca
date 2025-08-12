import { data } from "@/constants/socialLinks";

export default function SocialLinks() {
  return (
    <aside
      className="hidden lg:block fixed bottom-[12%] translate-y-1/2 left-12 z-[99] 
      after:content-[''] after:block after:h-[150px] after:w-px after:bg-gray-300 after:relative after:top-2.5 after:ml-2.5"
    >
      {data.map((link) => (
        <li key={link.id} className="list-none my-2">
          <a
            href={link.url}
            className="text-xl text-hover"
            rel="me noopener"
            target="_blank"
          >
            {link.icon}
          </a>
        </li>
      ))}
    </aside>
  );
}
