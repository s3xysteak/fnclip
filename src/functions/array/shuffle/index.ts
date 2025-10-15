/**
 * Shuffle an array. This function mutates the array.
 *
 * @see {@link https://s3xysteak.github.io/fnclip/functions/array/shuffle/}
 */
export function shuffle<T>(array: T[], rand = () => Math.random()): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
