import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { SectionBlock } from "@/components/SectionBlock";
import { skills } from "@/constants/skills";

export function Skills({ className }: { className?: string }) {
  return (
    <ResponsiveContainer element="section">
      <SectionBlock title="Technical Interests" titleId="technicalinterests">
        <div className={`text-md flex flex-col lg:text-lg ${className}`}>
          Here are a few technical areas that I enjoy working in:
          <ul className="mt-4 grid grid-cols-1 gap-x-4 lg:grid-cols-4">
            {skills.map(({ skill }) => (
              <li key={skill} className="mb-3 flex items-start gap-3 leading-6">
                <span
                  aria-hidden="true"
                  className="pt-[2px] text-xl leading-none"
                >
                  •
                </span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionBlock>
    </ResponsiveContainer>
  );
}
