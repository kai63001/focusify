import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";
import { motion } from "framer-motion";
import NoteDetail from "./detail";
import { setSelectNote } from "@/app/redux/slice/note.slice";
import useAppwrite from "@/app/hook/appwrite";
import { useEffect, useState } from "react";
import { CollectionId, DatabaseId } from "@/libs/database";
import dayjs from "@/libs/day";
import { Query } from "appwrite";

const NoteMain = () => {
  const { databases } = useAppwrite();
  const dispath = useAppDispatch();
  const selectedNote = useAppSelector((state) => state.note.selectedNote);
  const [listNote, setListNote] = useState([]);

  const closeNoteApp = () => {
    dispath(setOpenApp({ app: "appNote", isShow: false }));
  };

  //getDate from database
  useEffect(() => {
    if (!databases) return;
    const result = databases.listDocuments(
      DatabaseId.focusifyApp,
      CollectionId.note,
      [
        //order by date
        Query.orderDesc("$updatedAt"),
      ]
    );
    result
      .then(function (response: any) {
        console.log(response);
        setListNote(response.documents);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [databases, selectedNote]);

  if (selectedNote !== "") {
    return <NoteDetail />;
  }

  const handleSelectNote = (id: any) => {
    dispath(setSelectNote(id));
  };

  const addNote = () => {
    dispath(setSelectNote("add"));
  };

  const checkLogin = () => {
    const accountData = localStorage.getItem("accountData");
    if (accountData) {
      return false;
    }
    return true;
  };

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.7 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {/* !check login frist for this feature */}
      {checkLogin() && (
        <div className="opacity-0 hover:opacity-100 duration-300 z-20 absolute w-full h-full bg-black bg-opacity-25 backdrop-blur-sm rounded-md handle flex">
          <div className="m-auto">
            {/* need login first */}
            <p className="text-white text-center">
              Please login to use this feature
            </p>
          </div>
        </div>
      )}
      <div className="bg-primary bg-opacity-95 backdrop-blur-lg border border-primaryLight rounded-md text-sm w-[550px]">
        <div className="flex justify-between">
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={closeNoteApp}
              className="fi fi-rr-horizontal-rule cursor-pointer"
            ></i>
          </div>
          <div className="w-full cursor-grab handle"></div>
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={addNote}
              className="fi fi-rs-edit text-lg cursor-pointer"
            ></i>
          </div>
        </div>
        <div className="px-5 py-2 pb-10">
          <div className="flex justify-between">
            <h2 className="text-2xl">Notes</h2>
          </div>
          {/* list my note */}
          <div className="mt-5 flex flex-col space-y-3">
            {listNote.length === 0 && (
              <div className="w-full py-1 text-gray-500 rounded-md">
                <p className="text-lg">No note..</p>
              </div>
            )}
            {/* note item */}
            {listNote.map((item: any, index: any) => (
              <div
                onClick={() => {
                  handleSelectNote(item.$id);
                }}
                key={index}
                className="bg-primaryDark2 w-full px-5 py-3 rounded-md cursor-pointer"
              >
                <p className="text-lg">{item.title}</p>
                <p className="text-sm text-gray-400">
                  {dayjs().diff(item.$updatedAt, "day") > 1
                    ? dayjs(item.$updatedAt).format("DD/MM/YYYY")
                    : dayjs(item.$updatedAt).fromNow()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteMain;
