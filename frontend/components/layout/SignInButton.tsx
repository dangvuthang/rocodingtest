import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { Button } from "@mui/material";
import { loginRequest } from "../../src/authConfig";
import router from "next/router";
import { postRequest } from "../../util/axiosInstance";
import Router from "next/router";

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
    <Button
      sx={{ border: " 0.10rem solid", mr: 1 }}
      color={router.pathname === "/" ? "primary" : "secondary"}
      onClick={() => handleLogin(instance)}
      variant="outlined"
    >
      Sign in
    </Button>
  );
};

export default SignInButton;
