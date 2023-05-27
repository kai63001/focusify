"use client";
import { motion } from "framer-motion";
import { useAlert } from "./AlertContext";

const ToastAlert = () => {
  const { alert, closeAlert }: any = useAlert();

  return alert && alert.type == "toast" ? (
    // bottom right alert toast
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 right-0 m-8"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-primary rounded-md p-4">
        <p className="flex-nowrap">{alert.message}</p>
      </div>
    </motion.div>
  ) : null;
};

export default ToastAlert;
