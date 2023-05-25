import Image from "next/image";
import { Client, Account } from "appwrite";

const LoginModal = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT as string);

  const account = new Account(client);


  const continueWithGoogle = () => {
    const origin = window.location.origin;
    account.createOAuth2Session('google', `${origin}/app`);
  };

  return (
    <div className="bg-primaryDark opacity-95 py-5 md:w-[700px] mx-10 mt-10 rounded-lg">
      {/* header */}
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            quality={80}
            alt="logo"
            className="rounded-full"
            loading="lazy"
          />
        </div>

        <h2 className="text-4xl font-bold">Welcome to Focusify</h2>
        <p className="text-secondaryDark text-sm py-2">
          Log In or Register with your email.
        </p>

        <div className="google py-5">
          {/* login with google */}
          <button onClick={continueWithGoogle} className="w-8/12 bg-blue-500 py-2 rounded-md relative">
          <i className="fi fi-brands-google absolute mt-0.5 pr-10"></i>
          <span className="ml-7">
             Continue with google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
