import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest } from "../../src/authConfig";
import router from "next/router";
import { postRequest } from "../../util/axiosInstance";
import Router from "next/router";
import { LoginIcon } from "@heroicons/react/outline";

const handleLogin = async (instance: IPublicClientApplication) => {
  let auth;
  try {
    auth = await instance.loginPopup(loginRequest);
  } catch (error) {
    console.log(error);
  }
  if (auth) {
    try {
      const request = await postRequest({
        url: "/users/register",
        token: auth.accessToken,
        body: { photoUrl: "something" },
      });
      console.log(request);
    } catch (error) {
      const errorBody = (error as any)?.response?.data;
      if (errorBody?.status === "special") {
        Router.push("/face-taken");
        // Navigate to face taken page
      } else {
        console.log(error);
      }
    }
  }
};

const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <button
      className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md inline-flex justify-center items-center gap-x-0.5 transition-colors"
      onClick={() => handleLogin(instance)}
    >
      <LoginIcon className="w-5 h-5" />
      <span>Sign in</span>
    </button>
  );
};

export default SignInButton;
