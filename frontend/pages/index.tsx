import { useMsal } from "@azure/msal-react";
import SignInButton from "../components/layout/SignInButton";
import SignOutButton from "../components/layout/SignOutButton";
import useAccessToken from "../hooks/useAccessToken";

export default function HomePage() {
  const token = useAccessToken();
  const user = useMsal().accounts[0];
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-2">
        {user ? <SignOutButton /> : <SignInButton />}
      </div>
      <h1>Rework in progress...</h1>
    </div>
  );
}
