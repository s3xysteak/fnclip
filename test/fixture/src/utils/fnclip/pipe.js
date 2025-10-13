/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

//#region src/functions/function/pipe/index.ts
function pipe(a, ...fns) {
	if (fns.length === 0) return a;
	let ret = a;
	for (const fn of fns) ret = fn(ret);
	return ret;
}

//#endregion
export { pipe };