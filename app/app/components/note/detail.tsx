import { useAppDispatch } from "@/app/redux/hook";
import { setSelectNote } from "@/app/redux/slice/note.slice";
import { motion } from "framer-motion";

const NoteDetail = () => {
  const dispath = useAppDispatch();
  const backToMain = () => {
    dispath(setSelectNote(""));
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
              onClick={backToMain}
              className="fi fi-sr-arrow-left cursor-pointer"
            ></i>
          </div>
          <div className="w-full cursor-grab handle"></div>
        </div>
        <div className="px-5 py-2">asda</div>
      </div>
    </motion.div>
  );
};

export default NoteDetail;
