import type { GlobalConfig } from "payload";

const MainPage: GlobalConfig = {
  slug: "main-page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
  ],
};

export default MainPage;
