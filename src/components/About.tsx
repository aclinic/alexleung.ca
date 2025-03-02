import Title from "@/components/Title";
import Skills from "@/components/Skills";

const About = () => {
  return (
    <section className="section-center pt-20">
      <Title title="About Me" />
      <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-x-16 md:pt-8">
        <div className="text-left leading-relaxed text-lg mb-8 md:w-[90%]">
          <p className="mb-6">
            I love applying effective software design to craft beautiful, compelling, 
            and intuitive solutions to engineering problems. In my 
            spare time I enjoy reading 📚, rock climbing 🧗, and spending time with furmily 🐱.
          </p>

          <Skills />
        </div>
        <img src="assets/about.jpg" alt="Alex and Galactica" />
      </div>
    </section>
  );
};

export default About;
