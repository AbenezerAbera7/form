import { View, Text, Animated, useWindowDimensions } from "react-native";
import React from "react";
import { colors } from "../../../config/global";

const Paginator = (props: { data: any; scrollX: any }) => {
  const { width } = useWindowDimensions();
  const { data, scrollX } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        // height: 30,
        marginTop: 8,
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      {data.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        // const dotWidth = scrollX.interpolate({
        //   inputRange,
        //   outputRange: [5, 10, 5],
        //   extrapolate: "clamp",
        // });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={{
              height: 6,
              width: 6,
              borderRadius: 4,
              backgroundColor: colors.primary,
              marginHorizontal: 8,
              opacity,
            }}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
