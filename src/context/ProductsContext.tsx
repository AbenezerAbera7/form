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
  products: any;
  setProducts: Dispatch<SetStateAction<any>>;
}

const defaultProductContext = {
  refresh: false,
  setRefresh: () => {},
  products: [],
  setProducts: () => {},
} as productsContextType;

const ProductsContext = createContext(defaultProductContext);

type ProductsProviderProps = {
  children: ReactNode;
};

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  return (
    <ProductsContext.Provider
      value={{
        refresh,
        setRefresh,
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
