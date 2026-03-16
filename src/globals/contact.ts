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
          name: "name",
          label: "Imię i nazwisko",
          type: "text",
          required: true,
        },
        { name: "role", label: "Rola", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        {
          name: "photo",
          label: "Zdjęcie",
          type: "upload",
          relationTo: "media",
          required: false,
        },
      ],
    },
    {
      name: "phoneNumber",
      label: "Numer telefonu",
      type: "text",
      defaultValue: "+48 510 550 505",
      required: true,
    },
  ],
};

export default Contact;
