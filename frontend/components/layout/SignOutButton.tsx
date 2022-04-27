import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { LogoutIcon } from "@heroicons/react/outline";

function handleLogout(instance: IPublicClientApplication) {
  instance.logoutPopup().catch((e) => {
    console.error(e);
  });
}

const SignOutButton = () => {
  const { instance } = useMsal();

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
