import type { Media } from "@/payload-types";

export const getImageUrl = (image: string | Media | null | undefined) => {
  if (image == null) {
    throw new Error("getImageUrl called with null or undefined image");
  }
  if (typeof image === "string") {
    return image;
  }
  return image.url ?? "";
};
