import useAppwrite from "@/app/hook/appwrite";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  selectTaskList,
  setSelectedTaskData,
  setTasks,
} from "@/app/redux/slice/task.slice";
import { DatabaseId, CollectionId } from "@/libs/database";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DatePreview from "./lib/datePreview";
import TabBar from "./lib/tabBar";
import { useAlert } from "@/app/hook/AlertContext";
import DateTimePicker from "react-datetime-picker";

const ToDoDetail = () => {
  const { openAlert }: any = useAlert();

  const { databases } = useAppwrite();
  const selectedTask = useAppSelector((state) => state.task.selectedTask);
  const allTask = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [detail, setDetail] = useState<any>({});

  // ! edit zone
  const [edit, setEdit] = useState({
    title: false,
    endDate: false,
  });
  const [editTitle, setEditTitle] = useState("");
  const [editEndDate, setEditEndDate] = useState();

  const backToMain = () => {
    dispatch(selectTaskList(""));
    dispatch(setSelectedTaskData({}));
  };

  //useEffect get data from db
  useEffect(() => {
    if (!databases) return;
    const result = databases?.getDocument(
      DatabaseId.focusifyApp,
      CollectionId.task,
      selectedTask
    );
    result.then(
      function (response: any) {
        console.log("response", response);
        setDetail(response);
        dispatch(setSelectedTaskData(response));

        //set editTitle
        setEditTitle(response.title);
        setEditEndDate(response.endDate);
      },
      function (error: any) {
        console.log(error);
      }
    );
  }, [databases, dispatch, selectedTask]);

  const deleteTask = () => {
    openAlert(
      "Are you sure you want to delete this task?",
      () => console.log("Cancel"),
      () => {
        console.log("Delete");
        if (!databases) return;
        const result = databases?.deleteDocument(
          DatabaseId.focusifyApp,
          CollectionId.task,
          selectedTask
        );
        result
          .then(function (response: any) {
            console.log("response", response);
            //remove allTask by id
            const newTask = allTask.tasks.filter(
              (item: any) => item.$id !== selectedTask
            );
            dispatch(setTasks(newTask));
            backToMain();
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    );
  };

  const updateEndDate = () => {
    if (!databases) return;
    const result = databases?.updateDocument(
      DatabaseId.focusifyApp,
      CollectionId.task,
      selectedTask,
      {
        endDate: editEndDate,
      }
    );
    result
      .then(function (response: any) {
        console.log("response", response);
        // update allTask by id
        const newTask = allTask.tasks.map((item: any) => {
          if (item.$id === selectedTask) {
            return {
              ...item,
              endDate: editEndDate,
            };
          }
          return item;
        });
        dispatch(setTasks(newTask));
        setEdit({
          ...edit,
          endDate: false,
        });
        //set detail
        setDetail({
          ...detail,
          endDate: editEndDate,
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const updateTitle = () => {
    if (!databases) return;
    const result = databases?.updateDocument(
      DatabaseId.focusifyApp,
      CollectionId.task,
      selectedTask,
      {
        content: editTitle,
      }
    );
    result
      .then(function (response: any) {
        console.log("response", response);
        // update allTask by id
        const newTask = allTask.tasks.map((item: any) => {
          if (item.$id === selectedTask) {
            return {
              ...item,
              content: editTitle,
            };
          }
          return item;
        });
        dispatch(setTasks(newTask));
        setEdit({
          ...edit,
          title: false,
        });
        //set detail
        setDetail({
          ...detail,
          content: editTitle,
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="bg-primary border border-primaryLight rounded-md text-sm w-[450px]">
        <div className="flex justify-between">
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={backToMain}
              className="fi fi-sr-arrow-left cursor-pointer"
            ></i>
            {/* <i className="fi fi-bs-arrow-up-right-and-arrow-down-left-from-center cursor-pointer"></i> */}
          </div>
          <div className="w-full cursor-grab handle"></div>
          <div className="px-5 pt-4 pb-2 flex items-center space-x-2">
            <i
              onClick={deleteTask}
              className="fi fi-sr-trash cursor-pointer"
            ></i>
          </div>
        </div>
        <div
          id="detail"
          className="px-5 py-2 overflow-scroll max-h-96 overflow-x-hidden no-scrollbar"
        >
          <div className="group flex space-x-3 items-center mb-5">
            {edit.title ? (
              <>
                <input
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-xl"
                  type="text"
                  value={editTitle ?? detail.content}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <i
                  onClick={updateTitle}
                  className="fi fi-sr-check cursor-pointer"
                ></i>
                <i
                  onClick={() =>
                    setEdit({
                      ...edit,
                      title: false,
                    })
                  }
                  className="fi fi-sr-x cursor-pointer"
                ></i>
              </>
            ) : (
              <>
                <h2 className="text-2xl">{detail.content}</h2>
                <i
                  onClick={() =>
                    setEdit({
                      ...edit,
                      title: true,
                    })
                  }
                  className="fi fi-sr-pencil hidden group-hover:inline-flex cursor-pointer"
                ></i>
              </>
            )}
          </div>
          <div>
            {/* table no border */}
            <table className="table-row w-full select-none">
              <tbody>
                {detail.endDate && (
                  <tr>
                    <td className="py-1 text-gray-300">Date</td>
                    <td className="px-2 py-1 group flex space-x-3 items-center">
                      {edit.endDate ? (
                        <>
                          <DateTimePicker
                            className="custom-datetime-picker"
                            onChange={(e: any) => setEditEndDate(e)}
                            clearIcon={null}
                            calendarIcon={null}
                            value={editEndDate}
                          />
                          <i
                            onClick={updateEndDate}
                            className="fi fi-sr-check cursor-pointer mt-1"
                          ></i>
                          <i
                            onClick={() => {
                              setEdit({
                                ...edit,
                                endDate: false,
                              });
                            }}
                            className="fi fi-br-cross cursor-pointer mt-1"
                          ></i>
                        </>
                      ) : (
                        <>
                          <DatePreview
                            className="cursor-pointer"
                            defaultMode={true}
                            date={detail.endDate}
                          />
                          <i
                            onClick={() =>
                              setEdit({
                                ...edit,
                                endDate: true,
                              })
                            }
                            className="fi fi-sr-pencil hidden group-hover:inline-flex cursor-pointer"
                          ></i>
                        </>
                      )}
                    </td>
                  </tr>
                )}
                {/* status */}
                <tr>
                  <td className="py-1 text-gray-300">Status</td>
                  <td className="px-2 py-1">
                    {detail.onTask == 0 ? (
                      <span className="text-xs text-white bg-primaryLight rounded-md px-2 py-1">
                        PENDDING
                      </span>
                    ) : (
                      <span className="text-xs text-white bg-green-700 rounded-md px-2 py-1">
                        COMPLEATE
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* tabbar */}
        <div id="tabbar" className="w-full">
          <TabBar></TabBar>
        </div>
      </div>
    </motion.div>
  );
};

export default ToDoDetail;
