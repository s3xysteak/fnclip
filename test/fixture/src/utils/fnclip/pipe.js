/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

//#region src/functions/function/pipe/index.ts
/**
* pipe() can be called on one or more functions, each of which can take one argument ("UnaryFunction")
* and uses it to return a value.
* It returns a function that takes one argument, passes it to the first UnaryFunction, and then
* passes the result to the next one, passes that result to the next one, and so on.
*
* @example
* const fn = pipe((v: number) => v + 1, v => v * 2)
* fn(1) // -> 4
*/
function pipe(...fns) {
	return fns.length === 1 ? fns[0] : (input) => fns.reduce(pipeReducer, input);
}
function pipeReducer(prev, fn) {
	return fn(prev);
}

//#endregion
export { pipe };