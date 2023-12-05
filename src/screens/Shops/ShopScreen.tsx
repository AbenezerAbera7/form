import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
// import { commonStyles } from "../../styles/screens/common";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/FontAwesome";

const ShopScreen = (props: any) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Products",
    });
  });
  var prices = [
    "6000 ETB",
    "5200 ETB",
    "7400 ETB",
    "6500 ETB",
    "4900 ETB",
    "8000 ETB",
    "5600 ETB",
  ];
  var shoeNames = [
    "Nike Air Force 1",
    "Nike Air Max",
    "Nike Blazer",
    "Nike Air Max 270",
    "Nike Air Max 90",
    "Nike Air Max 95",
    "Nike Huarache",
    "Nike React",
  ];
  var shoeList = [
    require("../../images/shoe1.jpg"),
    require("../../images/shoe2.jpg"),
    require("../../images/shoe3.jpg"),
    require("../../images/shoe4.jpg"),
    require("../../images/shoe5.jpg"),
    require("../../images/shoe6.jpg"),
    require("../../images/shoe7.jpg"),
  ];
  var barCodes = [
    "5000897175046",
    "5000267128046",
    "4908267125046",
    "4800267125046",
    "5200267125046",
    "4990267125046",
    "5000267125046",
  ];
  var availability = [
    "Available",
    "Unavailable",
    "Unavailable",
    "Available",
    "Unvailable",
    "Available",
    "Available",
  ];
  var stockAmount = ["60", "0", "0", "24", "0", "59", "41"];

  var renderProduct = (idx: any) => {
    var colorList = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#00FFFF",
      "#FF00FF",
      "#F86FFF",
    ];
    var selectedColor = colorList[idx];
    var shoe = shoeList[idx];
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Product-Description", {
            shoe: shoeList[idx],
            name: shoeNames[idx],
            barCode: barCodes[idx],
            price: prices[idx],
            available: availability[idx],
            stock: stockAmount[idx],
          })
        }
      >
        <View
          style={{
            width: width * 0.95,
            height: width * 0.3,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: "white",
            alignItems: "flex-start",
            justifyContent: "center",
            alignContent: "flex-start",
          }}
        >
          <View style={{ flexDirection: "row", alignContent: "flex-start" }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                marginRight: 10,
                marginLeft: 15,
              }}
            >
              <Image
                source={shoe}
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined,
                  borderRadius: 20,
                }}
              />
            </View>
            <View style={{ flexDirection: "column", width: width * 0.5 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "space-around",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "900", marginBottom: 3 }}
                >
                  {shoeNames[idx]}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  fontStyle: "italic",
                  color: "#666666",
                }}
              >
                {"BarCode: " + barCodes[idx]}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Icon name="money" color="green" size={20}></Icon>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "normal",
                    marginLeft: 5,
                    fontStyle: "italic",
                    color: "#666666",
                  }}
                >
                  {prices[idx]}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignContent: "space-between",
                marginTop: 5,
                alignItems: "flex-end",
                justifyContent: "space-evenly",
                height: width * 0.18,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "900",
                  marginBottom: 3,
                  color: availability[idx] == "Available" ? "green" : "red",
                }}
              >
                {availability[idx]}
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "900", marginBottom: 3 }}
              >
                {"Stock: " + stockAmount[idx]}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
        backgroundColor: "#efefef",
      }}
    >
      <ScrollView style={{ marginBottom: 100 }}>
        {[0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4].map((idx) => {
          return renderProduct(idx);
        })}
      </ScrollView>
    </View>
  );
};

export default ShopScreen;
