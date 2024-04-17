import { Circle } from './circle'
import renderer from 'react-test-renderer'
import { ElementStates } from '../../../types/element-states'

describe('Тест компонента Circle', () => {
	it('Без буквы', () => {
		const component = renderer.create(<Circle letter='' />).toJSON()
		expect(component).toMatchSnapshot()
	})

	it('С буквами', () => {
		const component = renderer.create(<Circle letter='Буквы' />).toJSON()
		expect(component).toMatchSnapshot()
	})

	it('С head', () => {
		const component = renderer.create(<Circle head='Тест' />).toJSON()
		expect(component).toMatchSnapshot()
	})

	it('С react-элементом в head', () => {
		const component = renderer
			.create(<Circle head={<Circle isSmall={true} />} />)
			.toJSON()
		expect(component).toMatchSnapshot()
	})

	it('С tail', () => {
		const component = renderer.create(<Circle head='Тест' />).toJSON()
		expect(component).toMatchSnapshot()
	})

	it('С react-элементом в tail', () => {
		const component = renderer
			.create(<Circle tail={<Circle isSmall={true} />} />)
			.toJSON()
		expect(component).toMatchSnapshot()
	})

	it('С index', () => {
		const component = renderer.create(<Circle index={10} />).toJSON()
		expect(component).toMatchSnapshot()
	})

	it('С пропом isSmall ===  true', () => {
		const component = renderer.create(<Circle isSmall={true} />).toJSON()
		expect(component).toMatchSnapshot()
	})

	it('В состоянии default', () => {
		const component = renderer
			.create(<Circle state={ElementStates.Default} />)
			.toJSON()
		expect(component).toMatchSnapshot()
	})

	it('В состоянии changing', () => {
		const component = renderer
			.create(<Circle state={ElementStates.Changing} />)
			.toJSON()
		expect(component).toMatchSnapshot()
	})

	it('В состоянии modified', () => {
		const component = renderer
			.create(<Circle state={ElementStates.Modified} />)
			.toJSON()
		expect(component).toMatchSnapshot()
	})
})
