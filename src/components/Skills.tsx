import { skills } from "@/constants/skills";

const Skills = () => {
  return (
    <>
      Here are a few technical areas that I enjoy working in:
      <ul className="grid grid-cols-[repeat(2,minmax(130px,200px))] gap-x-4 list-none mt-4 p-0">
        {skills.map(({ skill }) => (
          <li
            key={skill}
            className="relative pl-6 mb-3 leading-6 before:content-['■'] before:absolute before:left-0 before:text-base before:top-0"
          >
            {skill}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Skills;
