import { FC, useState, ChangeEvent } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/await";

type TArrStack = {
  value: string;
  state: ElementStates;
};

export const StackPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [arrStack, setArrStack] = useState<TArrStack[]>([]);

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handlePushElem = async () => {
    setInputValue("");

    const newElement: TArrStack = {
      value: inputValue,
      state: ElementStates.Changing,
    };

    const newArr = [...arrStack];

    newArr.push(newElement);
    setArrStack(newArr);

    await delay(SHORT_DELAY_IN_MS);

    setArrStack((currentStack) =>
      currentStack.map((item, index) =>
        index === currentStack.length - 1
          ? { ...item, state: ElementStates.Default }
          : item
      )
    );
  };

  const handlePopElem = async () => {
    setArrStack((currentStack) =>
      currentStack.map((item, index) =>
        index === currentStack.length - 1
          ? { ...item, state: ElementStates.Changing }
          : item
      )
    );
    await delay(SHORT_DELAY_IN_MS);
    const newArr = [...arrStack];
    newArr.pop();
    setArrStack(newArr);
  };

  const handleClearStack = () => {
    setArrStack([]);
  };

  return (
    <SolutionLayout title="Стек">
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
            onClick={handlePushElem}
          />
          <Button
            extraClass="mr-20"
            text="Удалить"
            disabled={arrStack.length === 0}
            onClick={handlePopElem}
          />
          <Button
            text="Очистить"
            disabled={arrStack.length === 0}
            onClick={handleClearStack}
          />
        </div>
        <div className={styles.circles}>
          {arrStack.map((item, index) => (
            <Circle
              key={index}
              index={index}
              letter={item.value}
              state={item.state}
              head={index === arrStack.length - 1 ? "top" : ""}
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
