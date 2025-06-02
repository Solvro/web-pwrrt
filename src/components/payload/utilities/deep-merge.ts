/**
 * Simple object check.
 * @param item - The item to check
 * @returns {boolean} True if the item is a non-array object
 */
export function isObject(item: unknown): boolean {
  return Boolean(item && typeof item === "object" && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param object1 - The target object
 * @param object2 - The source object
 * @returns {T} The merged object
 */
export function deepMerge<T extends Record<string, unknown>>(
  object1: T,
  object2: T,
): T {
  const output = { ...object1 };

  for (const key in object2) {
    if (Object.prototype.hasOwnProperty.call(object2, key)) {
      const value1 = object1[key];
      const value2 = object2[key];

      output[key] = (
        typeof value2 === "object" && !Array.isArray(value2) && value1
          ? deepMerge(
              value1 as Record<string, unknown>,
              value2 as Record<string, unknown>,
            )
          : value2
      ) as T[typeof key];
    }
  }

  return output;
}
