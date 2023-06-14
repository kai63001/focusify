import Image from "next/image";
import appwrite from "@/app/hook/appwrite";
import { useState } from "react";
import { ID } from "appwrite";
import Link from "next/link";

const LoginModal = () => {
  const { account, client } = appwrite();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<any>({});

  const continueWithGoogle = () => {
    const origin = window.location.origin;
    if (!account) return;
    account.createOAuth2Session(
      "google",
      `${origin}/auth/success`,
      `${origin}/auth/error`
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isRegistering) {
      // handle registration form submission
      console.log("Submitting registration form...");
      handleRegister();
    } else {
      // handle login form submission
      console.log("Submitting login form...");
      handleLogin();
    }
  };

  const handleLogin = () => {
    //validate email
    if (!email) {
      console.log("Email is required");
      setError({
        ...error,
        email: "Email is required",
      });
      return;
    }

    //validate password
    if (!password) {
      console.log("Password is required");
      setError({
        ...error,
        password: "Password is required",
      });
      return;
    }

    if (!account) return;
    const promise = account.createEmailSession(email, password);

    promise.then(
      function (response) {
        console.log(response); // Success
        setError({
          error: "",
        });
        //success redirect to /auth/success
        window.location.href = "/auth/success";
      },
      function (error) {
        console.log(error); // Failure
        setError({
          error: error.response.message,
        });
        //clear password
        setPassword("");
      }
    );
  };

  const handleRegister = () => {
    //check if name is valid
    if (!name) {
      console.log("Name is required");
      setError({
        ...error,
        name: "Name is required",
      });
      return;
    }
    //check if email is valid
    if (!email) {
      console.log("Email is required");
      setError({
        ...error,
        email: "Email is required",
      });
      return;
    }
    //check if password is valid
    if (!password) {
      console.log("Password is required");
      setError({
        ...error,
        password: "Password is required",
      });
      return;
    }

    if (!account) return;
    const promise = account.create(ID.unique(), email, password, name);

    promise.then(
      function (response) {
        console.log(response); // Success
        setError({
          error: "",
        });
        setIsRegistering(false);
        //clear password
        setPassword("");
      },
      function (error: any) {
        setError({
          error: error.response.message,
        });
        //clear password
        setPassword("");
      }
    );
  };

  return (
    <div className="bg-primaryDark opacity-95 py-5 md:w-[500px] mx-10 mt-10 rounded-lg">
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
          <button
            onClick={continueWithGoogle}
            className="w-9/12 bg-blue-500 py-2 rounded-md relative"
          >
            <i className="fi fi-brands-google absolute mt-0.5 pr-10"></i>
            <span className="ml-7">Continue with google</span>
          </button>
        </div>
        <div className="w-full flex mt-2 mb-5">
          <div className="m-auto border w-6/12 border-gray-700" />
        </div>
        <div className="w-full flex my-2">
          <form
            onSubmit={handleSubmit}
            className="m-auto w-9/12 flex flex-col space-y-2"
          >
            {isRegistering && (
              <>
                <input
                  className="bg-black bg-opacity-30 text-white w-full py-2 px-3 rounded-md outline-none"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError({
                      ...error,
                      name: "",
                    });
                  }}
                />
                {error.name && (
                  <p className="text-red-500 text-left -my-2 text-sm">
                    {error.name}
                  </p>
                )}
              </>
            )}
            <input
              className="bg-black bg-opacity-30 text-white w-full py-2 px-3 rounded-md outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError({
                  ...error,
                  email: "",
                });
              }}
            />
            {error.email && (
              <p className="text-red-500 text-left -my-2 text-sm">
                {error.email}
              </p>
            )}
            <input
              className="bg-black bg-opacity-30 text-white w-full py-2 px-3 rounded-md outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError({ ...error, password: "" });
              }}
            />
            {error.password && (
              <p className="text-red-500 text-left -my-2 text-sm">
                {error.password}
              </p>
            )}
            {error.error && (
              <p className="text-red-500 text-left -my-2 text-sm">
                {error.error}
              </p>
            )}
            <div className="pt-4 w-full block">
              <button className="w-full bg-red-500 py-2 rounded-md">
                {isRegistering ? "Register" : "Login"}
              </button>
              <p className="text-center pt-2">
                {isRegistering
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  className="text-red-500 underline"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError({});
                    setPassword("");
                  }}
                >
                  {isRegistering ? "Login" : "Register"}
                </button>
              </p>
            </div>
          </form>
        </div>
        <div className="flex w-full">
          <div className="m-auto">
            <p className="text-xs w-80">
              By continuing, you are indicating that you accept our{" "}
              <Link
                href="/terms-of-service"
                target="_blank"
                className="text-red-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-red-500"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
