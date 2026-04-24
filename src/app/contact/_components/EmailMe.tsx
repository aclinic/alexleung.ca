import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { Subtitle } from "@/components/Subtitle";

export function EmailMe() {
  return (
    <ResponsiveContainer element="section" className="text-center">
      <Subtitle title="Email" id="email" />
      <div className="text-body">
        <p>
          The simplest way to get in touch is to send an email to{" "}
          <strong>alex [at] alexleung.ca</strong>. You can also reach me on
          social media.
        </p>
      </div>
    </ResponsiveContainer>
  );
}
