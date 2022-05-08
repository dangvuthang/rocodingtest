import { useMsal } from "@azure/msal-react";
import dynamic from "next/dynamic";
const SignInButton = dynamic(
  () => import("../components/layout/SignInButton"),
  { ssr: false }
);
const SignOutButton = dynamic(
  () => import("../components/layout/SignOutButton"),
  { ssr: false }
);
import useAccessToken from "../hooks/useAccessToken";

export default function HomePage() {
  const token = useAccessToken();
  const user = useMsal().accounts[0];
  console.log(token);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-2">
        {user ? <SignOutButton /> : <SignInButton />}
      </div>
      <h1>Rework in progress...</h1>
    </div>
  );
}
