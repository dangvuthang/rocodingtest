import { createContext, FC, useContext, useEffect, useReducer } from "react";
import useAccessToken from "../hooks/useAccessToken";
import { getRequest } from "../util/axiosInstance";

export interface User {
  _id: string;
  email: string;
  fullName: string;
  photoUrl: string;
  role: string;
}

interface IContext {
  user?: User;
  dispatch: (action: Action) => void;
}

type Action = { type: "login"; payload: User } | { type: "logout" };

const UserContext = createContext<IContext>({} as IContext);

const reducer = (_: User, action: Action): User => {
  switch (action.type) {
    case "login":
      return { ...action.payload };
    case "logout":
      return {} as User;
    default:
      throw new Error("Unhandled action type");
  }
};

const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {} as User);
  const token = useAccessToken();
  useEffect(() => {
    const getMe = async () => {
      try {
        const request = await getRequest({ url: "/users/me", token });
        const user = request.data.data.user as User;
        dispatch({ type: "login", payload: user });
      } catch (error) {
        console.log(error);
      }
    };
    if (!state._id && token) {
      getMe();
    }
  }, [state._id, token]);

  return (
    <UserContext.Provider value={{ user: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  const { user, dispatch } = context;
  return { user, dispatch };
};

export default UserProvider;
export { useUser };
