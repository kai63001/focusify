/* eslint-disable react-hooks/exhaustive-deps */
import { useAlert } from "@/app/hook/AlertContext";
import { useEffect } from "react";

const LoadingWidget = () => {
  //toast
  const { toastAlert, closeAlert }: any = useAlert();

  //useEffect only one times
  useEffect(() => {
    toastAlert("Opening...");
    setTimeout(() => {
      closeAlert();
    }, 1000);
  }, []);

  return <div></div>;
};

export default LoadingWidget;
