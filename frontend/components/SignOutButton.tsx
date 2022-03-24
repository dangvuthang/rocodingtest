import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";

function handleLogout(instance: IPublicClientApplication) {
  instance.logoutPopup().catch(e => {
    console.error(e);
  });
}

const SignOutButton = () => {
  const { instance } = useMsal();

  return <Button onClick={() => handleLogout(instance)}>Sign out</Button>;
};

export default SignOutButton;
