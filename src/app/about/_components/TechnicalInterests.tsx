import { Subtitle } from "@/components/Subtitle";
import { skills } from "@/constants/skills";

export function Skills({ className }: { className?: string }) {
  return (
    <section className="section-center">
      <Subtitle title="Technical Interests" id="technicalinterests" />
      <div className={`text-md flex flex-col lg:text-lg ${className}`}>
        Here are a few technical areas that I enjoy working in:
        <ul className="mt-4 grid list-inside list-disc grid-cols-1 gap-x-4 lg:grid-cols-4">
          {skills.map(({ skill }) => (
            <li key={skill} className="mb-3 leading-6">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
