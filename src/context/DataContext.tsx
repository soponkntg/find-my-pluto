import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Coords } from "google-map-react";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth, Hub } from "aws-amplify";

interface DataContextType {
  userLocation: Coords;
  toggle: Boolean;
  user: CognitoUser | null;
  signin: () => void;
  openForm: () => void;
  closeForm: () => void;
  userToken: string | null;
  userId: string | null;
}

const Context = createContext<DataContextType>({} as DataContextType);

interface Props {
  children: React.ReactElement;
}

export default function DataContext({ children }: Props) {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [toggle, setToggle] = useState<Boolean>(false);
  const [userLocation, setUserLocation] = useState<Coords>({ lat: 13.72433, lng: 100.50917 });

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const getUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const token = userData.getSignInUserSession()?.getIdToken().getJwtToken();
      userData.getUserAttributes((err: any, result: any) => setUserId(result![0]["Value"]));
      setUserToken(token);
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  const signin = () => {
    Auth.federatedSignIn();
  };

  const openForm = () => {
    if (user) {
      setToggle(true);
    } else {
      signin();
    }
  };

  const closeForm = () => {
    setToggle(false);
  };

  return (
    <Context.Provider
      value={{
        userLocation,
        toggle,
        closeForm,
        user,
        signin,
        openForm,
        userToken,
        userId,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useDataContext = (): DataContextType => useContext(Context);
