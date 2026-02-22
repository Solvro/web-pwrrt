"use client";

import { CtaCard } from "./cta-card";
import partnersPhoto from "./join-us-partners.jpg";
import teamPhoto from "./join-us-team.jpg";

export function JoinusSection() {
  return (
    <div
      id="joinus"
      className="flex flex-wrap justify-center gap-4 md:gap-8 xl:justify-end"
    >
      <CtaCard
        section="team"
        image={teamPhoto}
        className="origin-[70%_100%] object-left"
      />
      <CtaCard
        section="partners"
        image={partnersPhoto}
        className="origin-[80%_10%] object-bottom-left"
      />
    </div>
  );
}
