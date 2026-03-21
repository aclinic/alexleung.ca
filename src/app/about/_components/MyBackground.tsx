import ExternalLink from "@/components/ExternalLink";
import { IconTextRow } from "@/components/IconTextRow";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { SectionBlock } from "@/components/SectionBlock";
import {
  getStaticImageFallback,
  getStaticImageSourceSet,
} from "@/lib/localImageMetadata";

export function Journey() {
  const aboutPortraitSrcSet = getStaticImageSourceSet("aboutPortrait");
  const aboutPortraitFallback = getStaticImageFallback("aboutPortrait");

  return (
    <ResponsiveContainer element="section">
      <SectionBlock title="My Background" titleId="background" spacing="lg">
        <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-x-16 md:pt-8">
          <div className="text-body mb-8 space-y-6 text-left">
            <IconTextRow icon="👋" title="Hello" contentClassName="space-y-0">
              <p>Hi! I&apos;m Alex, and I&apos;m glad you&apos;re here.</p>
            </IconTextRow>

            <IconTextRow icon="💼" title="What I Do">
              <p>
                I&apos;m currently at{" "}
                <ExternalLink href="https://jetsonhome.com">
                  Jetson
                </ExternalLink>
                , helping electrify North American homes with vertically
                integrated energy solutions.
              </p>
              <p>
                Before that, I worked on AR/AI glasses at{" "}
                <ExternalLink href="https://arvr.google.com/">
                  Google
                </ExternalLink>{" "}
                and product engineering at{" "}
                <ExternalLink href="https://cash.app/">Cash App</ExternalLink>.
              </p>
            </IconTextRow>

            <IconTextRow icon="🚀" title="How I Work">
              <p>
                I enjoy 0→1 work and helping products grow once the fundamentals
                are in place. I care about product taste, strong engineering
                fundamentals, and tight feedback loops, especially when the path
                forward is still ambiguous.
              </p>
            </IconTextRow>

            <IconTextRow icon="❤️" title="Outside Work">
              <p>
                I&apos;m motivated by building useful things, getting meaningful
                work done, and learning continuously.
              </p>
              <p>
                Outside of work, I spend time playing tennis 🎾, reading 📚,
                hiking 🏔️, rock climbing 🧗, and hanging out with my furmily 🐱.
              </p>
            </IconTextRow>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <ResponsiveImage
              src={aboutPortraitFallback.path}
              srcSet={aboutPortraitSrcSet}
              alt="Alex Leung sitting on a mountain trail during a hiking adventure"
              width={aboutPortraitFallback.width}
              height={aboutPortraitFallback.height}
              sizes="(min-width: 1024px) 28vw, (min-width: 768px) 36vw, 88vw"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
          </div>
        </div>
      </SectionBlock>
    </ResponsiveContainer>
  );
}
