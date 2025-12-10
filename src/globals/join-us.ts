import type { GlobalConfig } from "payload";

const JoinUs: GlobalConfig = {
  slug: "join-us",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "formLink",
      type: "text",
      required: true,
    },
    {
      name: "isEnabled",
      type: "checkbox",
      label: "Aktywna rekrutacja",
      defaultValue: true,
    },
    {
      name: "time",
      type: "text",
      defaultValue: "2025-10-30T23:59:00",
      required: true,
    },
  ],
};

export default JoinUs;
