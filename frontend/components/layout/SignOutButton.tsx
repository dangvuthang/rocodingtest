import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import router from "next/router";

function handleLogout(instance: IPublicClientApplication) {
  instance.logoutPopup().catch(e => {
    console.error(e);
  });
}

const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <Button
      sx={{ border: " 0.10rem solid", mr: 1 }}
      color={router.pathname === "/" ? "primary" : "secondary"}
      variant="outlined"
      onClick={() => handleLogout(instance)}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
