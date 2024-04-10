export const reverseStringBySteps = (str: string) => {
	let stepsArray: string[] = [str]
	let chars = str.split('')

	for (let i = 0; i < Math.floor(str.length / 2); i++) {
		;[chars[i], chars[str.length - 1 - i]] = [
			chars[str.length - 1 - i],
			chars[i],
		]
		stepsArray.push(chars.join(''))
	}

	return stepsArray
}
