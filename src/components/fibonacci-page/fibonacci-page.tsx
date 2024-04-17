import { FC, useState } from 'react'
import useForm from '../../hooks/useForm'
import styles from './fibonacci-page.module.css'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { getFibonacciNumbers } from './utils'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { delay } from '../../utils/await'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'

export const FibonacciPage: FC = () => {
	const [values, onChange, resetForm] = useForm({ input: '' })
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [fibArray, setFibArray] = useState<number[]>([])

	const handleButtonClick = async () => {
		setIsLoading(true)
		const n = parseInt(values.input) + 1

		const fibNumbers = getFibonacciNumbers(n)

		setFibArray([])
		resetForm()

		for (let i = 0; i < fibNumbers.length; i++) {
			await delay(SHORT_DELAY_IN_MS)
			setFibArray(prevFibArray => [...prevFibArray, fibNumbers[i]])
		}

		setIsLoading(false)
	}

	return (
		<SolutionLayout title='Последовательность Фибоначчи'>
			<div className={styles.wrapper}>
				<div className={styles.wrapperInput}>
					<Input
						data-id='input'
						name='input'
						placeholder='Введите текст'
						type='number'
						max={19}
						min={0}
						isLimitText={true}
						value={values.input}
						onChange={onChange}
					/>
					<Button
						data-id='calculate'
						text='Рассчитать'
						isLoader={isLoading}
						onClick={handleButtonClick}
						disabled={
							values.input.trim() === '' ||
							parseInt(values.input) < 0 ||
							parseInt(values.input) > 19
						}
					/>
				</div>
				<div className={styles.circles}>
					{fibArray.map((fib, index) => (
						<Circle letter={`${fib}`} index={index} key={index} />
					))}
				</div>
			</div>
		</SolutionLayout>
	)
}
