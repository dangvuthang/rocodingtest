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
      className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md inline-flex justify-center items-center gap-x-0.5 transition-colors"
      onClick={() => handleLogout(instance)}
    >
      <LogoutIcon className="w-5 h-5" />
      <span>Sign out</span>
    </button>
  );
};

export default SignOutButton;
