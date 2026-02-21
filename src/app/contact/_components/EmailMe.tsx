import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { Subtitle } from "@/components/Subtitle";

export function EmailMe() {
  return (
    <ResponsiveContainer as="section" className="text-center">
      <Subtitle title="Email Me" id="email" />
      <div className="text-body">
        <p>
          If you want to get in touch with me, send an email to{" "}
          <strong>alex [at] alexleung.ca</strong> or reach out on social media.
        </p>
      </div>
    </ResponsiveContainer>
  );
}
