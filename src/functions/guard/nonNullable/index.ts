/**
 * Filter out null and undefined values, with correct type.
 * @example
 * [1, 2, null, 3].filter(nonNullable) // -> [1, 2, 3]
 */
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
