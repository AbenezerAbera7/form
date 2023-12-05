import { View, Text } from "react-native";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface LocationModalContextType {
  locationModalVisible: boolean;
  setLocationModalVisible: Dispatch<SetStateAction<boolean>>;
}

const defaultModalContext = {
  locationModalVisible: false,
  setLocationModalVisible: () => {},
} as LocationModalContextType;

const LocationModalContext = createContext(defaultModalContext);

type LocationModalProviderProps = {
  children: ReactNode;
};

const LocationModalProvider = ({ children }: LocationModalProviderProps) => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  return (
    <LocationModalContext.Provider
      value={{
        locationModalVisible,
        setLocationModalVisible,
      }}
    >
      {children}
    </LocationModalContext.Provider>
  );
};

export { LocationModalContext, LocationModalProvider };
