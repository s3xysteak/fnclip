/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @see {@link https://s3xysteak.github.io/fnclip/functions/array/toArray/}
 */
export function toArray<T>(array?: T | T[] | null | undefined): Array<T> {
  array = array ?? []
  return Array.isArray(array) ? array : [array]
}
