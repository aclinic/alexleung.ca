import { FcEngineering } from "react-icons/fc";
import { HiOutlineArrowRight, HiOutlineMail } from "react-icons/hi";

import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section id="home" className="flex flex-grow items-center justify-center">
      <div className="section-center">
        <div>
          <div
            className="translate-y-full animate-showTopText opacity-0"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <p className="text-hero-subtitle mb-4 tracking-wider">
              Hi, my name is
            </p>
            <h1 className="text-hero-title mb-4 inline-block font-black uppercase leading-[0.9] tracking-[0.2rem] md:pb-4">
              Alex Leung
            </h1>
          </div>
          <div
            className="translate-y-full animate-showTopText opacity-0"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <h2 className="text-hero-description">
              Syntropy Engineer | Programmer | P.Eng.{" "}
              <FcEngineering className="mb-1 ml-1 inline-block align-middle" />
            </h2>
            <p className="mt-3 text-sm italic text-gray-400">
              Syntropy: The emergence of order from chaos. The architecture of
              wholeness.
            </p>
          </div>
          <div
            className="mt-8 flex translate-y-full animate-showTopText flex-wrap gap-4 opacity-0"
            style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
          >
            <CTAButton href="/about/">
              Learn More <HiOutlineArrowRight className="text-lg" />
            </CTAButton>
            <CTAButton href="/contact/" variant="secondary">
              <HiOutlineMail className="text-lg" /> Get In Touch
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
