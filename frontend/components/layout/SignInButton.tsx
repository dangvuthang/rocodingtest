import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest } from "../../src/authConfig";
import { postRequest } from "../../util/axiosInstance";
import Router from "next/router";
import { toast } from "react-toastify";
import { User, useUser } from "../../context/UserProvider";

const SignInButton = () => {
  const { instance } = useMsal();
  const { dispatch } = useUser();

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
        });
        const user = request.data.data.user as User;
        dispatch({ type: "login", payload: user });
      } catch (error) {
        const errorBody = (error as any)?.response?.data;
        if (errorBody?.status === "special") {
          toast.info("Creating account");
          // Navigate to face taken page
          Router.push("/face-taken");
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <button
      className="font-medium text-indigo-600 hover:text-indigo-500"
      onClick={() => handleLogin(instance)}
    >
      <span>Sign in</span>
    </button>
  );
};

export default SignInButton;
