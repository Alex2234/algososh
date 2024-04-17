import { Button } from './button'
import renderer from 'react-test-renderer'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Тест компонента Button', () => {
	it('С текстом', () => {
		const component = renderer.create(<Button text='тест' />).toJSON()

		expect(component).toMatchSnapshot()
	})

	it('Без текста', () => {
		const component = renderer.create(<Button text='' />).toJSON()

		expect(component).toMatchSnapshot()
	})

	it('Заблокированная', () => {
		const component = renderer.create(<Button disabled />).toJSON()

		expect(component).toMatchSnapshot()
	})

	it('С индикацией загрузки', () => {
		const component = renderer.create(<Button isLoader={true} />).toJSON()

		expect(component).toMatchSnapshot()
	})

	it('Корректность вызова колбека при клике', () => {
		const onClick = jest.fn()
		render(<Button onClick={onClick} />)
		fireEvent.click(screen.getByRole('button'))
		expect(onClick).toHaveBeenCalled()
	})
})
