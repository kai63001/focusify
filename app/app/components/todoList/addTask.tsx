"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useAppwrite from "@/app/hook/appwrite";
import { ID, Permission } from "appwrite";
import { DatabaseId, CollectionId } from "@/libs/database";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { addTask } from "@/app/redux/slice/task.slice";

const AddTask = () => {
  const { databases } = useAppwrite();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task);

  const [showAddTask, setShowAddTask] = useState(false);

  const [inputTask, setInputTask] = useState("");

  const handleCancel = () => {
    //check if input is not empty alert
    if (inputTask.length > 0) {
      if (confirm("Are you sure you want to cancel?")) {
        // Handle cancel logic here
        setInputTask("");
        setShowAddTask(false);
      }
    } else {
      setShowAddTask(false);
    }
  };

  const handleSave = () => {
    if (inputTask.length <= 0) return;
    //save to db
    const result = databases?.createDocument(
      DatabaseId.focusifyApp,
      CollectionId.task,
      ID.unique(),
      {
        content: inputTask,
      }
    );

    result.then(
      function (response: any) {
        //add id to response runing number from tasks.length
        response.id = tasks.tasks.length + 1;
        dispatch(addTask(response));
        console.log(response);
        //clear
        setInputTask("");
        setShowAddTask(false);
      },
      function (error: any) {
        console.log(error);
      }
    );
  };

  return (
    <>
      {!showAddTask ? (
        <div
          onClick={() => setShowAddTask(true)}
          className="flex space-x-1 items-center w-full py-2 cursor-pointer px-2 -mt-2"
        >
          <i className="fi fi-rr-plus-small text-2xl mt-1.5"></i>
          <p>Add Task</p>
        </div>
      ) : (
        <motion.div
          className="bg-primaryDark py-2 px-5 rounded-md"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 5,
            delay: 0,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <input
            type="text"
            placeholder="What are you working on?"
            className="border-0 outline-none w-full py-2 bg-transparent text-lg"
            autoFocus={true}
            onChange={(e) => setInputTask(e.target.value)}
          />
          <div className="flex justify-end space-x-1 mt-2 select-none">
            <div onClick={handleCancel} className="px-5 py-2 cursor-pointer">
              Cancel
            </div>
            <motion.div
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div
                onClick={handleSave}
                className="bg-primary px-5 py-2 rounded-md cursor-pointer"
              >
                Save
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AddTask;
