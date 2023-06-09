"use client";

import { useAppDispatch } from "@/app/redux/hook";
import { closeAllApp } from "@/app/redux/slice/appControl.slice";
import { setLoginModal } from "@/app/redux/slice/login.slice";
import { motion } from "framer-motion";

const LoginButton = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(
      setLoginModal({
        openModal: true,
      })
    );
    closeAllModal();
  };

  const closeAllModal = () => {
    dispatch(closeAllApp());
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
      onClick={handleLogin}
      className="bg-primary bg-opacity-75 backdrop-blur-xl px-5 h-8 rounded-md flex cursor-pointer"
    >
      <div className="m-auto">Login</div>
    </motion.div>
  );
};

export default LoginButton;
