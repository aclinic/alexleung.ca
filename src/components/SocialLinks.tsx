import { data } from "@/constants/socialLinks";

const SocialLinks = () => {
  return (
    <aside className="hidden xl:block fixed bottom-[12%] translate-y-1/2 left-12 z-[99] after:content-[''] after:block after:h-[150px] after:w-[1px] after:bg-gray-300 after:relative after:top-[10px] after:ml-[10px]">
      {data.map((link) => (
        <li key={link.id} className="list-none my-2">
          <a href={link.url} className="text-[1.4rem] text-hover">{link.icon}</a>
        </li>
      ))}
    </aside>
  );
};

export default SocialLinks;
