import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { sellProductStyles } from "../styles/sellProduct";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { ActionsModalContext } from "../../../context/ActionsContext";
import { ProductsContext } from "../../../context/ProductsContext";
import { UserContext } from "../../../context/UserContext";
import {
  handleGetProducts,
  handleGetStocks,
} from "../../../api-endpoints/product-endpoint";
import { TouchableOpacity } from "react-native";
import { colors } from "../../../config/global";
import { Keyboard } from "react-native";
import SellProductStockCard from "./SellProductStockCard";
import {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
const trialStocks = [
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 1 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 2 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 3 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 4 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 5 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 6 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 7 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 8 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 9 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 10 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 11 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 12 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 13 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 14 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 15 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 16 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 17 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 18 },
  { dateString: "12/12/2020", purchasePrice: 100, remainingStock: 10, id: 19 },
];
const SellProduct = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const { user } = useContext(UserContext);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedBool, setSelectedBool] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [stocks, setStocks] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      const getProducts = async () => {
        const { uid } = user;
        const p = await handleGetProducts(uid);
        setProducts(p);
      };
      getProducts();
    }
    if (selectedBool) {
      const getStocks = async () => {
        const { uid } = user;
        const s = await handleGetStocks(uid, selectedProduct.id);
        setStocks(s);
      };
      getStocks();
    }
    if (searchText.length > 0 && !selectedBool) {
      const filtered = products.filter((product: any) => {
        return (
          product.productName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          String(product.barcode).includes(searchText)
        );
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchText, products, selectedBool]);

  const renderSearchResults = (item: any) => {
    if (item === undefined) return <View></View>;
    return (
      <TouchableOpacity
        style={sellProductStyles.searchResultContainer}
        // activeOpacity={0.9}
        onPress={() => {
          setSearchText(item.productName);
          setFilteredProducts([]);
          setSelectedBool(true);
          setSelectedProduct(item);

          // setSellProductModalVisible(false);
        }}
      >
        <Text style={sellProductStyles.searchResultName}>
          {item.productName}
        </Text>
        <Text style={sellProductStyles.searchResultBarcode}>
          {item.barcode}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <View style={sellProductStyles.container}>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Ionicons
              name="search"
              size={20}
              style={sellProductStyles.searchIcon}
            />
            <TextInput
              value={searchText}
              placeholder="Search by Barcode or Name"
              placeholderTextColor={colors.primary}
              onChangeText={(x) => {
                setSelectedBool(false);
                setSearchText(x);
              }}
              style={{ flex: 1, color: colors.primary }}
            />
          </View>
          <Ionicons
            name="scan-circle-outline"
            size={24}
            color={colors.primary}
            style={{ marginRight: 10 }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 50,
            zIndex: 1000,
            // backgroundColor: "white",
            alignSelf: "center",
            width: "85%",
          }}
        >
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderSearchResults(item)}
          />
        </View>
        <BottomSheetScrollView>
          {/* Payment Method */}
          <Text style={sellProductStyles.paymentMethodTitle}>
            Payment Method
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: "80%",
              marginTop: 5,
              marginLeft: 10,
              justifyContent: "space-between",
            }}
          >
            {/* cash */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
              onPress={() => {
                setPaymentMethod("Cash");
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  width: 16,
                  height: 16,
                  borderRadius: 10,
                  marginRight: 5,
                  backgroundColor:
                    paymentMethod === "Cash" ? colors.primary : colors.white,
                }}
              ></View>
              <Text style={{}}>Cash</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
              onPress={() => {
                setPaymentMethod("Deposit");
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  width: 16,
                  height: 16,
                  borderRadius: 10,
                  marginRight: 5,
                  backgroundColor:
                    paymentMethod === "Deposit" ? colors.primary : colors.white,
                }}
              ></View>
              <Text style={{}}>Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
              onPress={() => {
                setPaymentMethod("Credit");
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  width: 16,
                  height: 16,
                  borderRadius: 10,
                  marginRight: 5,
                  backgroundColor:
                    paymentMethod === "Credit" ? colors.primary : colors.white,
                }}
              ></View>
              <Text style={{}}>Credit</Text>
            </TouchableOpacity>
          </View>

          {/* Customer Contact */}
          <Text style={sellProductStyles.paymentMethodTitle}>
            Customer Contact
          </Text>
          {/* Name */}
          <Text style={{ marginLeft: 10, marginTop: 10, color: "grey" }}>
            Name
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.primary,
              height: 40,
              // width: "90%",
            }}
          >
            {/* <Text style={sellProductStyles.amountText}>Name</Text> */}
            <TextInput
              onChangeText={(x) => setCustomerName(x)}
              placeholder=""
              style={sellProductStyles.customerInput}
            />
          </View>

          {/*Customer Phone */}
          <Text style={{ marginLeft: 10, marginTop: 10, color: "grey" }}>
            Number
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.primary,
              height: 40,
              // width: "90%",
            }}
          >
            {/* <Text style={sellProductStyles.amountText}>+251</Text> */}
            <TextInput
              onChangeText={(x) => setCustomerPhone(x)}
              placeholder=""
              keyboardType="numeric"
              style={sellProductStyles.customerInput}
            />
          </View>

          {/*Customer Company */}
          <Text style={{ marginLeft: 10, marginTop: 10, color: "grey" }}>
            Company
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.primary,
              height: 40,
              // width: "90%",
            }}
          >
            {/* <Text style={sellProductStyles.amountText}>Customer Company</Text> */}
            <TextInput
              onChangeText={(x) => setCustomerCompany(x)}
              placeholder=""
              style={sellProductStyles.customerInput}
            />
          </View>

          {/* Available Stocks */}
          <Text style={sellProductStyles.paymentMethodTitle}>
            Available Stocks
          </Text>
          {selectedBool ? (
            stocks.length !== 0 ? (
              // <BottomSheetFlatList
              //   data={trialStocks}
              //   keyExtractor={(item) => item.id.toString()}
              //   renderItem={({ item }) => <SellProductStockCard stock={item} />}
              // />
              <View>
                {trialStocks.map((stock) => (
                  <SellProductStockCard stock={stock} />
                ))}
                <TouchableOpacity style={sellProductStyles.submitButton}>
                  <Text style={sellProductStyles.submitButtonText}>
                    Sell Now
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          ) : (
            <Text style={{ marginLeft: 10, marginTop: 10 }}>
              Search for a product to see available stocks
            </Text>
          )}
        </BottomSheetScrollView>

        {/* Submit */}
        {/* {selectedBool ? (
          <TouchableOpacity style={sellProductStyles.submitButton}>
            <Text style={sellProductStyles.submitButtonText}>Sell Now</Text>
          </TouchableOpacity>
        ) : null} */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SellProduct;
