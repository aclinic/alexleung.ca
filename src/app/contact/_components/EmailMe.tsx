import { Subtitle } from "@/components/Subtitle";

export function EmailMe() {
  return (
    <section className="section-center text-center">
      <Subtitle title="Email Me" id="email" />
      <div className="text-md lg:text-lg">
        <p>
          If you want to get in touch with me, send an email to{" "}
          <strong>alex [at] alexleung.ca</strong> or reach out on social media.
        </p>
      </div>
    </section>
  );
}
