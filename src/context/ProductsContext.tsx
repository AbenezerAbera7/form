import { View, Text } from "react-native";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface productsContextType {
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

const defaultProductContext = {
  refresh: false,
  setRefresh: () => {},
} as productsContextType;

const ProductsContext = createContext(defaultProductContext);

type ProductsProviderProps = {
  children: ReactNode;
};

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <ProductsContext.Provider
      value={{
        refresh,
        setRefresh,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
