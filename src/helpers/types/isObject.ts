export function isObject(value: unknown): value is Record<string, never> {
  return !!value && value !== null && typeof value === 'object';
}
