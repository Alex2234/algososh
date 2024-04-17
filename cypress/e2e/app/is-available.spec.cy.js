describe('Приложение поднялось', function () {
	it('Доступно по адресу localhost:3000', function () {
		cy.visit('http://localhost:3000')
	})
})
