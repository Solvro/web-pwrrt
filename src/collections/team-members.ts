import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "teamMembers",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Imię",
      type: "text",
      required: true,
      admin: { placeholder: "Jan" },
    },
    {
      name: "surname",
      label: "Nazwisko",
      type: "text",
      required: true,
      admin: { placeholder: "Kowalski" },
    },
    {
      name: "profile",
      label: "Zdjęcie profilowe",
      type: "upload",
      required: false,
      relationTo: "media",
    },
    {
      name: "roles",
      label: "Role",
      type: "array",
      required: true,
      fields: [
        {
          name: "role",
          label: "Rola",
          type: "text",
          required: true,
          admin: { placeholder: "team leader" },
        },
        {
          name: "department",
          label: "Dział",
          type: "text",
          required: true,
          admin: { placeholder: "mechanical" },
        },
        {
          name: "bolidName",
          label: "Bolid",
          type: "text",
          required: true,
          admin: { placeholder: "RT14e" },
        },
      ],
    },
    {
      name: "email",
      label: "E-mail",
      type: "email",
      required: false,
      admin: { placeholder: "jan.kowalski@example.com" },
    },
    {
      name: "phoneNumber",
      label: "Telefon",
      type: "text",
      required: false,
      admin: { placeholder: "+48123456789" },
    },
  ],
};
