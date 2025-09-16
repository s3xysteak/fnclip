/**
 * Strict typed `Object.keys`
 *
 * @link https://github.com/antfu/utils/blob/main/src/object.ts
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}
