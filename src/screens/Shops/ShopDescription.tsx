import { View, Text, Dimensions, ScrollView, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/FontAwesome";

const ShopDescription = (props: any) => {
  const navigation = useNavigation();
  const shoe = props.route.params.shoe;
  const name = props.route.params.name;
  const available = props.route.params.available;
  const price = props.route.params.price;
  const stock = props.route.params.stock;
  const barCode = props.route.params.barCode;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Product Description",
    });
  });

  var renderDetails = () => {
    return (
      <View
        style={{
          width: width * 0.9,
          height: width * 0.4,
          marginBottom: 10,
          marginTop: 30,
          marginLeft: 20,
          borderRadius: 20,
          backgroundColor: "white",
          alignItems: "flex-start",
          justifyContent: "center",
          alignContent: "flex-start",
        }}
      >
        <View style={{ flexDirection: "column", width: width * 0.8 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "900",
              marginBottom: 3,
              marginLeft: 20,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "normal",
              fontStyle: "italic",
              marginLeft: 20,
              color: "#666666",
            }}
          >
            {"BarCode: " + barCode}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 20 }}>
            <Icon name="money" color="green" size={25}></Icon>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "900",
                marginLeft: 5,
                fontStyle: "italic",
                color: "#666666",
              }}
            >
              {price}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: width,
        height: height,
        alignContent: "flex-start",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <View>
        <Text style={{fontSize: 20, fontWeight: '900', marginTop: 40, marginBottom: 20}}>Product Description</Text>
      </View> */}
      <ScrollView style={{ marginBottom: 30 }}>
        <View
          style={{
            width: width,
            height: width * 0.8,
            borderRadius: 0 /* backgroundColor: '#800020' */,
          }}
        >
          <Image source={shoe} style={{ width: width, height: width * 0.8 }} />
        </View>
        {renderDetails()}
      </ScrollView>
    </View>
  );
};

export default ShopDescription;
