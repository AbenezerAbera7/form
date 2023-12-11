import { View, Text } from "react-native";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface LoginContextType {
  renderSignup: boolean;
  setRenderSignup: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  renderEmployeeSignup: boolean;
  setRenderEmployeeSignup: Dispatch<SetStateAction<boolean>>;
}

const defaultLoginContext = {
  renderSignup: false,
  setRenderSignup: () => {},
  isLoading: false,
  setIsLoading: () => {},
  renderEmployeeSignup: false,
  setRenderEmployeeSignup: () => {},
} as LoginContextType;

const LoginContext = createContext(defaultLoginContext);

type LoginProviderProps = {
  children: ReactNode;
};

const LoginProvider = ({ children }: LoginProviderProps) => {
  const [renderSignup, setRenderSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderEmployeeSignup, setRenderEmployeeSignup] = useState(false);
  return (
    <LoginContext.Provider
      value={{
        renderSignup,
        setRenderSignup,
        isLoading,
        setIsLoading,
        renderEmployeeSignup,
        setRenderEmployeeSignup,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
