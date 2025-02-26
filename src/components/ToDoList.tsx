import React from "react";

import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onIput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };

  return (
    <div>
      <h1>To DOs</h1>
      <hr />
      <select value={category} onInput={onIput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <CreateToDo />

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
