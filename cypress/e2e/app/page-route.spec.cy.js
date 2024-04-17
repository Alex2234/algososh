describe('Переходы по страницам', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('Строка', () => {
		cy.get('a[href="/recursion"]').click()
		cy.contains('Строка')
	})

	it('Последовательность Фибоначчи', () => {
		cy.get('a[href="/fibonacci"]').click()
		cy.contains('Последовательность Фибоначчи')
	})

	it('Сортировка массива', () => {
		cy.get('a[href="/sorting"]').click()
		cy.contains('Сортировка массива')
	})

	it('Стек', () => {
		cy.get('a[href="/stack"]').click()
		cy.contains('Стек')
	})

	it('Очередь', () => {
		cy.get('a[href="/queue"]').click()
		cy.contains('Очередь')
	})

	it('Связный список', () => {
		cy.get('a[href="/list"]').click()
		cy.contains('Связный список')
	})
})
