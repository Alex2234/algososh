import {
	defaultStyle,
	changingStyle,
	circle,
	circleContent,
} from '../constants'
import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays'

describe('Очередь', () => {
	it('Eсли в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.visit('http://localhost:3000/queue')
		cy.get('input').clear()
		cy.get('[data-id="add"]').should('be.disabled')
	})

	it('Элементы в очередь добавляются корректно', () => {
		cy.visit('http://localhost:3000/queue')

		cy.get('input').type('0').should('have.value', '0')
		cy.get('[data-id="add"]').should('not.be.disabled').click()
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', changingStyle)
			.contains('0')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circleContent).eq(0).contains('head')
		cy.get(circleContent).eq(0).contains('tail')

		cy.get('input').type('1').should('have.value', '1')
		cy.get('[data-id="add"]').should('not.be.disabled').click()
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', changingStyle)
			.contains('1')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('1')
		cy.get(circleContent).eq(0).contains('head')
		cy.get(circleContent).eq(1).contains('tail')
	})

	it('Элементы из очереди удаляются корректно', () => {
		cy.visit('http://localhost:3000/queue')

		cy.get('input').type('0').should('have.value', '0')
		cy.get('[data-id="add"]').should('not.be.disabled').click()

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circleContent).eq(0).contains('head')
		cy.get(circleContent).eq(0).contains('tail')

		cy.get('input').type('1').should('have.value', '1')
		cy.get('[data-id="add"]').should('not.be.disabled').click()

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('1')
		cy.get(circleContent).eq(0).contains('head')
		cy.get(circleContent).eq(1).contains('tail')

		cy.get('[data-id="delete"]').should('not.be.disabled').click()
		cy.get(circle).eq(0).should('have.css', 'border', changingStyle)
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('1')
		cy.get(circleContent).eq(1).contains('head')
		cy.get(circleContent).eq(1).contains('tail')
	})

	it('Кнопка Очистить работает корректно', () => {
		cy.visit('http://localhost:3000/queue')

		cy.get('input').type('0').should('have.value', '0')
		cy.get('[data-id="add"]').should('not.be.disabled').click()

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circleContent).eq(0).contains('head')
		cy.get(circleContent).eq(0).contains('tail')

		cy.get('input').type('1').should('have.value', '1')
		cy.get('[data-id="add"]').should('not.be.disabled').click()

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('1')
		cy.get(circleContent).eq(0).contains('head')
		cy.get(circleContent).eq(1).contains('tail')

		cy.get('[data-id="clear"]').should('not.be.disabled').click()
		cy.get(circle).should('have.text', '')
	})
})
