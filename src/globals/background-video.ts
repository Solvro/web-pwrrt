import type { GlobalConfig } from "payload";

const BackgroundVideo: GlobalConfig = {
  slug: "background-video",
  access: { read: () => true },
  fields: [
    {
      name: "video",
      label: "Film w tle",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};

export default BackgroundVideo;
