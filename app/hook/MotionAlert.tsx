"use client";
import { motion } from "framer-motion";
import { useAlert } from "./AlertContext";

const MotionAlert = () => {
  const { alert, closeAlert }:any = useAlert();

  const handleClose = () => {
    closeAlert();
    alert.onCancel && alert.onCancel();
  };

  const handleConfirm = () => {
    closeAlert();
    alert.onConfirm && alert.onConfirm();
  };

  return alert && alert.type == "alert" ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-primary rounded-md p-4 md:w-1/3">
        <div className="mb-4">{alert.message}</div>
        <div className="flex justify-end">
          <button onClick={handleClose} className="text-gray-500 mr-4">
            Cancel
          </button>
          <button onClick={handleConfirm} className="text-black bg-white rounded-md px-4 py-2">
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default MotionAlert;
