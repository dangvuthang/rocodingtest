import * as React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const SignInButton = dynamic(() => import("../../layout/SignOutButton"), {
    ssr: false,
  });
  const SignOutButton = dynamic(() => import("../../layout/SignOutButton"), {
    ssr: false,
  });
  
export default function DashboardNav() {
    const lgStyle = {
        flexGrow: 1,
        background: "-webkit-linear-gradient(180deg, rgba(230, 0, 40, 0.723958) 0%, #F4B30B 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        TextFillColor: 'transparent',
        letterSpacing: '0.1rem',
        fontSize: 33,
        fontWeight: 800,
        fontStyle: 'normal',
        fontFamily: 'Caveat Brush',
    } as const;

    return (
        <div>
            <nav className="bg-white border-b-2 px-2 sm:px-4 py-2.5 rounded flex items-center">
                <div className="flex-1 px-2 mx-2 ml-4" style={lgStyle}>HACKERMIT</div>
                <div className="mx-auto">
                    <AuthenticatedTemplate>
                        <SignOutButton />
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <SignInButton />
                    </UnauthenticatedTemplate>
                </div>
            </nav>
        </div>
    )
}