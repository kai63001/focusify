"use client";
import LoginButton from "./login";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import LoginModal from "./loginModal";
import { setLoginModal } from "@/app/redux/slice/login.slice";
import appwrite from "@/app/hook/appwrite";
import { useEffect, useState } from "react";
import AccountMenu from "./accountMenu";

const HandleAuth = () => {
  const { account, client } = appwrite();
  const loginSelector = useAppSelector((state: { login: any; }) => state.login);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<any>(null);

  const closeLoginModal = () => {
    dispatch(
      setLoginModal({
        openModal: false,
      })
    );
  };

  useEffect(() => {
    const switchCaseAuth = async () => {
      if (!await account) return;  
      //check local storage  accountData
      const accountData = localStorage.getItem("accountData");
      if(accountData){
        setUserData(JSON.parse(accountData));
        dispatch(
          setLoginModal({
            ...loginSelector,
            name: JSON.parse(accountData)?.name,
          })
        );
        return;
      }
    };
    switchCaseAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const returnWidget = () => {
    if(userData){
      return <AccountMenu/>
    }
    return <LoginButton/>
  }

  return (
    <div>
      {returnWidget()}
      {loginSelector.openModal && (
        <div className="fixed flex w-screen h-screen bg-black bg-opacity-90 top-0 left-0 z-50">
          <div className="md:m-auto md:w-auto w-full">
            <LoginModal />
          </div>
          <div className="absolute right-0 top-0 p-10">
            <i
              className="fi fi-br-cross text-2xl cursor-pointer"
              onClick={closeLoginModal}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleAuth;
