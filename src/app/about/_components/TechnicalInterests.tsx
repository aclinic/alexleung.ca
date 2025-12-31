import { Subtitle } from "@/components/Subtitle";
import { skills } from "@/constants/skills";

export function Skills({ className }: { className?: string }) {
  return (
    <section className="section-center">
      <Subtitle title="Technical Interests" id="technicalinterests" />
      <div className={`text-md flex flex-col lg:text-lg ${className}`}>
        Here are a few technical areas that I enjoy working in:
        <ul className="mt-4 grid list-none grid-cols-1 gap-x-4 p-0 lg:grid-cols-4">
          {skills.map(({ skill }) => (
            <li
              key={skill}
              className="relative mb-3 pl-6 leading-6 before:absolute before:left-0 before:top-0 before:text-base before:content-['■']"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
