import React from "react";
import { IToDo } from "../atoms";

function ToDo({ text }: IToDo) {
  return <li>{text}</li>;
}
export default ToDo;
