"use client";

import { Subtitle } from "@/components/Subtitle";
import { useEffect } from "react";

export function LinkedInBadge() {
  useEffect(() => {
    // Load LinkedIn badge script
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="section-center text-center">
      <Subtitle title="LinkedIn" id="linkedin" />
      <div className="mt-8 flex justify-center">
        <div
          className="badge-base LI-profile-badge"
          data-locale="en_US"
          data-size="medium"
          data-theme="dark"
          data-type="HORIZONTAL"
          data-vanity="aclinic"
          data-version="v1"
        >
          <a
            className="badge-base__link LI-simple-link"
            href="https://ca.linkedin.com/in/aclinic?trk=profile-badge"
          ></a>
        </div>
      </div>
    </section>
  );
}
