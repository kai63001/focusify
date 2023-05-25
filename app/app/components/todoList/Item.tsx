import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ToDoCheckBox from "./checkbox";

export function ToDoSortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} >
      <div className="bg-primary rounded-md px-3 py-2 flex items-start mb-2 select-none">
        <ToDoCheckBox />
        <div className="flex-1">
          <p className="text-[#eaeaea] font-bold text-md cursor-pointer">
            Buy the holiday trip to night
          </p>
          <p className="text-[#eaeaea] text-xs">To-Do List</p>
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
