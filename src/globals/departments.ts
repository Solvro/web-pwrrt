import type { GlobalConfig } from "payload";

const Departments: GlobalConfig = {
  slug: "departments",
  access: { read: () => true },
  fields: [
    {
      name: "departments",
      label: "Działy",
      type: "array",
      fields: [
        { name: "name", label: "Nazwa", type: "text", required: true },
        {
          name: "description",
          label: "Opis",
          type: "textarea",
          required: true,
        },
        {
          name: "image",
          label: "Zdjęcie",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

export default Departments;
