import { View, Text, Image } from "react-native";
import React from "react";
import { topPickCardStyles } from "../styles/topPickCard";

const TopPicksCard = (props: { title: string; url: string; value: string }) => {
  return (
    <View style={topPickCardStyles.background}>
      <Image
        source={require("../../../api/DevData/pictures/shoe1.jpg")}
        style={topPickCardStyles.image}
      />
      <Text style={topPickCardStyles.text}>{props.title}</Text>
      <Text style={topPickCardStyles.value}>{props.value}</Text>
    </View>
  );
};

export default TopPicksCard;
