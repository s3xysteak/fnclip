/**
 * Map key/value pairs for an object, and construct a new one.
 *
 * @link https://github.com/antfu/utils/blob/main/src/object.ts
 *
 * Transform:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => [k.toString().toUpperCase(), v.toString()])
 * // { A: '1', B: '2' }
 * ```
 *
 * Swap key/value:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => [v, k])
 * // { 1: 'a', 2: 'b' }
 * ```
 *
 * Filter keys:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => k === 'a' ? undefined : [k, v])
 * // { b: 2 }
 * ```
 *
 * @see {@link https://s3xysteak.github.io/fnclip/functions/object/objectMap/}
 */
export function objectMap<K extends string, V, NK extends PropertyKey = K, NV = V>(
  obj: Record<K, V>,
  fn: (key: K, value: V) => [NK, NV] | undefined,
): Record<NK, NV> {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => fn(k as K, v as V))
      .filter(value => value !== null && value !== undefined),
  ) as Record<NK, NV>
}
