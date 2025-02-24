import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  // const [toDo, setToDo] = useState("");
  // const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   const {
  //     currentTarget: { value },
  //   } = event;
  //   setToDo(value);
  // };

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(toDo);
  // };
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data); // 모든 Input의 value값. handleSubmit와 같이 실행, 폼이 제출되면 실행
  };
  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("password", {
            required: "password required",
            minLength: {
              value: 5,
              message: "requires minimum 5 letters",
            },
          })}
          placeholder="password"
        />
        <input {...register("username")} placeholder="username" />
        <input {...register("email")} placeholder="email" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
