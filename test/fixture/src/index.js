import { pipe } from './utils/fnclip'

/** @param {number} x */
function plusOne(x) {
  return x + 1
}

// should have correct param type and return type
const result = pipe(plusOne, x => x ** 2, String)(1)

// eslint-disable-next-line no-console
console.log(result === '4') // -> true
