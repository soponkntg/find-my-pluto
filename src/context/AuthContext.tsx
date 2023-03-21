import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth, Hub } from "aws-amplify";

interface UserContextType {
  user: CognitoUser | null;
  setUser: Dispatch<SetStateAction<CognitoUser | null>>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({ children }: Props) {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser();
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = (): UserContextType => useContext(UserContext);
