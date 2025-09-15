/**
 * Strict typed `Object.entries`
 *
 * @link https://github.com/antfu/utils/blob/main/src/object.ts
 */
export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}
