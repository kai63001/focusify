"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setAppTodoList } from "@/app/redux/slice/appControl.slice";

const OpenToDoList = () => {
  const dispath = useAppDispatch();
  const appToDoList = useAppSelector((state) => state.appControl.appTodoList);
  const openToDoList = () => {
    dispath(setAppTodoList(!appToDoList));
  };

  return (
    <div onClick={openToDoList} className="mt-1 cursor-pointer">
      <i className="fi fi-sr-note mt-1"></i>
    </div>
  );
};

export default OpenToDoList;
