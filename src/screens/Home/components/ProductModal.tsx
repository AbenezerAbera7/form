import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import { ModalContext } from "../../../context/ModalContext";

const { height, width } = Dimensions.get("window");
const ProductModal = (props: any) => {
  const { modalVisible, setModalVisible, Barcode } = useContext(ModalContext);
  return (
    <Modal
      isVisible={modalVisible}
      style={{
        width: width * 0.8,
        marginLeft: "auto",
        marginRight: "auto",
      }}
      // coverScreen={false}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
    >
      <View
        style={{
          height: "auto",
          minHeight: "40%",
          backgroundColor: "#efefef",
          borderRadius: 30,
        }}
      >
        <Image
          source={require("../../../assets/images/shoe1.jpg")}
          style={{
            width: "100%",
            height: "40%",
            marginLeft: "auto",
            marginRight: "auto",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        />
        <View
          style={{
            position: "relative",
            left: "25%",
            top: "-6%",
            backgroundColor: "#efefef",
            zIndex: 1,
            maxWidth: width * 0.6,
            borderTopLeftRadius: 30,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              padding: 8,
              fontWeight: "bold",
              fontSize: 20,
              flexWrap: "wrap",
            }}
          >
            Nike Air Force 1
          </Text>
        </View>
        <View
          style={{ marginLeft: "5%", marginBottom: "10%", marginRight: "5%" }}
        >
          <Text>
            Stylish and comfortable shoes, perfect for those seeking both
            fashion and functionality. Crafted with precision and attention to
            detail, these shoes redefine excellence in footwear.
          </Text>
          <Text
            style={{
              textDecorationLine: "underline",
              marginTop: 20,
              fontSize: 18,
            }}
          >
            Barcode:{Barcode}
          </Text>
        </View>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                borderRadius: 30,
                padding: 10,
                width: "45%",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "2%",
                height: 50,
              }}
            >
              <Text style={{ color: "white" }}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                borderRadius: 30,
                padding: 10,
                width: "45%",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "2%",
                height: 50,
              }}
            >
              <Text style={{ color: "white" }}>Add more stock</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              borderRadius: 30,
              padding: 10,
              width: "70%",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: 10,
              height: 50,
              marginBottom: -50,
            }}
          >
            <Text style={{ color: "white" }}>Mark as sold</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;
