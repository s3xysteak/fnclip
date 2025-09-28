export function isPromise(val: unknown): val is Promise<unknown> {
  return !!val && typeof (val as any).then === 'function'
}
