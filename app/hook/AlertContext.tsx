"use client";
import { createContext, useContext, useState } from "react";

export const AlertContext: any = createContext(null);

export const AlertProvider = ({ children }: any) => {
  const [alert, setAlert]: any = useState(null);

  const openAlert = (message: any, onCancel: any, onConfirm: any) => {
    setAlert({ message, onCancel, onConfirm });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, openAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
