import { FC, useState, ChangeEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/await";
import { DELAY_IN_MS } from "../../constants/delays";

type TLetters = {
  letter: string;
  state: ElementStates;
};

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [lettersArray, setLettersArray] = useState<TLetters[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    let lettersArray = inputValue.split("").map((letter) => ({
      letter: letter,
      state: ElementStates.Default,
    }));
    setLettersArray(lettersArray);
    const length = lettersArray.length;
    const halfLength = Math.floor(length / 2);
    let i = 0;

    const moveString = async () => {
      if (i >= halfLength) {
        setLettersArray((prevLettersArray) =>
          prevLettersArray.map((letter) => ({
            ...letter,
            state: ElementStates.Modified,
          }))
        );
        setIsLoading(false);
        return;
      }

      setLettersArray((prevLettersArray) => {
        const updatedArray = [...prevLettersArray];
        updatedArray[i].state = ElementStates.Changing;
        updatedArray[length - 1 - i].state = ElementStates.Changing;
        return updatedArray;
      });

      await delay(DELAY_IN_MS);

      setLettersArray((prevLettersArray) => {
        const temp = prevLettersArray[i];
        const updatedArray = [...prevLettersArray];
        updatedArray[i] = prevLettersArray[length - 1 - i];
        updatedArray[length - 1 - i] = temp;
        updatedArray[i].state = ElementStates.Modified;
        updatedArray[length - 1 - i].state = ElementStates.Modified;
        return updatedArray;
      });

      i++;

      setTimeout(moveString, DELAY_IN_MS);
    };

    moveString();
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <div className={styles.wrapperInput}>
          <Input
            placeholder="Введите текст"
            type="text"
            maxLength={11}
            isLimitText={true}
            value={inputValue}
            onChange={inputChange}
          />
          <Button
            text="Развернуть"
            onClick={handleButtonClick}
            isLoader={isLoading}
          />
        </div>
        <div className={styles.circles}>
          {lettersArray.map((letter, index) => (
            <Circle key={index} letter={letter.letter} state={letter.state} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
