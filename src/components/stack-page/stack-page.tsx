import { FC, useState } from 'react'
import styles from './stack-page.module.css'
import useForm from '../../hooks/useForm'
import { Stack } from './utils'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { delay } from '../../utils/await'

type TArrStack = {
	value: string
	state: ElementStates
}

export const StackPage: FC = () => {
	const [values, onChange, resetForm] = useForm({ input: '' })
	const [stack, setStack] = useState(new Stack<TArrStack>())
	const [activeOperation, setActiveOperation] = useState<string>('')

	const handlePushStack = async () => {
		setActiveOperation('addElem')
		resetForm()

		const newElement: TArrStack = {
			value: values.input,
			state: ElementStates.Changing,
		}

		const updatedStack = new Stack<TArrStack>()
		stack.getElements().forEach(element => updatedStack.push(element))
		updatedStack.push(newElement)

		setStack(updatedStack)

		await delay(SHORT_DELAY_IN_MS)

		setStack(prevStack => {
			const finalStack = new Stack<TArrStack>()
			prevStack.getElements().forEach((element, index) => {
				if (index === prevStack.getSize() - 1) {
					finalStack.push({ ...element, state: ElementStates.Default })
				} else {
					finalStack.push(element)
				}
			})
			return finalStack
		})

		setActiveOperation('')
	}

	const handlePopStack = async () => {
		setActiveOperation('delElem')

		if (stack.getSize() > 0) {
			const updatedStack = new Stack<TArrStack>()
			stack.getElements().forEach((element, index) => {
				if (index === stack.getSize() - 1) {
					updatedStack.push({ ...element, state: ElementStates.Changing })
				} else {
					updatedStack.push(element)
				}
			})
			setStack(updatedStack)

			await delay(SHORT_DELAY_IN_MS)
			stack.pop()
			setStack(new Stack<TArrStack>(stack.getElements()))
		}

		setActiveOperation('')
	}

	const handleClearStack = () => {
		setActiveOperation('clear')
		stack.clear()
		setStack(new Stack<TArrStack>())
		setActiveOperation('')
	}

	return (
		<SolutionLayout title='Стек'>
			<div className={styles.wrapper}>
				<div className={styles.controls}>
					<Input
						name='input'
						extraClass='mr-6'
						placeholder='Введите текст'
						type='text'
						maxLength={4}
						isLimitText={true}
						value={values.input}
						onChange={onChange}
					/>
					<Button
						data-id='add'
						extraClass='mr-6'
						text='Добавить'
						disabled={values.input.trim() === ''}
						onClick={handlePushStack}
						isLoader={activeOperation === 'addElem'}
					/>
					<Button
						data-id='delete'
						extraClass='mr-20'
						text='Удалить'
						disabled={activeOperation !== '' || stack.getSize() <= 0}
						onClick={handlePopStack}
						isLoader={activeOperation === 'delElem'}
					/>
					<Button
						data-id='clear'
						text='Очистить'
						disabled={activeOperation !== '' || stack.getSize() <= 0}
						onClick={handleClearStack}
						isLoader={activeOperation === 'clear'}
					/>
				</div>
				<div className={styles.circles}>
					{stack.getElements().map((item, index) => (
						<Circle
							key={index}
							letter={item.value}
							state={item.state}
							head={index === stack.getSize() - 1 ? 'top' : undefined}
						/>
					))}
				</div>
			</div>
		</SolutionLayout>
	)
}
