"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import useAppwrite from "@/app/hook/appwrite";
import { DatabaseId, CollectionId } from "@/libs/database";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setTasks } from "@/app/redux/slice/task.slice";
import { motion } from "framer-motion";
import { Query } from "appwrite";

const ToDoSortableItem = dynamic(() => import("./Item"), {
  ssr: false,
});

const ToDoListSort = ({ onTask = 0 }: { onTask?: number }) => {
  const { databases } = useAppwrite();
  const dispatch = useAppDispatch();
  const allTask: any = useAppSelector((state) => state.task);
  const [items, setItems]: any = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //useEffect check allTask if change then update items
  useEffect(() => {
    if (allTask.tasks.length === 0) return;
    console.log("allTask", allTask);
    setItems(allTask.tasks);
  }, [allTask]);

  useEffect(() => {
    if (!databases) return;
    const result = databases?.listDocuments(
      DatabaseId.focusifyApp,
      CollectionId.task,
      [
        // query onTask == 0 only
        Query.equal("onTask", onTask),
      ]
    );
    result.then(
      function (response: any) {
        //add id to items runing number from 0
        response.documents.forEach((item: any, index: number) => {
          item.id = index + 1;
        });
        setItems(response.documents);
        if (onTask === 1) return; //if task is done then return
        dispatch(setTasks(response.documents));
      },
      function (error: any) {
        console.log(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [databases]);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id);
        const newIndex = items.findIndex((item: any) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.length === 0 && (
          <p className="text-[#eaeaea] text-center py-3">No items</p>
        )}
        {items.map((data: any, index: number) => (
          <motion.div
            variants={variants}
            initial="closed"
            animate="open"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            key={index}
          >
            <ToDoSortableItem
              data={data}
              key={data.id}
              id={data.id}
              onTask={onTask}
            />
          </motion.div>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ToDoListSort;
