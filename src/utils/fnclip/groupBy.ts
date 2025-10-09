/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

/**
 * Classify items in an iterable by a key.
 *
 * @example
 * ```ts
 * const data = [
 *   { type: 'apple', size: 2 },
 *   { type: 'banana', size: 3 },
 *   { type: 'pear', size: 2 },
 *   { type: 'mango', size: 1 },
 *   { type: 'apple', size: 4 },
 *   { type: 'banana', size: 6 },
 *   { type: 'pear', size: 6, special: true },
 * ]
 *
 * expect(groupBy(data, item => item.type)).toEqual({
 *   apple: [
 *     { type: 'apple', size: 2 },
 *     { type: 'apple', size: 4 },
 *   ],
 *   banana: [
 *     { type: 'banana', size: 3 },
 *     { type: 'banana', size: 6 },
 *   ],
 *   pear: [
 *     { type: 'pear', size: 2 },
 *     { type: 'pear', size: 6, special: true },
 *   ],
 *   mango: [
 *     { type: 'mango', size: 1 },
 *   ],
 * })
 *
 * expect(groupBy(data, item => item.size >= 3 ? 'big' : 'small')).toEqual(
 *   {
 *     big: [
 *       { size: 3, type: 'banana' },
 *       { size: 4, type: 'apple' },
 *       { size: 6, type: 'banana' },
 *       { size: 6, special: true, type: 'pear' },
 *     ],
 *     small: [
 *       { size: 2, type: 'apple' },
 *       { size: 2, type: 'pear' },
 *       { size: 1, type: 'mango' },
 *     ],
 *   },
 * )
 * ```
 */
export function groupBy<K extends PropertyKey, T>(iter: Iterable<T>, getKey: (element: T, index: number) => K) {
  const val: Partial<Record<K, T[]>> = {}

  Array.from(iter).forEach((item, index) => {
    const key = getKey(item, index)
    if (typeof val[key] === 'undefined')
      (val[key] = [item])
    else
      val[key].push(item)
  })

  return val
}
