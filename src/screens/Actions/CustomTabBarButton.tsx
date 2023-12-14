import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, {
  useRef,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import Actions from "./Actions";
import { colors } from "../../config/global";
import { NavigationContainer } from "@react-navigation/native";
import {
  ActionsModalContext,
  ActionsModalProvider,
} from "../../context/ActionsContext";
import SellProductBottomSheet from "./components/SellProduct";
import RenderBottomSheetContent from "./RenderBottomSheetContent";

const CustomTabBarButton = (props: any) => {
  const { children, onPress } = props;
  const { screenToRender, setScreenToRender } = useContext(ActionsModalContext);
  useEffect(() => {}, [screenToRender]);
  // Creates a reference to the DOM element that we can interact with
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Setting the points to which we want the bottom sheet to be set to
  // Using '-30' here so that it is not seen when it is not presented
  const snapPoints = useMemo(() => ["45%", "90%"], []);

  // Callback function that gets called when the bottom sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    // if the bottom sheet is closing
    if (index === -1) {
      console.log("Menu");
      setScreenToRender("Menu");
      return;
    }
    // if the screenToRender is Sell then we want the bottom sheet to be expanded to 80%
    if (screenToRender === "Sell") {
      bottomSheetRef?.current?.snapToIndex(1);
      return;
    }
  }, []);

  // Expands the bottom sheet when our button is pressed
  const onAddButtonPress = () => {
    bottomSheetRef?.current?.snapToIndex(0);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          onAddButtonPress();
        }}
        activeOpacity={1}
        style={{ top: -15 }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.complementary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </View>
      </TouchableOpacity>

      <Portal>
        <BottomSheet
          enablePanDownToClose={true}
          ref={bottomSheetRef}
          index={-1} // Hide the bottom sheet when we first load our component
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          animateOnMount={true}
        >
          {/* <Actions /> */}
          {/* {renderBottomSheet(screenToRender)} */}
          {<RenderBottomSheetContent />}
        </BottomSheet>
      </Portal>
    </>
  );
};

export default CustomTabBarButton;
