import type { GlobalConfig } from "payload";

const Contact: GlobalConfig = {
  slug: "contact",
  access: { read: () => true },
  fields: [
    {
      name: "people",
      label: "Osoby kontaktowe",
      type: "array",
      fields: [
        {
          name: "member",
          label: "Osoba kontaktowa",
          type: "relationship",
          relationTo: "teamMembers",
          required: true,
        },
      ],
    },
    {
      name: "phoneNumber",
      label: "Główny numer telefonu",
      type: "text",
      defaultValue: "+48 510 550 505",
      required: true,
    },
  ],
};

export default Contact;
