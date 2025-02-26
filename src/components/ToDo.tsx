import React from "react";
import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

// [
//   {
//     text: "45",
//     id: 1740561291928,
//     category: "TO_DO",
//   },
//   {
//     text: "gg",
//     id: 1740561289489,
//     category: "TO_DO",
//   },
//   {
//     text: "fff",
//     id: 1740561199730,
//     category: "TO_DO",
//   },
// ];
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const newToDo = { text, id, category: name as IToDo["category"] };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          TO_DO
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
    </li>
  );
}
export default ToDo;
