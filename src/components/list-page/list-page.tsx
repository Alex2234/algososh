import { FC, useState, useMemo } from 'react'
import styles from './list-page.module.css'
import useForm from '../../hooks/useForm'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { delay } from '../../utils/await'
import { HEAD, TAIL } from '../../constants/element-captions'
import { ArrowIcon } from '../ui/icons/arrow-icon'
import { LinkedList } from './utils'

type TSmallCircle = {
	item: string
	state: ElementStates
}

type TArrList = {
	item: string
	state?: ElementStates
	head?: boolean
	tail?: boolean
}

export const ListPage: FC = () => {
	const [values, onChange, resetForm] = useForm({ input: '', index: '' })

	const initialArray = useMemo(() => ['0', '34', '8', '1'], [])

	const initialList = useMemo(
		() =>
			initialArray.map(item => ({
				item: item,
				state: ElementStates.Default,
				head: false,
				tail: false,
			})),
		[initialArray]
	)

	const [list] = useState(new LinkedList([...initialArray]))

	const [arrList, setArrList] = useState<TArrList[]>(initialList)
	const [smallCircle, setSmallCircle] = useState<TSmallCircle>({
		item: '',
		state: ElementStates.Changing,
	})
	const [activeOperation, setActiveOperation] = useState<string>('')

	const updateListStateSmallCircle = (
		headAdd: boolean,
		tailAdd: boolean,
		headDel: boolean,
		tailDel: boolean
	) => {
		const newList = arrList.map((item, index, arr) => {
			if (headAdd || tailAdd) {
				const isModifiedAdd =
					(headAdd && index === 0) || (tailAdd && index === arr.length - 1)
				return {
					item: item.item,
					state: ElementStates.Default,
					head: isModifiedAdd ? true : false,
					tail: false,
				}
			} else {
				const isModifiedDel =
					(headDel && index === 0) || (tailDel && index === arr.length - 1)
				return {
					item: isModifiedDel ? '' : item.item,
					state: ElementStates.Default,
					head: false,
					tail: isModifiedDel ? true : false,
				}
			}
		})
		setArrList([...newList])
	}

	const updateListState = (
		state: ElementStates,
		head: boolean,
		tail: boolean
	) => {
		const newList = list.toArray().map((item, index, arr) => {
			const isModified =
				(head && index === 0) || (tail && index === arr.length - 1)
			return {
				item: item,
				state: isModified ? state : ElementStates.Default,
				head: false,
				tail: false,
			}
		})
		setArrList([...newList])
	}

	const handleAddHead = async () => {
		setActiveOperation('AddHead')

		list.prepend(values.input)

		setSmallCircle({
			item: list.toArray()[0],
			state: ElementStates.Changing,
		})
		updateListStateSmallCircle(true, false, false, false)

		await delay(SHORT_DELAY_IN_MS)

		updateListStateSmallCircle(false, false, false, false)

		updateListState(ElementStates.Modified, true, false)

		await delay(SHORT_DELAY_IN_MS)

		updateListState(ElementStates.Default, true, false)

		resetForm()

		setActiveOperation('')
	}

	const handleAddTail = async () => {
		setActiveOperation('AddTail')

		list.append(values.input)

		setSmallCircle({
			item: list.toArray()[list.toArray().length - 1],
			state: ElementStates.Changing,
		})

		updateListStateSmallCircle(false, true, false, false)
		await delay(SHORT_DELAY_IN_MS)

		updateListStateSmallCircle(false, false, false, false)

		updateListState(ElementStates.Modified, false, true)
		await delay(SHORT_DELAY_IN_MS)

		updateListState(ElementStates.Default, true, false)

		resetForm()

		setActiveOperation('')
	}

	const handleDelHead = async () => {
		setActiveOperation('DelHead')
		setSmallCircle({
			item: list.toArray()[0],
			state: ElementStates.Changing,
		})

		updateListStateSmallCircle(false, false, true, false)

		await delay(SHORT_DELAY_IN_MS)

		list.deleteHead()

		updateListState(ElementStates.Default, true, false)

		resetForm()

		setActiveOperation('')
	}

	const handleDelTail = async () => {
		setActiveOperation('DelTail')
		setSmallCircle({
			item: list.toArray()[list.toArray().length - 1],
			state: ElementStates.Changing,
		})

		updateListStateSmallCircle(false, false, false, true)

		await delay(SHORT_DELAY_IN_MS)

		list.deleteTail()

		updateListState(ElementStates.Default, false, true)

		resetForm()

		setActiveOperation('')
	}

	const handleAddIndex = async () => {
		setActiveOperation('AddIndex')

		list.addByIndex(values.input, Number(values.index))

		setSmallCircle({
			item: list.toArray()[Number(values.index)],
			state: ElementStates.Changing,
		})

		if (Number(values.index) !== undefined) {
			for (let i = 0; i <= Number(values.index); i++) {
				if (i !== Number(values.index)) {
					setArrList(prevList => {
						const newList = [...prevList]
						newList[i] = {
							...newList[i],
							head: true,
							tail: false,
						}
						return newList
					})
					await delay(SHORT_DELAY_IN_MS)
					setArrList(prevList => {
						const newList = [...prevList]
						newList[i] = {
							...newList[i],
							state: ElementStates.Changing,
						}
						return newList
					})

					setArrList(prevList => {
						const newList = [...prevList]
						newList[i] = {
							...newList[i],
							head: false,
						}
						return newList
					})
				} else {
					setArrList(prevList => {
						const newList = [...prevList]
						newList[i] = {
							...newList[i],
							head: true,
						}
						return newList
					})
					setArrList(prevList => {
						const newList = [...prevList]
						newList[i] = {
							...newList[i],
							head: false,
						}
						return newList
					})
					setArrList(prevList => {
						const newList = [
							...prevList.slice(0, Number(values.index)),
							{
								item: values.input,
								state: ElementStates.Modified,
								head: false,
								tail: false,
							},
							...prevList.slice(Number(values.index)),
						]
						return newList
					})
					setArrList(prevList =>
						prevList.map((item, index) =>
							index !== Number(values.index)
								? { ...item, state: ElementStates.Default }
								: item
						)
					)
					await delay(SHORT_DELAY_IN_MS)

					setArrList(prevList =>
						prevList.map((item, index) =>
							index === Number(values.index)
								? { ...item, state: ElementStates.Default }
								: item
						)
					)
				}

				setActiveOperation('')
			}
		}
		resetForm()
	}

	const handleDelIndex = async () => {
		setActiveOperation('DelIndex')

		list.deleteByIndex(values.input, Number(values.index))

		setSmallCircle({
			item: list.toArray()[Number(values.index)],
			state: ElementStates.Changing,
		})

		if (Number(values.index) !== undefined) {
			for (let i = 0; i <= Number(values.index); i++) {
				if (i !== Number(values.index)) {
					setArrList(prevList => {
						const newList = [...prevList]
						newList[i] = {
							...newList[i],
							state: ElementStates.Changing,
						}
						return newList
					})
					await delay(SHORT_DELAY_IN_MS)
				} else {
					setArrList(prevList => {
						const newList = [...prevList]
						newList[i] = {
							...newList[i],
							item: '',
							tail: true,
						}
						return newList
					})
					await delay(SHORT_DELAY_IN_MS)
					setArrList(prevList =>
						prevList.filter((_, index) => index !== Number(values.index))
					)
					setArrList(prevList =>
						prevList.map(item => ({ ...item, state: ElementStates.Default }))
					)
				}
			}
			setActiveOperation('')
			resetForm()
		}
	}

	return (
		<SolutionLayout title='Связный список'>
			<div className={styles.wrapper}>
				<div className={styles.controls}>
					<Input
						data-id='input'
						name='input'
						placeholder='Введите текст'
						type='text'
						maxLength={4}
						isLimitText={true}
						onChange={onChange}
						value={values.input}
						disabled={['AddIndex', 'DelIndex', 'AddHead', 'AddTail'].includes(
							activeOperation
						)}
					/>
					<Button
						data-id='add-head'
						text='Добавить в head'
						onClick={handleAddHead}
						disabled={activeOperation !== '' || values.input.trim() === ''}
						isLoader={activeOperation === 'AddHead'}
					/>
					<Button
						data-id='add-tail'
						text='Добавить в tail'
						onClick={handleAddTail}
						disabled={activeOperation !== '' || values.input.trim() === ''}
						isLoader={activeOperation === 'AddTail'}
					/>
					<Button
						data-id='delete-head'
						text='Удалить из head'
						onClick={handleDelHead}
						disabled={activeOperation !== ''}
						isLoader={activeOperation === 'DelHead'}
					/>
					<Button
						data-id='delete-tail'
						text='Удалить из tail'
						onClick={handleDelTail}
						disabled={activeOperation !== ''}
						isLoader={activeOperation === 'DelTail'}
					/>
					<Input
						data-id='input-index'
						name='index'
						type='number'
						placeholder='Введите индекс'
						max={arrList.length - 1}
						min={0}
						onChange={onChange}
						disabled={['AddIndex', 'DelIndex', 'AddHead', 'AddTail'].includes(
							activeOperation
						)}
						value={values.index}
					/>
					<Button
						data-id='add-index'
						text='Добавить по индексу'
						linkedList='big'
						extraClass={styles.button}
						disabled={
							activeOperation !== '' ||
							values.input.trim() === '' ||
							values.index.trim() === '' ||
							Number(values.index) === undefined ||
							Number(values.index) < 0 ||
							Number(values.index) >= arrList.length
						}
						isLoader={activeOperation === 'AddIndex'}
						onClick={handleAddIndex}
					/>
					<Button
						data-id='delete-index'
						text='Удалить по индексу'
						linkedList='big'
						disabled={
							activeOperation !== '' ||
							values.index.trim() === '' ||
							Number(values.index) === undefined ||
							Number(values.index) < 0 ||
							Number(values.index) >= arrList.length
						}
						isLoader={activeOperation === 'DelIndex'}
						onClick={handleDelIndex}
					/>
				</div>
				<div className={styles.wrapperCircles}>
					{arrList.map((item, index) => (
						<div key={index} className={styles.circles}>
							<Circle
								key={index}
								index={index}
								letter={item.item}
								state={item.state}
								head={
									item.head ? (
										<Circle
											isSmall={true}
											letter={smallCircle.item}
											state={smallCircle.state}
										/>
									) : index === 0 ? (
										HEAD
									) : (
										''
									)
								}
								tail={
									item.tail ? (
										<Circle
											isSmall={true}
											letter={smallCircle.item}
											state={smallCircle.state}
										/>
									) : index === arrList.length - 1 ? (
										TAIL
									) : (
										''
									)
								}
							/>
							{index < arrList.length - 1 ? <ArrowIcon /> : ''}
						</div>
					))}
				</div>
			</div>
		</SolutionLayout>
	)
}
