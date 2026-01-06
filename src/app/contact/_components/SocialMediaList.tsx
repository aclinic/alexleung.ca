import { Subtitle } from "@/components/Subtitle";
import { data } from "@/constants/socialLinks";

export function SocialMediaList() {
  return (
    <section className="section-center">
      <Subtitle title="Connect" id="social" />
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {data.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={link.label}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-6 py-4 transition-all hover:border-white/30 hover:bg-white/10"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="text-body">
              {link.label.replace(" Profile", "")}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
