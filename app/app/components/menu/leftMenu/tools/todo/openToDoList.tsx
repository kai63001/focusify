"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setAppTodoList } from "@/app/redux/slice/appControl.slice";

const OpenToDoList = () => {
  const dispath = useAppDispatch();
  const appToDoList = useAppSelector((state) => state.appControl.appTodoList.isShow);
  const openToDoList = () => {
    dispath(setAppTodoList(!appToDoList));
  };

  return (
    <div onClick={openToDoList} className="mt-1 cursor-pointer">
      <i className={`fi fi-sr-note mt-1 ${appToDoList && "text-gray-500"}`}></i>
    </div>
  );
};

export default OpenToDoList;
