import { FcEngineering } from "react-icons/fc";

const Home = () => {
  return (
    <section className="h-screen relative">
      <div className="section-center h-full flex items-center">
        <div>
          <div
            className="animate-showTopText opacity-0 translate-y-full"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <p className="text-lg md:text-xl mb-4 text-hover tracking-wider">
              Hi, my name is
            </p>
            <h1 className="inline-block font-black uppercase text-4xl md:text-8xl tracking-[0.2rem] leading-[0.9] mb-4 md:pb-4">
              alex leung
            </h1>
          </div>
          <div
            className="animate-showTopText opacity-0 translate-y-full"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <h2 className="text-xl md:text-3xl">
              Staff Software Engineer & AI Lead{" "}
              <FcEngineering className="inline-block align-middle ml-1 mb-1" />
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
