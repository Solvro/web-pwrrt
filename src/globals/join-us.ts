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
      label: "Link do formularza",
      required: true,
    },
    {
      name: "isEnabled",
      type: "checkbox",
      label: "Czy rekrutacja jest aktywna?",
      defaultValue: false,
    },
    {
      name: "time",
      type: "date",
      label: "Czas",
      defaultValue: "2025-10-30T23:59:00",
      required: true,
    },
  ],
};

export default JoinUs;
