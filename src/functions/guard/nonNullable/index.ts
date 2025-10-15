/**
 * Check whether the input is null or undefined.
 * Filter out null and undefined values, with correct type.
 *
 * @example
 * [1, 2, null, 3].filter(nonNullable) // -> [1, 2, 3]
 *
 * @see {@link https://s3xysteak.github.io/fnclip/functions/guard/nonNullable/}
 */
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
