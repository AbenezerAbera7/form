// floating action button
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FABStyles } from "../styles/FABStyles";
import ScanBarcode from "./ScanBarcode";
const { height, width } = Dimensions.get("window");

const FAB = (props: any) => {
  const [icon_1_x] = useState(new Animated.Value(10));
  const [icon_2_x] = useState(new Animated.Value(10));
  const [icon_2_y] = useState(new Animated.Value(45));
  const [icon_3_y] = useState(new Animated.Value(45));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    Animated.parallel([
      Animated.timing(icon_1_x, {
        toValue: 90,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(icon_2_x, {
        toValue: 65,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(icon_2_y, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(icon_3_y, {
        toValue: 125,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
    setPop(true);
  };

  const popOut = () => {
    Animated.parallel([
      Animated.timing(icon_1_x, {
        toValue: 10,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(icon_2_x, {
        toValue: 10,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(icon_2_y, {
        toValue: 45,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(icon_3_y, {
        toValue: 45,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();

    setPop(false);
  };

  return (
    <View style={FABStyles.background}>
      <Animated.View style={[FABStyles.scanButton, { right: icon_1_x }]}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ScanBarcode");
          }}
        >
          <Ionicons name="scan-circle-outline" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>
      {/* <Animated.View style={[FABStyles.downloadButton, { top: icon_3_y }]}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="cloud-download-outline" size={30} />
        </TouchableOpacity>
      </Animated.View> */}
      <Animated.View
        style={[
          FABStyles.notificationsButton,
          { right: icon_2_x, top: icon_2_y },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("notifications");
          }}
        >
          <Ionicons name="notifications-outline" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[FABStyles.settingsButton, { top: icon_3_y }]}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
        >
          <Ionicons name="settings-outline" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={FABStyles.mainButton}>
        <TouchableOpacity
          onPress={() => {
            pop ? popOut() : popIn();
          }}
        >
          <Ionicons name="menu-outline" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default FAB;
