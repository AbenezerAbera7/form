import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ActionsModalContext } from "../../context/ActionsContext";
import SellProduct from "./components/SellProduct";
import Actions from "./Actions";

const RenderBottomSheetContent = () => {
  const { screenToRender } = useContext(ActionsModalContext);
  const renderContent = () => {
    switch (screenToRender) {
      case "Sell":
        return <SellProduct />;
      case "Menu":
        return <Actions />;
      default:
        return <Actions />;
    }
  };

  return renderContent();
};

export default RenderBottomSheetContent;
