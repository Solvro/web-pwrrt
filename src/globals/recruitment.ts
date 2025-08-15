import type { GlobalConfig } from "payload";

const Recruitment: GlobalConfig = {
  slug: "recruitment",
  access: { read: () => true },
  fields: [
    {
      name: "active",
      label: "Rekrutacja aktywna",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },
    {
      name: "endDate",
      label: "Data zakończenia rekrutacji",
      type: "date",
      required: true,
    },
    {
      name: "link",
      label: "Link do rekrutacji",
      type: "text",
      required: true,
    },
  ],
};

export default Recruitment;
