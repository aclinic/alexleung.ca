import { Subtitle } from "@/components/Subtitle";
import { skills } from "@/constants/skills";

export function Skills({ className }: { className?: string }) {
  return (
    <section className="section-center">
      <Subtitle title="Technical Interests" id="technicalinterests" />
      <div className={`flex flex-col text-md lg:text-lg ${className}`}>
        Here are a few technical areas that I enjoy working in:
        <ul className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 list-none mt-4 p-0">
          {skills.map(({ skill }) => (
            <li
              key={skill}
              className="relative pl-6 mb-3 leading-6 before:content-['■'] before:absolute before:left-0 before:text-base before:top-0"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
