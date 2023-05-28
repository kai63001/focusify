import { useAppDispatch } from "@/app/redux/hook";
import { setAppNote } from "@/app/redux/slice/appControl.slice";
import { motion } from "framer-motion";

const NoteMain = () => {
  const dispath = useAppDispatch();

  const closeNoteApp = () => {
    dispath(setAppNote(false));
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
      <div className="bg-primary border border-primaryLight rounded-md text-sm w-[550px]">
        <div className="flex justify-between">
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={closeNoteApp}
              className="fi fi-rr-horizontal-rule cursor-pointer"
            ></i>
          </div>
          <div className="w-full cursor-grab handle"></div>
        </div>
        <div className="px-5 py-2 pb-10">
          <h2 className="text-2xl">Notes</h2>
          {/* list my note */}
          <div className="mt-5 flex flex-col space-y-3">
            <div className="bg-primaryLight w-full px-5 py-3 rounded-md cursor-pointer">
              <p className="text-lg">Do Homework</p>
              <p className="text-sm text-gray-400">2021-10-10</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteMain;
