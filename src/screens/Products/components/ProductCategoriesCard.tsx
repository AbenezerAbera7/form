import { View, Text } from "react-native";
import React from "react";
import { productCategoriesCardStyles } from "../styles/productcategoriescard";

const ProductCategoriesCard = (props: { item: any }) => {
  return (
    <View style={productCategoriesCardStyles.container}>
      <Text style={productCategoriesCardStyles.text}>{props.item.name}</Text>
    </View>
  );
};

export default ProductCategoriesCard;
