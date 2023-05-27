"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ToDoCheckBox from "./checkbox";
import DatePreview from "./lib/datePreview";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { selectTaskList } from "@/app/redux/slice/task.slice";

export function ToDoSortableItem(props: any) {
  const dispatch = useAppDispatch();
  const checkedId = useAppSelector((state) => state.task.checkedId);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ~~props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectTask = () => {
    console.log("selectTask", props.data);
    dispatch(selectTaskList(props.data.$id));
  };

  const timeWasPassed = () => {
    const now = new Date();
    if (!props.data.endDate) return false;
    const endDate = new Date(props.data.endDate);
    return endDate < now;
  };

  return (
    <div style={style}>
      <div className="bg-primary rounded-md px-3 py-2 flex items-start mb-2 select-none">
        <ToDoCheckBox id={props.data.$id} />
        <div className={`flex-1 `}>
          <p
            onClick={selectTask}
            className={`${
              timeWasPassed() ? "text-red-500" : "text-[#eaeaea]"
            } font-bold text-md cursor-pointer ${
              checkedId.indexOf(props.data.$id) >= 0 && "line-through"
            }`}
          >
            {props.data.content}
          </p>
          {props.data.endDate && <DatePreview date={props.data.endDate} />}
        </div>
        <div
          className="items-center cursor-grab m-auto hover:bg-[#2a2a2a] px-2 pt-1 rounded-md"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        >
          <i className="fi fi-br-menu-burger"></i>
        </div>
      </div>
    </div>
  );
}

export default ToDoSortableItem;
