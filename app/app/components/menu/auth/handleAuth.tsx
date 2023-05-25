"use client";
import LoginButton from "./login";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import LoginModal from "./loginModal";
import { setLoginModal } from "@/app/redux/slice/login.slice";

const HandleAuth = () => {
  const loginSelector = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const closeLoginModal = () => {
    dispatch(setLoginModal({
      openModal: false,
    }))
  };

  return (
    <div>
      <LoginButton />
      {loginSelector.openModal && (
        <div className="fixed flex w-screen h-screen bg-black bg-opacity-90 top-0 left-0 z-50">
          <div className="md:m-auto md:w-auto w-full">
            <LoginModal />
          </div>
          <div className="absolute right-0 top-0 p-10">
            <i className="fi fi-br-cross text-2xl cursor-pointer" onClick={closeLoginModal}></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleAuth;
