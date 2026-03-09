import { SocialLinkList } from "@/components/SocialLinkList";

export default function SocialLinks() {
  return (
    <aside className="fixed bottom-[12%] left-12 z-[99] hidden translate-y-1/2 after:relative after:top-2.5 after:ml-2.5 after:block after:h-[150px] after:w-px after:bg-gray-300 after:content-[''] lg:block">
      <SocialLinkList
        itemClassName="my-2 list-none"
        linkClassName="text-xl text-hover"
      />
    </aside>
  );
}
