import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { constant } from "../../styles/constantscreen";
import { handleGetProducts } from "../../api-endpoints/product-endpoint";
import { UserContext } from "../../context/UserContext";
import { ProductsContext } from "../../context/ProductsContext";
import AddProductButton from "./components/AddProductButton";
import { colors, fonts } from "../../config/global";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const ProductScreen = (props: any) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadedData, setLoadedData] = useState(false);
  const { user } = useContext(UserContext);
  const { uid } = user;
  const { refresh, setRefresh } = useContext(ProductsContext);
  const tabBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    getProducts();
  }, [refresh]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Products",
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerRight: () => {},
    });
  });

  const searchProducts = (list: any) => {
    if (!list) {
      return [];
    }

    if (text == "") {
      return list.filter((itemx: any, idx: any) => {
        return true;
      });
    } else {
      return list.filter((itemx: any, idx: any) => {
        var name = itemx.productName ? itemx.productName.toLowerCase() : "";
        var barcode = itemx.barcode ? itemx.barcode.toLowerCase() : "";
        var price = itemx.price ? itemx.price.toLowerCase() : "";

        var canRet = false;
        canRet =
          name.includes(text.toLowerCase()) ||
          barcode.includes(text.toLowerCase()) ||
          price.includes(text.toLowerCase());

        return canRet;
      });
    }
  };

  const renderProductWidget = (product: any, idx: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Product-Description", {
            product: product,
            uid: uid,
          })
        }
        key={idx}
      >
        <View
          style={{
            flexDirection: "row",
            width: width * 0.95,
            height: width * 0.2,
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: "white",
            shadowOpacity: 0.2,
            elevation: 10,
            shadowRadius: 6,
          }}
        >
          <View
            style={{
              width: 60,
              height: width * 0.15,
              marginVertical: width * 0.025,
              marginHorizontal: 10,
            }}
          >
            {product.image !== "" ? (
              <Image
                source={{ uri: product.image }}
                style={{
                  flex: 1,
                  borderRadius: 20,
                  // borderBottomLeftRadius: 20,
                  // borderTopLeftRadius: 20,
                }}
              />
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignContent: "space-around",
                width: width * 0.7,
                marginTop: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    height: 25,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 3,
                      fontFamily: fonts.primary,
                      color: colors.primary,
                    }}
                  >
                    {product.productName}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 0,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 25,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        alignSelf: "center",
                        color: product.stock > 50 ? "#36c146" : "#f74545",
                      }}
                    >
                      {"Stock: " + product.stock}
                    </Text>
                  </View>
                  {product.stock < 50 ? (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      {"(Low in stock)"}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
            <View style={{ width: width * 0.5 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  color: colors.black,
                }}
              >
                {"barcode: " + product.barcode}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View style={{ flexDirection: "row", marginTop: 0 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginLeft: 0,
                    color: colors.black,
                  }}
                >
                  {product.price + " ETB"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getProducts = async () => {
    setLoadingData(true);
    const products = await handleGetProducts(uid);
    setProducts(products);
    setLoadingData(false);
    setLoadedData(true);
    setRefresh(false);
  };

  const renderItem = ({ item, index }: { item: any; index: any }) => {
    return renderProductWidget(item, index);
  };

  return (
    <View
      style={{
        width: width,
        height: height,
        alignContent: "flex-start",
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        paddingTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <View
          style={{
            width: width * 0.75,
            marginRight: 20,
            // marginTop: 30,
            height: 40,
            borderRadius: 8,
            flexDirection: "row",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "flex-start",
            // shadowOpacity: 0.2,
            // elevation: 40,
            // shadowRadius: 8,
            borderColor: colors.primary,
            borderWidth: 0.7,
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Ionicons
              name="search"
              size={24}
              color={colors.primary}
              style={{ marginLeft: 10 }}
            />
            <TextInput
              value={text}
              placeholder="Search here"
              onChangeText={(x) => setText(x)}
              style={styles.input}
            />
          </View>
          <Ionicons
            name="scan-circle-outline"
            size={24}
            color={colors.primary}
            style={{ marginRight: 10 }}
          />
        </View>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            setRefresh(true);
          }}
        >
          <Icon name="refresh" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {searchProducts(products).length == 0 ? (
        loadingData ? (
          <View
            style={{
              width: width,
              marginTop: height * 0.1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ alignSelf: "center", fontSize: 16, fontStyle: "italic" }}
            >
              Loading Data...
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: width,
              marginTop: height * 0.1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                fontStyle: "italic",
                color: "black",
              }}
            >
              {products.length == 0
                ? "Your store is empty. Start adding products!"
                : ""}
            </Text>
          </View>
        )
      ) : (
        <View>
          <FlatList
            data={searchProducts(products)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 250 }}
            style={{ marginTop: 10 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      <AddProductButton />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width * 0.4,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    elevation: 3,
    backgroundColor: "black",
  },
  input: {
    width: width * 0.9,
    height: 40,
    padding: 10,
    fontSize: 16,
    /* borderRadius: 4,
      borderWidth: 1, */
    borderColor: "gray",
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 10,
  },
  buttonRed: {
    width: width * 0.4,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 3,
    backgroundColor: "red",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ProductScreen;
