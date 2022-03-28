import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { Button } from "@mui/material";
import { loginRequest } from "../src/authConfig";

function handleLogin(instance: IPublicClientApplication) {
  instance.loginPopup(loginRequest).catch(e => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
const SignInButton = () => {
  const { instance } = useMsal();

  return <Button onClick={() => handleLogin(instance)}>Sign in</Button>;
};

export default SignInButton;
