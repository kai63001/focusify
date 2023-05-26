"use client";
import { useState } from "react";

const ToDoCheckBox = () => {
  const [checked, setChecked] = useState(false);
  if (checked) {
    return (
      <div
        className="bg-blueBg w-4 h-4 rounded-sm mr-2 mt-1 flex justify-center items-center cursor-pointer"
        onClick={() => setChecked(!checked)}
      >
        <i className="fi fi-br-check text-[#eaeaea] text-xs pt-1"></i>
      </div>
    );
  }
  return (
    <div
      onClick={() => setChecked(true)}
      className="bg-white w-4 h-4 rounded-sm mr-2 mt-1 cursor-pointer"
    />
  );
};

export default ToDoCheckBox;
