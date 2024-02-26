import { FC, useState, ChangeEvent } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/await";
import { HEAD, TAIL } from "../../constants/element-captions";
import { ArrowIcon } from "../ui/icons/arrow-icon";

type TSmallCircle = {
  item: string;
  state: ElementStates;
};

type TArrList = {
  item: string;
  state: ElementStates;
  head?: boolean;
  tail?: boolean;
};

export const ListPage: FC = () => {
  const initialArrList: TArrList[] = [
    { item: "0", state: ElementStates.Default, head: false, tail: false },
    { item: "34", state: ElementStates.Default, head: false, tail: false },
    { item: "8", state: ElementStates.Default, head: false, tail: false },
    { item: "1", state: ElementStates.Default, head: false, tail: false },
  ];

  const [inputValue, setInputValue] = useState<string>("");
  const [arrList, setArrList] = useState<TArrList[]>(initialArrList);
  const [smallCircle, setSmallCircle] = useState<TSmallCircle>({
    item: "",
    state: ElementStates.Changing,
  });
  const [activeOperation, setActiveOperation] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>();

  const inputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const inputIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueIndex = e.target.value;
    setInputIndex(Number(valueIndex));
  };

  const handleAddHead = async () => {
    setActiveOperation("AddHead");
    setSmallCircle({
      item: inputValue,
      state: ElementStates.Changing,
    });

    setArrList((prevList) => {
      const newList = [...prevList];
      newList[0] = { ...newList[0], head: true, tail: false };
      return newList;
    });
    await delay(SHORT_DELAY_IN_MS);

    setArrList((prevList) => {
      const newList = [...prevList];
      newList[0] = { ...newList[0], head: false, tail: false };
      return newList;
    });

    setArrList((prevList) => [
      {
        item: inputValue,
        state: ElementStates.Modified,
        head: false,
        tail: false,
      },
      ...prevList.map((item) => ({ ...item, head: false, tail: false })),
    ]);

    await delay(SHORT_DELAY_IN_MS);

    setArrList((prevList) => [
      { ...prevList[0], state: ElementStates.Default },
      ...prevList.slice(1),
    ]);

    setInputValue("");
    setSmallCircle({
      item: "",
      state: ElementStates.Default,
    });
    setActiveOperation("");
  };

  const handleAddTail = async () => {
    setActiveOperation("AddTail");

    setSmallCircle({
      item: inputValue,
      state: ElementStates.Changing,
    });

    setArrList((prevList) => {
      const newList = [...prevList];
      newList[newList.length - 1] = {
        ...newList[newList.length - 1],
        head: true,
        tail: false,
      };
      return newList;
    });

    await delay(SHORT_DELAY_IN_MS);

    setArrList((prevList) => {
      const newList = [...prevList];
      newList[newList.length - 1] = {
        ...newList[newList.length - 1],
        head: false,
        tail: false,
      };
      return newList;
    });

    setArrList((prevList) => [
      ...prevList,
      {
        item: inputValue,
        state: ElementStates.Modified,
        head: false,
        tail: false,
      },
    ]);

    await delay(SHORT_DELAY_IN_MS);

    setArrList((prevList) => {
      const newList = [...prevList];

      newList[newList.length - 1] = {
        ...newList[newList.length - 1],
        state: ElementStates.Default,
      };
      return newList;
    });

    setInputValue("");
    setSmallCircle({
      item: "",
      state: ElementStates.Default,
    });
    setActiveOperation("");
  };

  const handleDelHead = async () => {
    setActiveOperation("DelHead");
    setSmallCircle({
      item: arrList[0].item,
      state: ElementStates.Changing,
    });

    setArrList((prevList) => {
      const newList = [...prevList];
      newList[0] = {
        ...newList[0],
        item: "",
        head: false,
        tail: true,
      };
      return newList;
    });

    await delay(SHORT_DELAY_IN_MS);

    setArrList((prevList) => prevList.slice(1));

    setInputValue("");
    setSmallCircle({
      item: "",
      state: ElementStates.Default,
    });

    setActiveOperation("");
  };

  const handleDelTail = async () => {
    setActiveOperation("DelTail");
    setSmallCircle({
      item: arrList[arrList.length - 1].item,
      state: ElementStates.Changing,
    });

    setArrList((prevList) => {
      const newList = [...prevList];
      newList[newList.length - 1] = {
        ...newList[newList.length - 1],
        item: "",
        head: false,
        tail: true,
      };
      return newList;
    });

    await delay(SHORT_DELAY_IN_MS);

    setArrList((prevList) => prevList.slice(0, -1));

    setInputValue("");
    setSmallCircle({
      item: "",
      state: ElementStates.Default,
    });

    setActiveOperation("");
  };

  const handleAddIndex = async () => {
    setActiveOperation("AddIndex");
    if (inputIndex !== undefined) {
      for (let i = 0; i <= inputIndex; i++) {
        if (i === inputIndex) {
          setArrList((prevList) => {
            const newList = [...prevList];
            newList[i] = {
              ...newList[i],
              head: true,
              tail: false,
            };
            return newList;
          });
          setSmallCircle({
            item: inputValue,
            state: ElementStates.Changing,
          });
          await delay(SHORT_DELAY_IN_MS);
          setArrList((prevList) => {
            const newList = [...prevList];
            newList[i] = {
              ...newList[i],
              head: false,
              tail: false,
            };
            return newList;
          });
          setArrList((prevList) => {
            const newList = [
              ...prevList.slice(0, inputIndex),
              {
                item: inputValue,
                state: ElementStates.Modified,
                head: false,
                tail: false,
              },
              ...prevList.slice(inputIndex),
            ];
            return newList;
          });
          await delay(SHORT_DELAY_IN_MS);
          setArrList((prevList) =>
            prevList.map((item, index) =>
              index !== inputIndex
                ? { ...item, state: ElementStates.Default }
                : item
            )
          );
          await delay(500);

          setArrList((prevList) =>
            prevList.map((item, index) =>
              index === inputIndex
                ? { ...item, state: ElementStates.Default }
                : item
            )
          );
        } else {
          setArrList((prevList) => {
            const newList = [...prevList];
            newList[i] = {
              ...newList[i],
              head: true,
              tail: false,
            };
            return newList;
          });
          setSmallCircle({
            item: inputValue,
            state: ElementStates.Changing,
          });
          await delay(SHORT_DELAY_IN_MS);
          setArrList((prevList) => {
            const newList = [...prevList];
            newList[i] = {
              ...newList[i],
              state: ElementStates.Changing,
            };
            return newList;
          });

          await delay(SHORT_DELAY_IN_MS);
          setArrList((prevList) => {
            const newList = [...prevList];
            newList[i] = {
              ...newList[i],
              state: ElementStates.Changing,
              head: false,
              tail: false,
            };
            return newList;
          });
        }
      }
    }
    setActiveOperation("");
  };

  const handleDelIndex = async () => {
    setActiveOperation("DelIndex");
    if (inputIndex !== undefined) {
      for (let i = 0; i <= inputIndex; i++) {
        if (i !== inputIndex) {
          setArrList((prevList) => {
            const newList = [...prevList];
            newList[i] = {
              ...newList[i],
              state: ElementStates.Changing,
            };
            return newList;
          });
          await delay(SHORT_DELAY_IN_MS);
        } else {
          setArrList((prevList) => {
            const newList = [...prevList];
            newList[i] = {
              ...newList[i],
              item: "",
              tail: true,
            };
            return newList;
          });
          setSmallCircle({
            item: arrList[i].item,
            state: ElementStates.Changing,
          });
          await delay(SHORT_DELAY_IN_MS);
          setArrList((prevList) =>
            prevList.filter((_, index) => index !== inputIndex)
          );
          setArrList((prevList) =>
            prevList.map((item) => ({ ...item, state: ElementStates.Default }))
          );
        }
      }
    }
    setActiveOperation("");
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <Input
            placeholder="Введите текст"
            type="text"
            maxLength={4}
            isLimitText={true}
            onChange={inputValueChange}
            value={inputValue}
          />
          <Button
            text="Добавить в head"
            onClick={handleAddHead}
            disabled={activeOperation !== "" || inputValue.trim() === ""}
            isLoader={activeOperation === "AddHead"}
          />
          <Button
            text="Добавить в tail"
            onClick={handleAddTail}
            disabled={activeOperation !== "" || inputValue.trim() === ""}
            isLoader={activeOperation === "AddTail"}
          />
          <Button
            text="Удалить из head"
            onClick={handleDelHead}
            disabled={activeOperation !== ""}
            isLoader={activeOperation === "DelHead"}
          />
          <Button
            text="Удалить из tail"
            onClick={handleDelTail}
            disabled={activeOperation !== ""}
            isLoader={activeOperation === "DelTail"}
          />
          <Input
            placeholder="Введите индекс"
            type="number"
            max={arrList.length - 1}
            onChange={inputIndexChange}
            value={inputIndex}
          />
          <Button
            text="Добавить по индексу"
            linkedList="big"
            extraClass={styles.button}
            disabled={
              activeOperation !== "" ||
              inputValue.trim() === "" ||
              inputIndex === undefined ||
              inputIndex < 0 ||
              inputIndex >= arrList.length
            }
            isLoader={activeOperation === "AddIndex"}
            onClick={handleAddIndex}
          />
          <Button
            text="Удалить по индексу"
            linkedList="big"
            disabled={
              activeOperation !== "" ||
              inputIndex === undefined ||
              inputIndex < 0 ||
              inputIndex >= arrList.length
            }
            isLoader={activeOperation === "DelIndex"}
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
                    ""
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
                    ""
                  )
                }
              />
              {index < arrList.length - 1 ? <ArrowIcon /> : ""}
            </div>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
