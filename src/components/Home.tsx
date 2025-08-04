import { FcEngineering } from "react-icons/fc";

const Home = () => {
  return (
    <section className="h-screen relative">
      <div className="section-center h-full flex items-center">
        <div>
          <div className="animate-showTopText opacity-0 translate-y-full" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <p className="text-[1.1rem] md:text-[1.5rem] mb-4 text-hover tracking-[0.08rem]">Hi, my name is</p>
            <h1 className="inline-block font-black uppercase text-4xl md:text-8xl tracking-[0.2rem] leading-[0.9] mb-4 md:pb-4">alex leung</h1>
          </div>
          <div className="animate-showTopText opacity-0 translate-y-full" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <h2 className="text-[1.2rem] md:text-[2rem]">
              Software Engineer <FcEngineering className="inline-block align-middle ml-[0.3rem] mb-[0.2rem]" />
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
