import { useAlert } from "@/app/hook/AlertContext";
import useAppwrite from "@/app/hook/appwrite";
import { useAppSelector } from "@/app/redux/hook";
import { DatabaseId, CollectionId } from "@/libs/database";
import { motion } from "framer-motion";
import { useState } from "react";

const ToDoDetailDescription = () => {
  const { toastAlert, closeAlert }: any = useAlert();
  const selectedTask = useAppSelector((state) => state.task.selectedTask);
  const selectedTaskData = useAppSelector(
    (state) => state.task.selectedTaskData
  );
  const { databases } = useAppwrite();
  const [newDescription, setDescription] = useState<string>("");

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    console.log("handleSave");
    if (!databases) return;
    const result = databases?.updateDocument(
      DatabaseId.focusifyApp,
      CollectionId.task,
      selectedTask,
      {
        description: newDescription,
      }
    );
    result
      .then(function (response: any) {
        console.log(response);
        toastAlert("Description updated");
        setTimeout(() => {
          closeAlert();
        }, 1000);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="bg-primaryLight rounded-md p-3 text-md">
        {/* textare a*/}
        <textarea
          className="w-full h-full bg-transparent resize-none outline-none"
          placeholder="Add a more detailed description..."
          defaultValue={selectedTaskData?.description}
          onChange={handleDescription}
          rows={4}
          id="description"
        ></textarea>
        <label
          htmlFor="description"
          className="flex w-full justify-end cursor-text"
        >
          <motion.div
            className="box select-none "
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button className="bg-primary px-5 py-2 rounded-md cursor-pointer">
              Save
            </button>
          </motion.div>
        </label>
      </div>
    </>
  );
};

export default ToDoDetailDescription;
