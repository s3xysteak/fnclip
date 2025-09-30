/**
 * Closed interval random integer number
 *
 * ## example
 *
 * ```js
 *  // 1 <= value <= 10
 * randomInt(1, 10)
 *  // A rand function return [0, 1) to replace `Math.random`
 * randomInt(1, 10, () => myRand())
 * ```
 *
 * ## Prove
 *
 * 1. rand() return value -> [0, 1)
 *
 * 2. rand() * (high - low + 1) return value -> [0, high - low + 1)
 *
 * 3. Floor it return value -> [0, high - low].
 *
 * When floor it, value is 0 -> [0, 1), 1 -> [0, 2), ... , Max -> [Max-1, Max),
 * and because Math.random return a uniform distribution number,
 * so the rate is still uniform distribution.
 *
 * 4. plus low -> [low, high]
 */
export function randomInt(min: number, max: number, rand = Math.random): number {
  if (min > max) {
    throw new Error(`min (${min}) cannot be greater than max (${max})`)
  }

  const low = Math.ceil(min)
  const high = Math.floor(max)
  return Math.floor(rand() * (high - low + 1)) + low
}
