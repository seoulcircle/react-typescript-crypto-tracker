import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}
export const toDoState = atom<IToDo[]>({
  //atom의 타입이 ToDo의 배열임
  key: "toDo",
  default: [],
});
