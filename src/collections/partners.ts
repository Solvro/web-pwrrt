import { CollectionConfig } from "payload";

const Partners: CollectionConfig = {
  slug: "partners",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Nazwa partnera",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Logo",
    },
    {
      name: "website",
      type: "text",
      required: true,
      label: "Strona partnera",
    },
    {
      name: "type",
      type: "select",
      label: "Typ partnera",
      required: true,
      options: [
        { label: "Strategiczny", value: "strategic" },
        { label: "Platynowy", value: "platinum" },
        { label: "Złoty", value: "gold" },
        { label: "Srebrny", value: "silver" },
        { label: "Brązowy", value: "bronze" },
      ],
      defaultValue: "bronze",
    },
  ],
};
export default Partners;
