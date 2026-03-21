import { HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";

import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section
      id="home"
      className="flex flex-grow items-center justify-center pb-12 pt-[calc(var(--header-height)+1.5rem)] md:pb-12 md:pt-[calc(var(--header-height)+3rem)]"
    >
      <div className="section-center">
        <div className="max-w-3xl">
          <p className="text-hero-subtitle mb-4 tracking-wider">
            Hi, my name is
          </p>
          <h1 className="text-hero-title mb-4 inline-block font-black uppercase leading-[0.9] tracking-[0.2rem] md:pb-4">
            Alex Leung
          </h1>

          <h2 className="text-hero-description">
            Software engineer focused on AI systems, distributed systems, and
            product engineering.
          </h2>
          <p className="mt-3 text-sm italic text-gray-200 md:text-gray-300">
            I build software, work across early-stage and scaling problems, and
            write about systems, AI, and learning in public.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/blog/">
              Read My Writing <HiOutlineArrowRight className="text-lg" />
            </CTAButton>
            <CTAButton href="/about/" variant="secondary">
              <HiOutlineUser className="text-lg" /> About Me
            </CTAButton>
          </div>

          <div className="mt-10">
            <section
              aria-labelledby="positioning-heading"
              className="surface-static p-5 md:p-6"
            >
              <h2
                id="positioning-heading"
                className="text-heading font-semibold"
              >
                What you&apos;ll find here
              </h2>
              <p className="text-body mt-4 text-gray-200">
                You&apos;ll find essays, notes, and personal reflections on
                software engineering, system design, AI, product work, and
                learning.
              </p>
              <p className="text-body mt-3 text-gray-200">
                I care about the practical edge of those topics: how products
                get built, how systems hold up, and how new AI capabilities fit
                into real software.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
