import { HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";

import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section
      id="home"
      className="pb-8 pt-[calc(var(--header-height)+1.25rem)] md:pb-10 md:pt-[calc(var(--header-height)+2rem)]"
    >
      <div className="section-center">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
          <div className="max-w-3xl">
            <p className="text-hero-subtitle mb-3 tracking-wider">
              Hi, my name is
            </p>
            <h1 className="text-hero-title mb-3 inline-block font-black uppercase leading-[0.9] tracking-[0.2rem] md:pb-2">
              Alex Leung
            </h1>

            <h2 className="text-hero-description">
              Software engineer and writer.
            </h2>
            <p className="text-body mt-3 text-gray-200 md:text-gray-300">
              I build software and write about systems, AI, and learning in
              public.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <CTAButton href="/blog/">
                Read My Writing <HiOutlineArrowRight className="text-lg" />
              </CTAButton>
              <CTAButton href="/about/" variant="secondary">
                <HiOutlineUser className="text-lg" /> About Me
              </CTAButton>
            </div>
          </div>

          <section
            aria-labelledby="positioning-heading"
            className="surface-static p-5 md:p-6"
          >
            <h2 id="positioning-heading" className="text-heading font-semibold">
              What you&apos;ll find here
            </h2>
            <ul className="mt-4 space-y-3 text-gray-200">
              <li className="text-body">
                Essays and notes on software engineering, architecture, and
                product decisions.
              </li>
              <li className="text-body">
                Practical breakdowns of how AI fits into real systems and
                day-to-day work.
              </li>
              <li className="text-body">
                Reflections on learning, writing, and improving as a builder.
              </li>
            </ul>
          </section>
        </div>
        <div className="mt-5">
          <p className="text-body-sm text-gray-300">
            Start with the latest posts below, or explore the full blog archive.
          </p>
          <a
            href="#latest-writing"
            className="text-body-sm mt-2 inline-flex items-center gap-2 font-semibold text-accent-link transition-colors hover:text-accent-link-hover"
          >
            Jump to latest writing
            <HiOutlineArrowRight aria-hidden="true" className="text-base" />
          </a>
        </div>
      </div>
    </section>
  );
}
