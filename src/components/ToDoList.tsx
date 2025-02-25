import React, { useState } from "react";

import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { toDoState } from "../atoms";
import { useRecoilValue } from "recoil";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To DOs</h1>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
