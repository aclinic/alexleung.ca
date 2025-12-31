import { FcEngineering } from "react-icons/fc";

export function Hero() {
  return (
    <section id="home" className="flex-grow flex items-center justify-center">
      <div className="section-center">
        <div>
          <div
            className="animate-showTopText opacity-0 translate-y-full"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <p className="text-hero-subtitle mb-4 tracking-wider">
              Hi, my name is
            </p>
            <h1 className="inline-block font-black uppercase text-hero-title tracking-[0.2rem] leading-[0.9] mb-4 md:pb-4">
              Alex Leung
            </h1>
          </div>
          <div
            className="animate-showTopText opacity-0 translate-y-full"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <h2 className="text-hero-description">
              Staff Software Engineer | Engineering Lead | P.Eng.{" "}
              <FcEngineering className="inline-block align-middle ml-1 mb-1" />
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
