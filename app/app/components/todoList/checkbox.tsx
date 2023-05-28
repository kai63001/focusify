"use client";
import useAppwrite from "@/app/hook/appwrite";
import { useAppDispatch } from "@/app/redux/hook";
import {
  removeCheckedId,
  setCheckedId,
  removeTaskById,
} from "@/app/redux/slice/task.slice";
import { CollectionId, DatabaseId } from "@/libs/database";
import { useState } from "react";

const ToDoCheckBox = ({ id, onTask = 0 }: any) => {
  const { databases } = useAppwrite();
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(onTask === 1 ? true : false);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleChecked = (check: boolean) => {
    if (isLoaded) return;
    setChecked(check);
    if (check) {
      setIsLoaded(true);
      dispatch(setCheckedId(id));
      //remove this task from db
      if (!databases && !check) return;
      // update task set onTask = 1
      // onTask = 1 mean this task is on completed list
      // onTask = 0 mean this task is on todo list
      // onTask feature is not implement yet
      const result: any = databases?.updateDocument(
        DatabaseId.focusifyApp,
        CollectionId.task,
        id,
        {
          onTask: 1,
        }
      );

      result
        .then(function (response: any) {
          //remove allTask by id
          dispatch(removeTaskById(id));
          setIsLoaded(false);
        })
        .catch(function (error: any) {
          console.log(error);
        });
    } else {
      dispatch(removeCheckedId(id));
    }
  };
  if (checked) {
    return (
      <div
        className="bg-blue-800 w-4 h-4 rounded-sm mr-2 mt-1 flex justify-center items-center cursor-pointer"
        // onClick={() => handleChecked(false)}
      >
        <i className="fi fi-br-check text-[#eaeaea] text-xs pt-1"></i>
      </div>
    );
  }
  return (
    <div
      onClick={() => handleChecked(true)}
      className="bg-white w-4 h-4 rounded-sm mr-2 mt-1 cursor-pointer"
    />
  );
};

export default ToDoCheckBox;
