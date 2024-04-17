import { Direction } from '../../types/direction'
import { sortingBubble, sortingChoice } from './utils'
import { render } from '@testing-library/react'
import { TArr } from '../../types/sorting-arr'
import { ElementStates } from '../../types/element-states'

describe('Сортировка выбором', () => {
	it('Корректно сортирует пустой массив по возрастанию', async () => {
		const emptyArr: TArr[] = []
		const result = await sortingChoice(Direction.Ascending, emptyArr)
		expect(result).toEqual([])
	})

	it('Корректно сортирует пустой массив по убыванию', async () => {
		const emptyArr: TArr[] = []
		const result = await sortingChoice(Direction.Descending, emptyArr)
		expect(result).toEqual([])
	})

	it('Корректно сортирует массив из одного элемента по возрастанию', async () => {
		const arr: TArr[] = [{ height: 5, state: ElementStates.Default }]
		const result = await sortingChoice(Direction.Ascending, arr)
		expect(result).toEqual([{ height: 5, state: ElementStates.Modified }])
	})

	it('Корректно сортирует массив из одного элемента по убыванию', async () => {
		const arr: TArr[] = [{ height: 5, state: ElementStates.Default }]
		const result = await sortingChoice(Direction.Descending, arr)
		expect(result).toEqual([{ height: 5, state: ElementStates.Modified }])
	})

	it('Корректно сортирует массив из нескольких элементов по возрастанию', async () => {
		const arr: TArr[] = [
			{ height: 5, state: ElementStates.Default },
			{ height: 3, state: ElementStates.Default },
			{ height: 8, state: ElementStates.Default },
		]
		const result = await sortingChoice(Direction.Ascending, arr)
		expect(result).toEqual([
			{ height: 3, state: ElementStates.Modified },
			{ height: 5, state: ElementStates.Modified },
			{ height: 8, state: ElementStates.Modified },
		])
	})

	it('Корректно сортирует массив из нескольких элементов по убыванию', async () => {
		const arr: TArr[] = [
			{ height: 5, state: ElementStates.Default },
			{ height: 3, state: ElementStates.Default },
			{ height: 8, state: ElementStates.Default },
		]
		const result = await sortingChoice(Direction.Descending, arr)
		expect(result).toEqual([
			{ height: 8, state: ElementStates.Modified },
			{ height: 5, state: ElementStates.Modified },
			{ height: 3, state: ElementStates.Modified },
		])
	})
})

describe('Сортировка пузырьком', () => {
	it('Корректно сортирует пустой массив по возрастанию', async () => {
		const emptyArr: TArr[] = []
		const result = await sortingBubble(Direction.Ascending, emptyArr)
		expect(result).toEqual([])
	})

	it('Корректно сортирует пустой массив по убыванию', async () => {
		const emptyArr: TArr[] = []
		const result = await sortingBubble(Direction.Descending, emptyArr)
		expect(result).toEqual([])
	})

	it('Корректно сортирует массив из одного элемента по возрастанию', async () => {
		const arr: TArr[] = [{ height: 5, state: ElementStates.Default }]
		const result = await sortingBubble(Direction.Ascending, arr)
		expect(result).toEqual([{ height: 5, state: ElementStates.Modified }])
	})

	it('Корректно сортирует массив из одного элемента по убыванию', async () => {
		const arr: TArr[] = [{ height: 5, state: ElementStates.Default }]
		const result = await sortingBubble(Direction.Descending, arr)
		expect(result).toEqual([{ height: 5, state: ElementStates.Modified }])
	})

	it('Корректно сортирует массив из нескольких элементов по возрастанию', async () => {
		const arr: TArr[] = [
			{ height: 5, state: ElementStates.Default },
			{ height: 3, state: ElementStates.Default },
			{ height: 8, state: ElementStates.Default },
		]
		const result = await sortingBubble(Direction.Ascending, arr)
		expect(result).toEqual([
			{ height: 3, state: ElementStates.Modified },
			{ height: 5, state: ElementStates.Modified },
			{ height: 8, state: ElementStates.Modified },
		])
	})

	it('Корректно сортирует массив из нескольких элементов по убыванию', async () => {
		const arr: TArr[] = [
			{ height: 5, state: ElementStates.Default },
			{ height: 3, state: ElementStates.Default },
			{ height: 8, state: ElementStates.Default },
		]
		const result = await sortingBubble(Direction.Descending, arr)
		expect(result).toEqual([
			{ height: 8, state: ElementStates.Modified },
			{ height: 5, state: ElementStates.Modified },
			{ height: 3, state: ElementStates.Modified },
		])
	})
})
