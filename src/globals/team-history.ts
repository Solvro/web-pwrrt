import type { GlobalConfig } from "payload";

const TeamHistory: GlobalConfig = {
  slug: "team-history",
  access: { read: () => true },
  fields: [
    {
      name: "achievementsCount",
      label: "Liczba osiągnięć",
      type: "number",
      required: true,
    },
    {
      name: "projectsCount",
      label: "Liczba projektów",
      type: "number",
      required: true,
    },
    {
      name: "membersCount",
      label: "Liczba członków",
      type: "number",
      required: true,
    },
  ],
};

export default TeamHistory;
