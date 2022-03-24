export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID}`, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT!,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
// export const graphConfig = {
//   graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me",
// };
