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

const ToDoCheckBox = ({ id }: any) => {
  const { databases } = useAppwrite();
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const handleChecked = (check: boolean) => {
    setChecked(check);
    if (check) {
      dispatch(setCheckedId(id));
      setTimeout(() => {
        //remove this task from db
        if (!databases && !check) return;
        const result: any = databases?.deleteDocument(
          DatabaseId.focusifyApp,
          CollectionId.task,
          id
        );
        result
          .then(function (response: any) {
            //remove allTask by id
            console.log("response", response);
            dispatch(removeTaskById(id));
          })
          .catch(function (error: any) {
            console.log(error);
          });
      }, 500);
    } else {
      dispatch(removeCheckedId(id));
    }
  };
  if (checked) {
    return (
      <div
        className="bg-blueBg w-4 h-4 rounded-sm mr-2 mt-1 flex justify-center items-center cursor-pointer"
        onClick={() => handleChecked(false)}
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
