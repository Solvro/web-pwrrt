import type { GlobalConfig } from "payload";

const Banner: GlobalConfig = {
  slug: "banner",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "items",
      label: "Tekst banera",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default Banner;
