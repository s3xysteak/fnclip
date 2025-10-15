/**
 * Make any input as a promise.
 *
 * If the input is a function, call it.
 *
 * @example
 * ```ts
 * expect(await toPromise('hi')).toBe('hi')
 * expect(await toPromise(1)).toBe(1)
 * expect(await toPromise(Promise.resolve(1))).toBe(1)
 * expect(await toPromise(() => 1)).toBe(1)
 * expect(await toPromise(async () => 1)).toBe(1)
 * ```
 *
 * @see {@link https://s3xysteak.github.io/fnclip/functions/promise/toPromise/}
 */
export function toPromise<T>(param: (T | PromiseLike<T>) | ((...args: any[]) => T | PromiseLike<T>)): Promise<T> {
  const cb = async () =>
    isFunction(param) ? param() : param

  return cb()
}

function isFunction<T extends (...args: any[]) => any>(val: any): val is T {
  return typeof val === 'function'
}
