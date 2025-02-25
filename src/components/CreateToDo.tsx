import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

// interface IToDo {
//   text: string;
//   id: number;
//   category: "TO_DO" | "DOING" | "DONE";
// }

// const toDoState = atom<IToDo[]>({
//   //atom의 타입이 ToDo의 배열임
//   key: "toDo",
//   default: [],
// });

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", {
          required: "todo is required",
        })}
        placeholder="write here"
      />
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
