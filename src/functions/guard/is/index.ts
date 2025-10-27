const toString = (v: any) => Object.prototype.toString.call(v)

/**
 * Check whether the value is defined (not `undefined`).
 */
export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

/**
 * Check whether the value is strictly `undefined`.
 */
export const isUndefined = (val: any): val is undefined => toString(val) === '[object Undefined]'

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

export const isFunction = <T extends (...args: any[]) => any>(val: any): val is T => typeof val === 'function'

export const isNumber = (val: any): val is number => typeof val === 'number'

export const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * Determines whether the given value is a **plain object**.
 *
 * That is, an object created by `{}` or `new Object()`.
 *
 * NOT an array, function, class instance, built-in object (like `Date` or `RegExp`), or `null`.
 */
export const isObject = (val: any): val is object => toString(val) === '[object Object]'

/**
 * Check whether the value is strictly `null`.
 */
export const isNull = (val: any): val is null => toString(val) === '[object Null]'

export const isRegExp = (val: any): val is RegExp => toString(val) === '[object RegExp]'

export const isDate = (val: any): val is Date => toString(val) === '[object Date]'

/**
 * Check whether the input is promise-like, which is non-nullable and has a `then` function property.
 */
export function isPromise(val: unknown): val is Promise<unknown> {
  return !!val && typeof (val as any).then === 'function'
}

/**
 * Check whether the input is **NOT** null or undefined.
 */
export function isPresent<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
