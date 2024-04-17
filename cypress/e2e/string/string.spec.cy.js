import {
	defaultStyle,
	changingStyle,
	modifiedStyle,
	circle,
} from '../constants'
import { DELAY_IN_MS } from '../../../src/constants/delays'

describe('Строка', () => {
	it('Eсли в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.visit('http://localhost:3000/recursion')
		cy.get('input').clear()
		cy.get('[data-id="reverse"]').should('be.disabled')
	})

	it('Строка разворачивается корректно', () => {
		cy.visit('http://localhost:3000/recursion')
		cy.get('input').type('1234').should('have.value', '1234')
		cy.get('[data-id="reverse"]').should('not.be.disabled').click()

		cy.wait(DELAY_IN_MS)

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('1')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('2')
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', defaultStyle)
			.contains('3')
		cy.get(circle)
			.eq(3)
			.should('have.css', 'border', defaultStyle)
			.contains('4')

		cy.wait(DELAY_IN_MS)

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', changingStyle)
			.contains('1')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('2')
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', defaultStyle)
			.contains('3')
		cy.get(circle)
			.eq(3)
			.should('have.css', 'border', changingStyle)
			.contains('4')

		cy.wait(DELAY_IN_MS)

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', modifiedStyle)
			.contains('4')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', changingStyle)
			.contains('2')
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', changingStyle)
			.contains('3')
		cy.get(circle)
			.eq(3)
			.should('have.css', 'border', modifiedStyle)
			.contains('1')

		cy.wait(DELAY_IN_MS)

		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', modifiedStyle)
			.contains('4')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', modifiedStyle)
			.contains('3')
		cy.get(circle)
			.eq(2)
			.should('have.css', 'border', modifiedStyle)
			.contains('2')
		cy.get(circle)
			.eq(3)
			.should('have.css', 'border', modifiedStyle)
			.contains('1')
	})
})
