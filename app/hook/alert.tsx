import React, { useState } from "react";
import { motion } from "framer-motion";

const MotionAlert = ({ message, onCancel, onConfirm }:any) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    setIsVisible(false);
    onConfirm && onConfirm();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-primary rounded-md p-4 md:w-1/3">
        <div className="mb-4">{message}</div>
        <div className="flex justify-end">
          <button onClick={handleClose} className="text-gray-500 mr-4">
            Confirm
          </button>
          <button onClick={handleConfirm} className="text-black bg-white rounded-md px-4 py-2">
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const motionAlert = (message: string, onCancel?: () => void, onConfirm?: () => void) => {
    //create root
  const div = document.createElement("div");
  
  document.body.appendChild(div);

  const handleOnCancel = () => {
    div.remove();
    onCancel && onCancel();
  };

  const handleOnConfirm = () => {
    div.remove();
    onConfirm && onConfirm();
  };

  
};