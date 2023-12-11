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

const CustomTabBarButton = (props: any) => {
  // Creates a reference to the DOM element that we can interact with
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Setting the points to which we want the bottom sheet to be set to
  // Using '-30' here so that it is not seen when it is not presented
  const snapPoints = useMemo(() => ["45%"], []);

  // Callback function that gets called when the bottom sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  // Expands the bottom sheet when our button is pressed
  const onAddButtonPress = () => {
    bottomSheetRef?.current?.expand();
  };
  const { children, onPress } = props;
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          onAddButtonPress();
        }}
        activeOpacity={1}
        style={{ top: -10 }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.bottomBar,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </View>
      </TouchableOpacity>

      <Portal>
        <ActionsModalProvider>
          <BottomSheet
            enablePanDownToClose={true}
            ref={bottomSheetRef}
            index={-1} // Hide the bottom sheet when we first load our component
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <Actions />
          </BottomSheet>
        </ActionsModalProvider>
      </Portal>
    </>
  );
};

export default CustomTabBarButton;
