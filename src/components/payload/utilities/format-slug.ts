import type { FieldHook, FieldHookArgs } from "payload";

const format = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD") // rozklada znaki na elementy (literka + akcent)
    .replaceAll(/[\u0300-\u036F]/g, "") // usuwa akcenty
    .replaceAll("ł", "l") // te konkretne polskie znaki nie rodzielaja sie na akcenty
    .replaceAll("ź", "z") // i trzeba manualnie zamienic
    .replaceAll("ż", "z")
    .replaceAll(" ", "-")
    .replaceAll(/[^\w-]+/g, ""); // usuwa wszystkie specjalne znaki (czyli zostaja literki podstawowe i liczby) poza "-" // ciekawe co to robi

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
