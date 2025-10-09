/**
 * Convert `Arrayable<T>` to `Array<T>`
 */
export function toArray<T>(array?: T | T[] | null | undefined): Array<T> {
  array = array ?? []
  return Array.isArray(array) ? array : [array]
}
