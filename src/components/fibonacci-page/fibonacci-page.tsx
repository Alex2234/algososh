import { FC, useState, ChangeEvent, useEffect } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/await";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [fibArray, setFibArray] = useState<number[]>([]);

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsDisabled(!(Number(value) >= 1 && Number(value) <= 19));
  };

  async function firstIteration() {
    setFibArray([1]);
    delay(SHORT_DELAY_IN_MS)
    setFibArray([1, 1]);
  }

  const handleButtonClick = () => {
    setIsLoading(true);
    setFibArray([]);
    let n = parseInt(inputValue);

    function Fibonacci(n: number) {
      if (n === 1) {
        firstIteration();
        setIsLoading(false);
        return;
      }

      firstIteration();
      let i = 2;
      const intervalId = setInterval(() => {
        setFibArray((prevFibArray) => {
          const updatedFibArray = [...prevFibArray];
          if (i > n) {
            setIsLoading(false);
            clearInterval(intervalId);
            return updatedFibArray;
          }
          updatedFibArray.push(updatedFibArray[i - 1] + updatedFibArray[i - 2]);
          return updatedFibArray;
        });
        i++;
      }, SHORT_DELAY_IN_MS);
    }

    Fibonacci(n);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <div className={styles.wrapperInput}>
          <Input
            placeholder="Введите текст"
            type="number"
            max={19}
            isLimitText={true}
            value={inputValue}
            onChange={inputChange}
          />
          <Button
            text="Рассчитать"
            isLoader={isLoading}
            onClick={handleButtonClick}
            disabled={isDisabled}
          />
        </div>
        <div className={styles.circles}>
          {fibArray.map((fib, index) => (
            <Circle letter={`${fib}`} index={index} key={index} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
