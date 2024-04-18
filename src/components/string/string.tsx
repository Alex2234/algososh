import { FC, useState } from 'react'
import styles from './string.module.css'
import useForm from '../../hooks/useForm'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/await'
import { DELAY_IN_MS } from '../../constants/delays'
import { reverseStringBySteps } from './utils'

type TLetters = {
	letter: string
	state: ElementStates
}

export const StringComponent: FC = () => {
	const [values, onChange, resetForm] = useForm({ input: '' })
	const [steps, setSteps] = useState<TLetters[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const processString = async (inputStr: string) => {
		setIsLoading(true)
		const reverseSteps = reverseStringBySteps(inputStr)
		let index = 0

		const firstStep = reverseSteps[index].split('').map((letter, idx) => {
			return { letter, state: ElementStates.Default }
		})

		setSteps(firstStep)

		await delay(DELAY_IN_MS)

		const intervalSteps = setInterval(() => {
			if (index < reverseSteps.length) {
				const stepLetters = reverseSteps[index].split('').map((letter, idx) => {
					if (idx === index || idx === inputStr.length - 1 - index) {
						return { letter, state: ElementStates.Changing }
					} else if (
						index > 0 &&
						(idx < index || idx > inputStr.length - 1 - index)
					) {
						return { letter, state: ElementStates.Modified }
					}
					return { letter, state: ElementStates.Default }
				})

				setSteps(stepLetters)

				index++
			} else {
				clearInterval(intervalSteps)
				setIsLoading(false)

				setSteps(steps =>
					steps.map(step => ({
						...step,
						state: ElementStates.Modified,
					}))
				)
			}
		}, DELAY_IN_MS)

		return () => clearInterval(intervalSteps)
	}

	const handleButtonClick = () => {
		resetForm()
		processString(values.input)
	}

	return (
		<SolutionLayout title='Строка'>
			<div className={styles.wrapper}>
				<div className={styles.wrapperInput}>
					<Input
						data-id='input'
						name='input'
						placeholder='Введите текст'
						type='text'
						maxLength={11}
						isLimitText={true}
						value={values.input}
						onChange={onChange}
					/>
					<Button
						data-id='reverse'
						text='Развернуть'
						onClick={handleButtonClick}
						isLoader={isLoading}
						disabled={values.input.trim() === ''}
					/>
				</div>
				<div className={styles.circles}>
					{steps.map((letter, index) => (
						<Circle key={index} letter={letter.letter} state={letter.state} />
					))}
				</div>
			</div>
		</SolutionLayout>
	)
}
