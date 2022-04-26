import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { loginRequest } from "../src/authConfig";

const useAccessToken = () => {
  const { instance, accounts } = useMsal();
  const account = accounts[0];
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (instance && account) {
      instance
        .acquireTokenSilent({ ...loginRequest, account })
        .then((response) => {
          setAccessToken(response.accessToken);
        })
        .catch((e) => {
          console.log(e);
          instance.acquireTokenPopup(loginRequest).then((response) => {
            setAccessToken(response.accessToken);
          });
        });
    }
  }, [account, instance]);

  return accessToken;
};

export default useAccessToken;
