import * as React from "react";
import { AppProps } from "next/app";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../src/authConfig";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import UserProvider from "../context/UserProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const msalInstance = new PublicClientApplication(msalConfig);
  return (
    <MsalProvider instance={msalInstance}>
      <UserProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </UserProvider>
    </MsalProvider>
  );
}

export default MyApp;
