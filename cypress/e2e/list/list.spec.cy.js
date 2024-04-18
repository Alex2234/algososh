import {
	defaultStyle,
	changingStyle,
	modifiedStyle,
	circle,
	circleContent,
	input,
	addHeadBtn,
	addTailBtn,
	addIndexBtn,
	deleteHeadBtn,
	deleteTailBtn,
	deleteIndexBtn,
	inputIndex,
} from '../constants'
import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays'

describe('Список', () => {
	it('Eсли в инпуте пусто, то кнопки добавления и кнопка добавления по индексу недоступны', () => {
		cy.visit('list')
		cy.get(input).clear()
		cy.get(addHeadBtn).should('be.disabled')
		cy.get(addTailBtn).should('be.disabled')
		cy.get(addIndexBtn).should('be.disabled')
		cy.get(deleteIndexBtn).should('be.disabled')
	})

	it('Дефолтный список отрисовывается коректно', () => {
		cy.visit('list')

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('34')
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', defaultStyle)
			.contains('8')
		cy.get(circle)
			.eq(3)
			.should('have.css', 'border', defaultStyle)
			.contains('1')
		cy.get(circleContent).eq(0).contains('head')
		cy.get(circleContent).eq(3).contains('tail')
	})

	it('Корректно добавляется элемент в head', () => {
		cy.visit('list')

		cy.get(input).type('10').should('have.value', '10')
		cy.get(addHeadBtn).should('not.be.disabled').click()
		cy.get(circleContent).eq(0).contains('10')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', modifiedStyle)
			.contains('10')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('10')
	})

	it('Корректно добавляется элемент в tail', () => {
		cy.visit('list')

		cy.get(input).type('10').should('have.value', '10')
		cy.get(addTailBtn).should('not.be.disabled').click()
		cy.get(circleContent).eq(3).contains('10')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(4)
			.should('have.css', 'border', modifiedStyle)
			.contains('10')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(4)
			.should('have.css', 'border', defaultStyle)
			.contains('10')
	})

	it('Корректно добавляется элемент по индексу', () => {
		cy.visit('list')

		cy.get(input).type('10').should('have.value', '10')
		cy.get(inputIndex).type('2').should('have.value', '2')
		cy.get(addIndexBtn).should('not.be.disabled').click()
		cy.get(circleContent).eq(0).contains('10')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circleContent).eq(1).contains('10')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', modifiedStyle)
			.contains('10')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', defaultStyle)
			.contains('10')
	})

	it('Корректно удаляется элемент из head', () => {
		cy.visit('list')

		cy.get(deleteHeadBtn).should('not.be.disabled').click()

		cy.get(circleContent).eq(0).contains('0')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('34')
		cy.get(circleContent).eq(0).contains('34')
		cy.get(circleContent).eq(2).contains('1')
	})

	it('Корректно удаляется элемент из tail', () => {
		cy.visit('list')

		cy.get(deleteTailBtn).should('not.be.disabled').click()

		cy.get(circleContent).eq(3).contains('1')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', defaultStyle)
			.contains('8')
		cy.get(circleContent).eq(0).contains('0')
		cy.get(circleContent).eq(2).contains('8')
	})

	it('Корректно удаляется элемент по индексу', () => {
		cy.visit('list')

		cy.get(inputIndex).type('2').should('have.value', '2')
		cy.get(deleteIndexBtn).should('not.be.disabled').click()

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', changingStyle)
			.contains('0')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', changingStyle)
			.contains('34')
		cy.wait(SHORT_DELAY_IN_MS)

		cy.get(circle).eq(2).should('have.text', '')
		cy.get(circleContent).eq(2).contains('1')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('34')
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', defaultStyle)
			.contains('1')
		cy.get(circleContent).eq(0).contains('head')
		cy.get(circleContent).eq(2).contains('tail')
	})
})
