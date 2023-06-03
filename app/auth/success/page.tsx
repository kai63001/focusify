"use client";
import useAppwrite from "../../hook/appwrite";

import React from "react";

const SuccessPage = () => {
  const { account } = useAppwrite();

  React.useEffect(() => {
    const fetchAccountData = async () => {
      if (!account) return;
      const accountData = await account.get();
      localStorage.setItem("accountData", JSON.stringify(accountData));
    };

    fetchAccountData();
  }, [account]);

  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = "/app";
    }, 3000);
  }, []);

  return (
    <div className="flex w-screen h-screen bg-black">
      <div className="m-auto text-center">
        <h1>Success!</h1>
        <p>You will be redirected to the home page in 3 seconds.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
