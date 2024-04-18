import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/await'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { TArr } from '../../types/sorting-arr'
import { Direction } from '../../types/direction'

export const randomArr = () => {
	const minVal = 0
	const maxVal = 100
	const minLen = 3
	const maxLen = 17

	const arrLen = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen
	const arr = []
	for (let i = 0; i < arrLen; i++) {
		arr.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal)
	}

	return arr
}

export const sortingChoice = async (
	direction: Direction,
	arr: TArr[],
	set?: React.Dispatch<React.SetStateAction<TArr[]>>
) => {
	if (arr.length === 0) {
		return []
	}

	const sortedArr = [...arr]

	for (let i = 0; i < sortedArr.length - 1; i++) {
		let indexToCompare = i
		sortedArr[i].state = ElementStates.Changing
		set && set([...sortedArr])
		await delay(SHORT_DELAY_IN_MS)

		for (let j = i + 1; j < sortedArr.length; j++) {
			sortedArr[j].state = ElementStates.Changing
			set && set([...sortedArr])
			await delay(SHORT_DELAY_IN_MS)
			sortedArr[j].state = ElementStates.Default

			if (
				(direction === Direction.Ascending &&
					sortedArr[j].height < sortedArr[indexToCompare].height) ||
				(direction === Direction.Descending &&
					sortedArr[j].height > sortedArr[indexToCompare].height)
			) {
				if (indexToCompare !== i) {
					sortedArr[indexToCompare].state = ElementStates.Default
				}
				indexToCompare = j
			} else {
				sortedArr[j].state = ElementStates.Default
			}
		}

		if (indexToCompare !== i) {
			;[sortedArr[i], sortedArr[indexToCompare]] = [
				sortedArr[indexToCompare],
				sortedArr[i],
			]
		}

		sortedArr[i].state = ElementStates.Modified
		set && set([...sortedArr])
		await delay(SHORT_DELAY_IN_MS)

		sortedArr.forEach((element, index) => {
			if (index > i) {
				element.state = ElementStates.Default
			}
		})
	}

	if (sortedArr.length > 0) {
		sortedArr[sortedArr.length - 1].state = ElementStates.Modified
		set && set([...sortedArr])
	}
	return sortedArr
}

export const sortingBubble = async (
	direction: Direction,
	arr: TArr[],
	set?: React.Dispatch<React.SetStateAction<TArr[]>>
) => {
	if (arr.length === 0) {
		return []
	}

	const sortedArr = [...arr]

	let n = sortedArr.length
	let swapped
	do {
		swapped = false
		for (let i = 0; i < n - 1; i++) {
			sortedArr[i].state = ElementStates.Changing
			sortedArr[i + 1].state = ElementStates.Changing
			set && set([...sortedArr])
			await delay(SHORT_DELAY_IN_MS)

			if (
				(direction === Direction.Ascending &&
					sortedArr[i].height > sortedArr[i + 1].height) ||
				(direction === Direction.Descending &&
					sortedArr[i].height < sortedArr[i + 1].height)
			) {
				;[sortedArr[i], sortedArr[i + 1]] = [sortedArr[i + 1], sortedArr[i]]
				swapped = true
			}

			sortedArr[i].state = ElementStates.Default
			sortedArr[i + 1].state = ElementStates.Default
			set && set([...sortedArr])
		}
		sortedArr[n - 1].state = ElementStates.Modified
		n -= 1
	} while (swapped)

	if (sortedArr[0].state !== ElementStates.Modified) {
		sortedArr[0].state = ElementStates.Modified
		set && set([...sortedArr])
	}

	return sortedArr
}
