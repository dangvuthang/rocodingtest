import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { LogoutIcon } from "@heroicons/react/outline";
import { useUser } from "../../context/UserProvider";

const SignOutButton = () => {
  const { instance } = useMsal();
  const { dispatch } = useUser();
  const handleLogout = (instance: IPublicClientApplication) => {
    instance
      .logoutPopup()
      .then(() => dispatch({ type: "logout" }))
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <button
      className="font-medium text-indigo-600 hover:text-indigo-500"
      onClick={() => handleLogout(instance)}
    >
      <span>Sign out</span>
    </button>
  );
};

export default SignOutButton;
