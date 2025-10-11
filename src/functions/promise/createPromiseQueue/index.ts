/**
 * Create a promise queue. Concurrently run promise, but executing callbacks synchronously in order.
 * @example
 * ```ts
 * const queue1 = createPromiseQueue()
 *
 * // Run promise and resolver
 * queue1
 *  .run(async () => { await sleep(30) }, () => console.log('3'))
 *  .run(async () => { await sleep(20) }, () => console.log('2'))
 *  .run(async () => { await sleep(100) }, () => console.log('ten'))
 * await queue1.wait()
 * // log `3` on 30ms, log `2` on next moment, log `ten` on 100ms(70ms after log `2`)
 *
 * // Or
 *
 * const queue2 = createPromiseQueue()
 * const arr = [3, 2, 10]
 *
 * arr.forEach((v) => {
 *   queue2.run(async () => { await sleep(v*10); return v }, (val) => console.log(String(val)))
 * })
 *
 * // Will be called after all Promise tasks are resolved
 * await queue2.wait()
 * // log `3` on 30ms, log `2` on next tick, log `10` on 100ms
 * ```
 */
export function createPromiseQueue() {
  const list: [Promise<any>, (...args: any[]) => Promise<any>][] = []

  const api = {
    run: <T>(promise: Callable<Promise<T>>, callback: (value: T) => Awaitable<void>) => {
      const p = typeof promise === 'function' ? promise() : promise
      const cb = async (v: T) => callback(v)
      const index = list.push([p, cb]) - 1

      p.then(async (v) => {
        if (index > 0)
          await Promise.allSettled(list[index - 1])

        await cb(v)
      })

      return api
    },
    wait: async () => {
      await Promise.allSettled(list.flat())
    },
  }

  return api
}
type Awaitable<T> = T | PromiseLike<T>
type Callable<T> = T | ((...args: any[]) => T)
