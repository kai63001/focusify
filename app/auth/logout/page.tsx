"use client";

import React, { useEffect } from "react";
import useAppwrite from "../../hook/appwrite";

const LogoutPage = () => {
  const { client, account } = useAppwrite();

  useEffect(() => {
    const logout = async () => {
      try {
        //clear local storage
        localStorage.removeItem("accountData");
        await account?.deleteSession("current").finally(() => {
          window.location.href = "/";
        });
        //redirect to home page
      } catch (error) {
        console.error(error);
      }
    };

    logout();
  }, [account, client]);

  return (
    <div className="flex w-screen h-screen bg-black">
      <div className="m-auto text-center">
        <h1>Logging out...</h1>
      </div>
    </div>
  );
};

export default LogoutPage;
