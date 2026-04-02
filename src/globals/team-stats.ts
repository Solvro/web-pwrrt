import type { GlobalConfig } from "payload";

const TeamStats: GlobalConfig = {
  slug: "team-stats",
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
    {
      name: "formulaStudentPlaceCount",
      label: "Miejsce w Formula Student",
      type: "number",
      required: true,
    },
  ],
};

export default TeamStats;
