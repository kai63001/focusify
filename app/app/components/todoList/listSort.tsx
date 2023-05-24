"use client"

import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
import { useState } from "react";
import { ToDoSortableItem } from "./Item";


const ToDoListSort = () => {
    const [items, setItems]:any = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event:any) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items:any) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.length === 0 && <p className="text-[#eaeaea] text-center">No items</p>}
        {items.map((id:any) => <ToDoSortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
  );
};

export default ToDoListSort;
