"use client";
import { createContext, useContext, useState } from "react";

export const AlertContext: any = createContext(null);

export const AlertProvider = ({ children }: any) => {
  const [alert, setAlert]: any = useState(null);

  const openAlert = (message: any, onCancel: any, onConfirm: any) => {
    setAlert({ message, onCancel, onConfirm, type: "alert" });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const toastAlert = (message: any) => {
    setAlert({ message, type: "toast" });
  };

  return (
    <AlertContext.Provider value={{ alert, openAlert, closeAlert, toastAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
