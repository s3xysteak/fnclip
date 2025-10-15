/**
 * Check whether the input is promise-like, which has a `then` function property.
 *
 * @see {@link https://s3xysteak.github.io/fnclip/functions/guard/isPromise/}
 */
export function isPromise(val: unknown): val is Promise<unknown> {
  return !!val && typeof (val as any).then === 'function'
}
