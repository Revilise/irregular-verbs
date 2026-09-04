type AnyObject = Record<string, unknown>;

export function isObject(value: unknown): value is AnyObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function merge(
  target: AnyObject = {},
  source: AnyObject = {},
): AnyObject {
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (!(key in target)) {
      target[key] = sourceValue;
      continue;
    }

    if (isObject(targetValue) && isObject(sourceValue)) {
      merge(targetValue, sourceValue);
    }
  }

  return target;
}
