import type { CollectionConfig } from "payload";

export const Bolids: CollectionConfig = {
  slug: "bolids",
  orderable: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["image", "name", "year", "mass", "power"],
  },
  fields: [
    {
      name: "name",
      label: "Nazwa",
      type: "text",
      admin: {
        placeholder: "RT14e",
      },
      required: true,
    },
    {
      name: "year",
      label: "Rok",
      admin: {
        placeholder: "2024",
      },
      type: "text",
      required: true,
    },
    {
      name: "short_description",
      type: "text",
      label: "Krótki opis",
      admin: {
        placeholder: "RT14e to nasz trzeci bolid elektryczny...",
      },
      required: true,
      localized: true,
    },
    {
      name: "acceleration",
      type: "text",
      admin: {
        placeholder: "4.5",
      },
      label: "Przyspieszenie [s]",
      required: true,
    },
    {
      name: "mass",
      type: "number",
      admin: {
        placeholder: "256",
      },
      required: true,
      label: "Masa [kg]",
    },
    {
      name: "power",
      type: "text",
      admin: {
        placeholder: "87HP / 2 x 50 kW",
      },
      required: true,
      label: "Moc",
    },
    {
      name: "image",
      label: "Zdjęcie bolidu",
      type: "upload",
      required: true,
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "parts",
      type: "array",
      label: "Części",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "partName",
          type: "text",
          label: "Nazwa części",
          admin: {
            placeholder: "powertrain",
          },
          required: true,
        },
        {
          name: "description",
          type: "text",
          label: "Opis części",
          admin: {
            placeholder: "Moc 50kW",
          },
          required: true,
        },
      ],
    },
  ],
};
