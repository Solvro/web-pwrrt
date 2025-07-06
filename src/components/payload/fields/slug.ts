import type { Field } from "payload";

import { formatSlug } from "../utilities/format-slug";

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = "title", overrides = {}) =>
  ({
    name: "slug",
    label: "Slug",
    type: "text" as const,
    index: true,
    admin: {
      position: "sidebar",
    },
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
    ...overrides,
  }) as Field;
