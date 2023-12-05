import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { graphHeaderStyles } from "../styles/graphheader";

const GraphHeader = (props: { title: string }) => {
  return (
    <View style={graphHeaderStyles.background}>
      <Text style={graphHeaderStyles.MainText}>{props.title}</Text>
    </View>
  );
};

export default GraphHeader;
