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
            className="surface-interactive flex items-center gap-3 px-6 py-4"
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
