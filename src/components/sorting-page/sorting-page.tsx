import { FC, useState, useEffect } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { randomArr } from "./utils";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/await";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TArr = {
  height: number;
  state: ElementStates;
};

export const SortingPage: FC = () => {
  const [arr, setArr] = useState<TArr[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<Direction | null>(null);

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };

  const getArr = () => {
    setArr(
      randomArr().map((item) => ({
        height: item,
        state: ElementStates.Default,
      }))
    );
  };

  useEffect(() => {
    getArr();
  }, []);

  const handleCreateArr = () => {
    getArr();
  };

  const handleSortingIncreaseChoice = async (direction: Direction) => {
    setDisabled(direction);
    setIsLoading(true);

    const sortedArr = [...arr];

    for (let i = 0; i < sortedArr.length - 1; i++) {
      let minIndex = i;
      sortedArr[i].state = ElementStates.Changing;
      setArr([...sortedArr]);
      await delay(SHORT_DELAY_IN_MS);

      for (let j = i + 1; j < sortedArr.length; j++) {
        sortedArr[j].state = ElementStates.Changing;
        setArr([...sortedArr]);
        await delay(SHORT_DELAY_IN_MS);
        sortedArr[j].state = ElementStates.Default;

        if (sortedArr[j].height < sortedArr[minIndex].height) {
          if (minIndex !== i) {
            sortedArr[minIndex].state = ElementStates.Default;
          }
          minIndex = j;
        } else {
          sortedArr[j].state = ElementStates.Default;
        }
      }

      if (minIndex !== i) {
        [sortedArr[i], sortedArr[minIndex]] = [
          sortedArr[minIndex],
          sortedArr[i],
        ];
      }

      sortedArr[i].state = ElementStates.Modified;
      setArr([...sortedArr]);
      await delay(SHORT_DELAY_IN_MS);

      sortedArr.forEach((element, index) => {
        if (index > i) {
          element.state = ElementStates.Default;
        }
      });
    }
    sortedArr[sortedArr.length - 1].state = ElementStates.Modified;
    setArr([...sortedArr]);

    setIsLoading(false);
  };

  const handleSortingDecreaseChoice = async (direction: Direction) => {
    setDisabled(direction);
    setIsLoading(true);

    const sortedArr = [...arr];

    for (let i = 0; i < sortedArr.length - 1; i++) {
      let maxIndex = i;
      sortedArr[i].state = ElementStates.Changing;
      setArr([...sortedArr]);
      await delay(SHORT_DELAY_IN_MS);

      for (let j = i + 1; j < sortedArr.length; j++) {
        sortedArr[j].state = ElementStates.Changing;
        setArr([...sortedArr]);
        await delay(SHORT_DELAY_IN_MS);
        sortedArr[j].state = ElementStates.Default;

        if (sortedArr[j].height > sortedArr[maxIndex].height) {
          if (maxIndex !== i) {
            sortedArr[maxIndex].state = ElementStates.Default;
          }
          maxIndex = j;
        } else {
          sortedArr[j].state = ElementStates.Default;
        }
      }

      if (maxIndex !== i) {
        [sortedArr[i], sortedArr[maxIndex]] = [
          sortedArr[maxIndex],
          sortedArr[i],
        ];
      }

      sortedArr[i].state = ElementStates.Modified;
      setArr([...sortedArr]);
      await delay(SHORT_DELAY_IN_MS);

      sortedArr.forEach((element, index) => {
        if (index > i) {
          element.state = ElementStates.Default;
        }
      });
    }

    sortedArr[sortedArr.length - 1].state = ElementStates.Modified;
    setArr([...sortedArr]);

    setIsLoading(false);
  };

  const handleSortingIncreaseBubble = async (direction: Direction) => {
    setDisabled(direction);
    setIsLoading(true);

    const sortedArr = [...arr];

    let n = sortedArr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        sortedArr[i].state = ElementStates.Changing;
        sortedArr[i + 1].state = ElementStates.Changing;
        setArr([...sortedArr]);
        await delay(SHORT_DELAY_IN_MS);

        if (sortedArr[i].height > sortedArr[i + 1].height) {
          [sortedArr[i], sortedArr[i + 1]] = [sortedArr[i + 1], sortedArr[i]];
          swapped = true;
        }

        sortedArr[i].state = ElementStates.Default;
        sortedArr[i + 1].state = ElementStates.Default;
        setArr([...sortedArr]);
      }
      sortedArr[n - 1].state = ElementStates.Modified;
      n -= 1;
    } while (swapped);

    if (sortedArr[0].state !== ElementStates.Modified) {
      sortedArr[0].state = ElementStates.Modified;
      setArr([...sortedArr]);
    }

    setIsLoading(false);
  };

  const handleSortingDecreaseBubble = async (direction: Direction) => {
    setDisabled(direction);
    setIsLoading(true);

    const sortedArr = [...arr];

    let n = sortedArr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        sortedArr[i].state = ElementStates.Changing;
        sortedArr[i + 1].state = ElementStates.Changing;
        setArr([...sortedArr]);
        await delay(SHORT_DELAY_IN_MS);

        if (sortedArr[i].height < sortedArr[i + 1].height) {
          [sortedArr[i], sortedArr[i + 1]] = [sortedArr[i + 1], sortedArr[i]];
          swapped = true;
        }

        sortedArr[i].state = ElementStates.Default;
        sortedArr[i + 1].state = ElementStates.Default;
        setArr([...sortedArr]);
      }
      sortedArr[n - 1].state = ElementStates.Modified;
      n -= 1;
    } while (swapped);

    if (sortedArr[0].state !== ElementStates.Modified) {
      sortedArr[0].state = ElementStates.Modified;
      setArr([...sortedArr]);
    }

    setIsLoading(false);
  };

  const handleSortIncrease = () => {
    if (isChecked) {
      handleSortingIncreaseChoice(Direction.Ascending);
    } else {
      handleSortingIncreaseBubble(Direction.Ascending);
    }
  };

  const handleSortDecrease = () => {
    if (isChecked) {
      handleSortingDecreaseChoice(Direction.Descending);
    } else {
      handleSortingDecreaseBubble(Direction.Descending);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <RadioInput
            label="Выбор"
            extraClass="mr-20"
            checked={isChecked}
            onChange={handleCheckChange}
            disabled={isLoading}
          />
          <RadioInput
            label="Пузырек"
            extraClass="mr-25"
            checked={!isChecked}
            onChange={handleCheckChange}
            disabled={isLoading}
          />
          <Button
            sorting={Direction.Ascending}
            text="По возрастанию"
            extraClass="mr-6"
            isLoader={isLoading && disabled === Direction.Ascending}
            disabled={isLoading}
            onClick={handleSortIncrease}
          />
          <Button
            sorting={Direction.Descending}
            text="По убыванию"
            extraClass="mr-40"
            isLoader={isLoading && disabled === Direction.Descending}
            disabled={isLoading}
            onClick={handleSortDecrease}
          />
          <Button
            text="Новый массив"
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
  );
};

export default SortingPage;
