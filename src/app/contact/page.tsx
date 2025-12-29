import { EmailMe } from "./_components/EmailMe";
import { Title } from "@/components/Title";

export default function ContactPage() {
  return (
    <div className="py-[var(--header-height)]">
      <Title title="Contact" id="contact" />
      <EmailMe />
    </div>
  );
}
