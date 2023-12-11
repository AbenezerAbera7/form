import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import { ActionsModalContext } from "../../../context/ActionsContext";
import { Ionicons } from "@expo/vector-icons";
import { sellProductStyles } from "../styles/sellProductModal";
import { colors } from "../../../config/global";
import { TextInput } from "react-native-gesture-handler";
const { height, width } = Dimensions.get("window");
const SellProductModal = () => {
  const { sellProductModalVisible, setSellProductModalVisible } =
    useContext(ActionsModalContext);
  const [searchText, setSearchText] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amount, setAmount] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  return (
    <Modal
      isVisible={sellProductModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      style={{
        width: width * 0.9,
        marginLeft: "auto",
        marginRight: "auto",
      }}
      // coverScreen={false}
      onBackdropPress={() => {
        setSellProductModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            minHeight: "50%",
            backgroundColor: "#efefef",
            borderRadius: 30,
          }}
        >
          {/* Search */}
          <View style={sellProductStyles.container}>
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Ionicons
                name="search"
                size={20}
                color="black"
                style={sellProductStyles.searchIcon}
              />
              <TextInput
                value={searchText}
                placeholder="Search by Barcode or Name"
                onChangeText={(x) => setSearchText(x)}
                // style={styles.input}
              />
            </View>
            <Ionicons
              name="scan-circle-outline"
              size={24}
              color={colors.primary}
              style={{ marginRight: 10 }}
            />
          </View>

          {/* Amount */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            {/* <Text style={sellProductStyles.amountText}>Amount</Text> */}
            <TextInput
              onChangeText={(x) => setAmount(x)}
              placeholder="Amount"
              keyboardType="numeric"
              style={sellProductStyles.amountInput}
            />
          </View>

          {/* Selling Price */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {/* <Text style={sellProductStyles.amountText}>
              Selling Price (Unit)
            </Text> */}
            <TextInput
              onChangeText={(x) => setSellingPrice(x)}
              placeholder="Selling Price (Unit)"
              keyboardType="numeric"
              style={sellProductStyles.amountInput}
            />
          </View>

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
                    paymentMethod === "Cash"
                      ? colors.primary
                      : colors.background,
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
                    paymentMethod === "Deposit"
                      ? colors.primary
                      : colors.background,
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
                    paymentMethod === "Credit"
                      ? colors.primary
                      : colors.background,
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {/* <Text style={sellProductStyles.amountText}>Name</Text> */}
            <TextInput
              onChangeText={(x) => setCustomerName(x)}
              placeholder="Name"
              style={sellProductStyles.customerInput}
            />
          </View>

          {/*Customer Phone */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {/* <Text style={sellProductStyles.amountText}>+251</Text> */}
            <TextInput
              onChangeText={(x) => setCustomerPhone(x)}
              placeholder="Number"
              keyboardType="numeric"
              style={sellProductStyles.customerInput}
            />
          </View>

          {/*Customer Company */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {/* <Text style={sellProductStyles.amountText}>Customer Company</Text> */}
            <TextInput
              onChangeText={(x) => setCustomerCompany(x)}
              placeholder="Company"
              style={sellProductStyles.customerInput}
            />
          </View>
          {/* Submit */}
          <TouchableOpacity style={sellProductStyles.submitButton}>
            <Text style={sellProductStyles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SellProductModal;
