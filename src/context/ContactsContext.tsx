import { View, Text } from "react-native";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface contactssContextType {
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

const defaultContactContext = {
  refresh: false,
  setRefresh: () => {},
} as contactssContextType;

const ContactsContext = createContext(defaultContactContext);

type ContactsProviderProps = {
  children: ReactNode;
};

const ContactsProvider = ({ children }: ContactsProviderProps) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <ContactsContext.Provider
      value={{
        refresh,
        setRefresh,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export { ContactsContext, ContactsProvider };
