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
  sellProductModalVisible: boolean;
  setSellProductModalVisible: Dispatch<SetStateAction<boolean>>;
  closeActionsTab: boolean;
  setCloseActionsTab: Dispatch<SetStateAction<boolean>>;
}

const defaultModalContext = {
  modalVisible: false,
  setModalVisible: () => {},
  sellProductModalVisible: false,
  setSellProductModalVisible: () => {},
  closeActionsTab: false,
  setCloseActionsTab: () => {},
} as ModalContextType;

const ActionsModalContext = createContext(defaultModalContext);

type ModalProviderProps = {
  children: ReactNode;
};

const ActionsModalProvider = ({ children }: ModalProviderProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sellProductModalVisible, setSellProductModalVisible] = useState(false);
  const [closeActionsTab, setCloseActionsTab] = useState(false);
  return (
    <ActionsModalContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        sellProductModalVisible,
        setSellProductModalVisible,
        closeActionsTab,
        setCloseActionsTab,
      }}
    >
      {children}
    </ActionsModalContext.Provider>
  );
};

export { ActionsModalContext, ActionsModalProvider };
