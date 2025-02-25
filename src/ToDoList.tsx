import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  password: string;
  password2: string;
  username: string;
  email: string;
  extraError?: string; // 전체 에러시
}

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const { trigger } = useForm<IForm>();

  const onValid = (data: IForm) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        {
          message: "passwords are not same",
        },
        {
          shouldFocus: true,
        }
      );
      trigger();
    }
    setError("extraError", {
      message: "Server Offline",
    });
  };

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
        <span>{String(errors?.password?.message || "")}</span>

        <input
          {...register("password2", {
            required: "password required",
            minLength: {
              value: 5,
              message: "requires minimum 5 letters",
            },
          })}
          placeholder="confirm password"
        />
        <span>{String(errors?.password2?.message || "")}</span>

        <input
          {...register("username", {
            required: "wrtie here",
            validate: async (value) =>
              value.includes("koko") ? "welcome koko" : true,
          })}
          placeholder="username"
        />
        <span>{String(errors?.username?.message || "")}</span>

        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "only naver emails allowed",
            },
          })}
          placeholder="email"
        />
        <span>{String(errors?.email?.message || "")}</span>

        <button>Add</button>
        <span>{String(errors?.extraError?.message || "")}</span>
      </form>
    </div>
  );
}

export default ToDoList;
