
/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	return /^[0-9]+$/.test(param);
}
