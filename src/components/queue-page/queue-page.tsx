import { FC, useState } from 'react'
import styles from './queue-page.module.css'
import useForm from '../../hooks/useForm'
import { Queue } from './utils'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { delay } from '../../utils/await'
import { HEAD, TAIL } from '../../constants/element-captions'

type TArrQueue = {
	item?: string
	state: ElementStates
}

export const QueuePage: FC = () => {
	const [queue] = useState(new Queue(7))

	const arr: TArrQueue[] = []
	for (let i = 0; i < 7; i++) {
		arr.push({ item: '', state: ElementStates.Default })
	}

	const [values, onChange, resetForm] = useForm({ input: '' })
	const [arrQueue, setArrQueue] = useState<TArrQueue[]>(arr)

	const enqueue = async (item: string) => {
		resetForm()
		queue.enqueue(item)
		arrQueue[queue.getTail()] = {
			item: '',
			state: ElementStates.Changing,
		}
		setArrQueue([...arrQueue])
		await delay(SHORT_DELAY_IN_MS)
		arrQueue[queue.getTail()] = {
			item: item,
			state: ElementStates.Default,
		}
		setArrQueue([...arrQueue])
	}

	const dequeue = async () => {
		arrQueue[queue.getHead()] = {
			state: ElementStates.Changing,
		}
		setArrQueue([...arrQueue])
		await delay(SHORT_DELAY_IN_MS)
		queue.dequeue()
		arrQueue[queue.getHead() - 1] = {
			item: '',
			state: ElementStates.Default,
		}
		setArrQueue([...arrQueue])
	}

	const handleEnqueue = () => {
		enqueue(values.input)
	}

	const handleDequeue = () => {
		dequeue()
	}

	const handleClearQueue = () => {
		queue.clear()
		setArrQueue(arr)
	}

	return (
		<SolutionLayout title='Очередь'>
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
						extraClass='mr-6'
						text='Добавить'
						disabled={!values.input}
						onClick={handleEnqueue}
					/>
					<Button
						extraClass='mr-20'
						text='Удалить'
						disabled={!arrQueue.some(el => el.item !== '')}
						onClick={handleDequeue}
					/>
					<Button
						text='Очистить'
						disabled={!arrQueue.some(el => el.item !== '')}
						onClick={handleClearQueue}
					/>
				</div>
				<div className={styles.circles}>
					{arrQueue.map((item, index) => (
						<Circle
							key={index}
							index={index}
							letter={item.item}
							state={item.state}
							head={
								queue.isEmpty() ? '' : index === queue.getHead() ? HEAD : ''
							}
							tail={
								queue.isEmpty() ? '' : index === queue.getTail() ? TAIL : ''
							}
						/>
					))}
				</div>
			</div>
		</SolutionLayout>
	)
}
