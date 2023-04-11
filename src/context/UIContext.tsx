import { Coords } from "google-map-react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface UIContextType {
  userLocation: Coords;
  toggle: Boolean;
  setToggle: Dispatch<SetStateAction<Boolean>>;
  closeToggle: () => void;
}

const UserContext = createContext<UIContextType>({} as UIContextType);

interface Props {
  children: React.ReactElement;
}

export default function UIContext({ children }: Props) {
  const [toggle, setToggle] = useState<Boolean>(false);
  const [userLocation, setUserLocation] = useState<Coords>({ lat: 13.72433, lng: 100.50917 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const closeToggle = () => {
    setToggle(false);
  };

  return (
    <UserContext.Provider value={{ userLocation, toggle, setToggle, closeToggle }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUI = (): UIContextType => useContext(UserContext);
