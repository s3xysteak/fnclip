import * as is from '.'

export function createTest(): Record<keyof typeof is, [boolean, boolean][]> {
  return {
    isBoolean: [
      [is.isBoolean(true), true],
      [is.isBoolean(false), true],
      [is.isBoolean(1), false],
      [is.isBoolean('false'), false],
    ],
    isDate: [
      [is.isDate(new Date()), true],
      [is.isDate('2001-01-01'), false],
      [is.isDate(Date.now()), false],
    ],
    isDef: [
      [is.isDef(null), true],
      [is.isDef(0), true],
      [is.isDef(undefined), false],
    ],
    isFunction: [
      [is.isFunction(() => {}), true],
      [is.isFunction(1), false],
      [is.isFunction({}), false],
    ],
    isPresent: [
      [is.isPresent(''), true],
      [is.isPresent(0), true],
      [is.isPresent(null), false],
      [is.isPresent(undefined), false],
    ],
    isNull: [
      [is.isNull(null), true],
      [is.isNull(undefined), false],
      [is.isNull(0), false],
    ],
    isNumber: [
      [is.isNumber(1), true],
      [is.isNumber(Number.NaN), true],
      [is.isNumber('1'), false],
      [is.isNumber(true), false],
    ],
    isObject: [
      [is.isObject({}), true],
      [is.isObject(Object.create(null)), true],
      [is.isObject(null), false],
      [is.isObject([]), false],
    ],
    isPromise: [
      [is.isPromise(Promise.resolve()), true],
      [is.isPromise({ then: () => {} }), true],
      [is.isPromise(null), false],
      [is.isPromise(1), false],
    ],
    isRegExp: [
      [is.isRegExp(/a/), true],
      [is.isRegExp('a'), false],
      [is.isRegExp({}), false],
    ],
    isString: [
      [is.isString('1'), true],
      [is.isString(''), true],
      [is.isString(1), false],
      [is.isString(true), false],
    ],
    isUndefined: [
      [is.isUndefined(undefined), true],
      [is.isUndefined(null), false],
      [is.isUndefined(0), false],
    ],
  } as const
}
