import { View, Text } from "react-native";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface ModalContextType {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  Barcode: string;
  setBarcode: Dispatch<SetStateAction<string>>;
}

const defaultModalContext = {
  modalVisible: false,
  setModalVisible: () => {},
  Barcode: "",
  setBarcode: () => {},
} as ModalContextType;

const ModalContext = createContext(defaultModalContext);

type ModalProviderProps = {
  children: ReactNode;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Barcode, setBarcode] = useState("");
  return (
    <ModalContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        Barcode,
        setBarcode,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
