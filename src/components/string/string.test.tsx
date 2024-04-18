import { reverseStringBySteps } from './utils'

describe('Тест алгоритма разворота строки', () => {
	it('Корректно разворачивает строку с четным количеством символов', () => {
		const str = 'abcdef'
		const expectedSteps = ['abcdef', 'fedcba']
		const result = reverseStringBySteps(str)
		expectedSteps.forEach(step => {
			expect(result).toContain(step)
		})
	})

	it('Корректно разворачивает строку с нечетным количеством символов', () => {
		const str = 'abcde'
		const expectedSteps = ['abcde', 'edcba']
		const result = reverseStringBySteps(str)
		expectedSteps.forEach(step => {
			expect(result).toContain(step)
		})
	})

	it('Корректно разворачивает строку с одним символом', () => {
		const str = 'a'
		const expectedSteps = ['a']
		expect(reverseStringBySteps(str)).toEqual(expectedSteps)
	})

	it('Корректно разворачивает пустую строку', () => {
		const str = ''
		const expectedSteps = ['']
		expect(reverseStringBySteps(str)).toEqual(expectedSteps)
	})
})
