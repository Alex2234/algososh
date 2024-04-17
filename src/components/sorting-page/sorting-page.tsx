import { FC, useState, useEffect } from 'react'
import styles from './sorting-page.module.css'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { randomArr } from './utils'
import { Button } from '../ui/button/button'
import { RadioInput } from '../ui/radio-input/radio-input'
import { Column } from '../ui/column/column'
import { Direction } from '../../types/direction'
import { ElementStates } from '../../types/element-states'
import { TArr } from '../../types/sorting-arr'
import { sortingBubble, sortingChoice } from './utils'

export const SortingPage: FC = () => {
	const [arr, setArr] = useState<TArr[]>([])
	const [isChecked, setIsChecked] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [disabled, setDisabled] = useState<Direction | null>(null)

	const handleCheckChange = () => {
		setIsChecked(!isChecked)
	}

	const getArr = () => {
		setArr(
			randomArr().map(item => ({
				height: item,
				state: ElementStates.Default,
			}))
		)
	}

	useEffect(() => {
		getArr()
	}, [])

	const handleCreateArr = () => {
		getArr()
	}

	const handleSortingChoice = (direction: Direction) => {
		setDisabled(direction)
		setIsLoading(true)
		sortingChoice(direction, arr, setArr)
		setIsLoading(false)
	}

	const handleSortingBubble = (direction: Direction) => {
		setDisabled(direction)
		setIsLoading(true)
		sortingBubble(direction, arr, setArr)
		setIsLoading(false)
	}

	return (
		<SolutionLayout title='Сортировка массива'>
			<div className={styles.wrapper}>
				<div className={styles.controls}>
					<RadioInput
						label='Выбор'
						extraClass='mr-20'
						checked={isChecked}
						onChange={handleCheckChange}
						disabled={isLoading}
					/>
					<RadioInput
						label='Пузырек'
						extraClass='mr-25'
						checked={!isChecked}
						onChange={handleCheckChange}
						disabled={isLoading}
					/>
					<Button
						sorting={Direction.Ascending}
						text='По возрастанию'
						extraClass='mr-6'
						isLoader={isLoading && disabled === Direction.Ascending}
						disabled={isLoading}
						onClick={() =>
							isChecked
								? handleSortingChoice(Direction.Ascending)
								: handleSortingBubble(Direction.Ascending)
						}
					/>
					<Button
						sorting={Direction.Descending}
						text='По убыванию'
						extraClass='mr-40'
						isLoader={isLoading && disabled === Direction.Descending}
						disabled={isLoading}
						onClick={() =>
							!isChecked
								? handleSortingBubble(Direction.Descending)
								: handleSortingChoice(Direction.Descending)
						}
					/>
					<Button
						text='Новый массив'
						onClick={handleCreateArr}
						isLoader={isLoading && disabled === null}
						disabled={isLoading}
					/>
				</div>
				<div className={styles.columns}>
					{arr.map((item, index) => (
						<Column key={index} index={item.height} state={item.state} />
					))}
				</div>
			</div>
		</SolutionLayout>
	)
}

export default SortingPage
