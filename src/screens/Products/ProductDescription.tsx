import { View, Text, Dimensions, ScrollView, Image } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/FontAwesome";
import { constant } from "../../styles/constantscreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleGetTransactions } from "../../api-endpoints/product-endpoint";
import { colors } from "../../config/global";

const ProductDescription = (props: any) => {
  const navigation = useNavigation();
  const shoe = props.route.params.product.image;
  const name = props.route.params.product.productName;
  const description =
    "Stylish and comfortable shoes, perfect for those seeking both fashion and functionality. Crafted with precision and attention to detail, these shoes redefine excellence in footwear.";
  const available = props.route.params.product.availability;
  const price = props.route.params.product.price;
  const stock = props.route.params.product.stock;
  const barCode = props.route.params.product.barcode;
  const entryDate = props.route.params.product.expiry;
  const productionDate = props.route.params.product.production;
  const expiryDate = props.route.params.product.expiry;
  const id = props.route.params.product.id;
  const image = props.route.params.product.image;
  const uid = props.route.params.uid;
  const [transaction, setTransaction] = React.useState<any[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: "",
    });
  });

  useEffect(() => {
    const getTransactions = async () => {
      const res = await handleGetTransactions(uid, id);
      if (res) {
        setTransaction(res);
      }
    };
    getTransactions();
  }, []);

  const renderDetails = () => {
    return (
      <View
        style={{
          width: width * 0.9,
          // height: height * 0.4,
          // marginBottom: 10,
          marginTop: 10,
          borderRadius: 20,
          backgroundColor: "white",
          alignItems: "flex-start",
          paddingVertical: 20,
          justifyContent: "center",
          alignContent: "flex-start",
        }}
      >
        <View style={{ flexDirection: "column", width: width * 0.8 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "normal",
              fontStyle: "italic",
              marginLeft: 20,
              marginTop: 10,
              // color: "#666666",
            }}
          >
            {description}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "normal",
              // fontStyle: "italic",
              marginLeft: 20,
              textDecorationLine: "underline",
              marginTop: 10,
              // color: "#666666",
            }}
          >
            {"Barcode: " + barCode}
          </Text>
        </View>
      </View>
    );
  };

  const renderEditButton = (available: boolean) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Edit-Product", {
            image: image,
            name: name,
            barCode: name,
            price: price,
            available: available,
            stock: stock,
            id: id,
          })
        }
      >
        <View
          style={{
            width: 150,
            height: 40,
            marginTop: 25,
            alignSelf: "center",
            borderRadius: 15,
            backgroundColor: colors.complementary,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              // fontWeight: "bold",
              color: "white",
              fontFamily: constant.fontFamily,
            }}
          >
            Edit Product
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTransaction = (item: any, index: number) => {
    return (
      <View
        style={{
          width: width * 0.9,
          backgroundColor: "white",
          borderRadius: 20,
          marginBottom: 10,
          minHeight: 100,
        }}
      >
        <View
          style={{
            // borderBottomWidth: 1,
            marginHorizontal: 20,
            flexDirection: "row",
            // marginTop: 10,
            paddingVertical: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.type === "purchase" ? "Purchased" : "Sold"}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "normal" }}>
              {item.dateString}
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: "left" }}>
              Purchase price: {item.purchasePrice} Birr
            </Text>
            <Text style={{ textAlign: "left" }}>
              Selling price: {item.sellingPrice} Birr
            </Text>
            <Text style={{ textAlign: "left" }}>amount: {item.quantity}</Text>
            <Text style={{ textAlign: "left" }}>
              Production date: {item.production}
            </Text>
            <Text style={{ textAlign: "left" }}>
              Expiry date: {item.expiry}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderStockTransactions = () => {
    return (
      <ScrollView style={{ paddingVertical: 10 }}>
        {transaction.map((item: any, index: number) => {
          return renderTransaction(item, index);
        })}
      </ScrollView>
    );
  };

  return (
    <ScrollView
      scrollEnabled={true}
      style={{ marginBottom: 30 }}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          width: width,
          height: width * 0.8,
          borderRadius: 0 /* backgroundColor: '#800020' */,
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: width, height: width * 0.8 }}
          />
        ) : null}
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          // marginBottom: 3,
          marginTop: 30,
          marginLeft: 20,
          alignSelf: "flex-start",
          color: colors.primary,
        }}
      >
        {name}
      </Text>
      {renderDetails()}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 30,
          marginLeft: 20,
          alignSelf: "flex-start",
          color: colors.primary,
        }}
      >
        Transaction History
      </Text>
      {renderStockTransactions()}
      {renderEditButton(available)}
    </ScrollView>
  );
};

export default ProductDescription;
