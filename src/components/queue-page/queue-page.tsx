import { FC, useState, ChangeEvent } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/await";
import { HEAD, TAIL } from "../../constants/element-captions";

type TArrQueue = {
  item: string;
  state: ElementStates;
  head?: string;
  tail?: string;
};

export const QueuePage: FC = () => {
  const initialArrQueue: TArrQueue[] = Array.from({ length: 7 }, () => ({
    item: "",
    state: ElementStates.Default,
  }));

  const [inputValue, setInputValue] = useState<string>("");
  const [arrQueue, setArrQueue] = useState<TArrQueue[]>(initialArrQueue);
  const [lastIndex, setLastIndex] = useState(-1);

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const enqueue = async (item: string) => {
    let indexToAdd = lastIndex + 1 < arrQueue.length ? lastIndex + 1 : -1;

    if (indexToAdd !== -1) {
      const newQueue = [...arrQueue];
      newQueue[indexToAdd] = {
        item: "",
        state: ElementStates.Changing,
      };

      setArrQueue(newQueue);
      await delay(SHORT_DELAY_IN_MS);
      
      if (indexToAdd > 0) newQueue[indexToAdd - 1].tail = "";
      newQueue[indexToAdd] = {
        item: item,
        state: ElementStates.Default,
        head: arrQueue.every((el) => el.item === "") ? HEAD : "",
        tail: TAIL,
      };

      setArrQueue(newQueue);

      setArrQueue(
        newQueue.map((el) => ({ ...el, state: ElementStates.Default }))
      );

      setLastIndex(indexToAdd);
    }
  };

  const handleEnqueue = () => {
    setInputValue("");
    enqueue(inputValue);
  };

  const dequeue = async () => {
    const newQueue = [...arrQueue];
    let headIndex = newQueue.findIndex((el) => el.head === HEAD);

    if (headIndex !== -1 && newQueue[headIndex].item !== "") {
      newQueue[headIndex] = {
        ...newQueue[headIndex],
        state: ElementStates.Changing,
      };

      setArrQueue([...newQueue]);

      await delay(SHORT_DELAY_IN_MS);

      newQueue[headIndex] = {
        ...newQueue[headIndex],
        item: "",
        state: ElementStates.Default,
        head: undefined,
      };

      const nextItemIndex = newQueue.findIndex(
        (el, index) => index > headIndex && el.item !== ""
      );
      if (nextItemIndex !== -1) {
        newQueue[nextItemIndex].head = HEAD;
      } else {
        const lastItemIndex = newQueue.findIndex(
          (el, index) => el.item !== "" && index < headIndex
        );
        if (lastItemIndex !== -1) {
          newQueue[lastItemIndex].tail = TAIL;
        }
      }

      setArrQueue([...newQueue]);
    }
  };

  const handleDequeue = () => {
    dequeue();
  };

  const handleClearQueue = () => {
    setArrQueue(initialArrQueue);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <Input
            extraClass="mr-6"
            placeholder="Введите текст"
            type="text"
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={inputChange}
          />
          <Button
            extraClass="mr-6"
            text="Добавить"
            disabled={!inputValue}
            onClick={handleEnqueue}
          />
          <Button
            extraClass="mr-20"
            text="Удалить"
            disabled={!arrQueue.some((el) => el.item !== "")}
            onClick={handleDequeue}
          />
          <Button
            text="Очистить"
            disabled={!arrQueue.some((el) => el.item !== "")}
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
              head={item.head}
              tail={item.tail}
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
