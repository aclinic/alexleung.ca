import { Journey } from "@/app/about/_components/Journey";
import { Credentials } from "@/app/about/_components/Credentials";
import { Title } from "@/components/Title";
import { Skills } from "./_components/Skills";

export default function AboutPage() {
  return (
    <div className="py-[var(--header-height)]">
      <Title title="About Me" id="about" />
      <Journey />
      <Skills className="mt-12" />
      <Credentials />
    </div>
  );
}
