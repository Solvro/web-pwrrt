import type { CollectionConfig } from "payload";

export const Achievements: CollectionConfig = {
  slug: "achievements",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Tytuł",
      type: "text",
      required: true,
    },
    {
      name: "results",
      label: "Wyniki",
      type: "array",
      fields: [
        {
          name: "result",
          label: "Wynik",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "backgroundImage",
      label: "Zdjęcie w tle",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "raceLogo",
      label: "Logo wyścigu",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "bolid",
      label: "Bolid",
      type: "relationship",
      relationTo: "bolids",
      required: true,
    },
  ],
};
