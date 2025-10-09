/**
 * Is a number in a range
 *
 * @example
 *
 * ```js
 * isInRange(5, [1, 10]) // -> true
 * ```
 */
export function isInRange(val: number, [a, b]: [number, number]) {
  return val >= Math.min(a, b) && val <= Math.max(a, b)
}
