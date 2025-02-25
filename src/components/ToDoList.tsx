import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  return (
    <div>
      <form>
        <input placeholder="write here" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
