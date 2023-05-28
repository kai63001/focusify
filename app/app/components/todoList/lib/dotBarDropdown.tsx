"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setShowDoneList, setShowTodoList } from "@/app/redux/slice/task.slice";

const DotBarDropDown = () => {
  const dispath = useAppDispatch();
  const showOnTask = useAppSelector((state) => state.task.showOnTask);

  const openToDoList = () => {
    dispath(setShowTodoList(!showOnTask.showTodoList));
  };

  const openDoneList = () => {
    dispath(setShowDoneList(!showOnTask.showDoneList));
  };

  return (
    <div className="absolute text-white bg-primaryLight rounded-md right-5 top-10 w-32 overflow-hidden">
      <ul>
        {/* <li
          onClick={openToDoList}
          className="px-3 py-1 hover:bg-[#232323] cursor-pointer block"
        >
          To Do
        </li> */}
        <li
          onClick={openDoneList}
          className="px-3 py-1 hover:bg-[#232323] cursor-pointer block"
        >
          Done {showOnTask.showDoneList && <i className="fi fi-sr-check"></i>}
        </li>
      </ul>
    </div>
  );
};

export default DotBarDropDown;
