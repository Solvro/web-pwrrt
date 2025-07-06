import type { FieldHook, FieldHookArgs } from "payload";

const format = (value: string): string =>
  value
    .replaceAll(" ", "-")
    .replaceAll(/[^\w-]+/g, "")
    .toLowerCase();

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }: FieldHookArgs) => {
    if (typeof value === "string") {
      return format(value);
    }

    const fallbackData =
      (data as Record<string, unknown>)[fallback] ??
      (originalDoc as Record<string, unknown>)[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return format(fallbackData);
    }
  };

export { formatSlug };
