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
  bottomSheetRef: any;
  setBottomSheetRef: Dispatch<SetStateAction<any>>;
  sellProductModalVisible: boolean;
  setSellProductModalVisible: Dispatch<SetStateAction<boolean>>;
  closeActionsTab: boolean;
  setCloseActionsTab: Dispatch<SetStateAction<boolean>>;
  screenToRender: string;
  setScreenToRender: Dispatch<SetStateAction<string>>;
}

const defaultModalContext = {
  modalVisible: false,
  setModalVisible: () => {},
  bottomSheetRef: null,
  setBottomSheetRef: () => {},
  sellProductModalVisible: false,
  setSellProductModalVisible: () => {},
  closeActionsTab: false,
  setCloseActionsTab: () => {},
  screenToRender: "Menu",
  setScreenToRender: () => {},
} as ModalContextType;

const ActionsModalContext = createContext(defaultModalContext);

type ModalProviderProps = {
  children: ReactNode;
};

const ActionsModalProvider = ({ children }: ModalProviderProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sellProductModalVisible, setSellProductModalVisible] =
    useState<boolean>(false);
  const [closeActionsTab, setCloseActionsTab] = useState<boolean>(false);
  const [bottomSheetRef, setBottomSheetRef] = useState<any>(null);
  const [screenToRender, setScreenToRender] = useState<string>("Menu");
  return (
    <ActionsModalContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        bottomSheetRef,
        setBottomSheetRef,
        sellProductModalVisible,
        setSellProductModalVisible,
        closeActionsTab,
        setCloseActionsTab,
        screenToRender,
        setScreenToRender,
      }}
    >
      {children}
    </ActionsModalContext.Provider>
  );
};

export { ActionsModalContext, ActionsModalProvider };
