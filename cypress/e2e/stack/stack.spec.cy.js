import {
	defaultStyle,
	changingStyle,
	circle,
	input,
	addBtn,
	deleteBtn,
	clearBtn,
} from '../constants'
import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays'

describe('Стек', () => {
	it('Eсли в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.visit('stack')
		cy.get('input').clear()
		cy.get(addBtn).should('be.disabled')
	})

	it('Элементы в стек добавляются корректно', () => {
		cy.visit('stack')

		cy.get(input).type('0').should('have.value', '0')
		cy.get(addBtn).should('not.be.disabled').click()
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', changingStyle)
			.contains('0')
		cy.wait(SHORT_DELAY_IN_MS)
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')

		cy.get(input).type('1').should('have.value', '1')
		cy.get(addBtn).should('not.be.disabled').click()
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
	})

	it('Элементы из стека удаляются корректно', () => {
		cy.visit('stack')

		cy.get(input).type('0').should('have.value', '0')
		cy.get(addBtn).should('not.be.disabled').click()
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')

		cy.get('input').type('1').should('have.value', '1')
		cy.get(addBtn).should('not.be.disabled').click()
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('1')

		cy.get(deleteBtn).should('not.be.disabled').click()
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
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
	})

	it('Кнопка Очистить работает корректно', () => {
		cy.visit('stack')

		cy.get(input).type('0').should('have.value', '0')
		cy.get(addBtn).should('not.be.disabled').click()
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')

		cy.get(input).type('1').should('have.value', '1')
		cy.get(addBtn).should('not.be.disabled').click()
		cy.get(circle)
			.eq(0)
			.should('have.css', 'border', defaultStyle)
			.contains('0')
		cy.get(circle)
			.eq(1)
			.should('have.css', 'border', defaultStyle)
			.contains('1')

		cy.get(clearBtn).should('not.be.disabled').click()
		cy.get(circle).should('have.length', 0)
	})
})
