import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../config/global";
const { width, height } = Dimensions.get("window");

const ContactDescription = (props: any) => {
  const navigation = useNavigation();
  const image = props.route.params.contact.image;
  const name = props.route.params.contact.contactName;
  const bio = props.route.params.contact.description;
  const phone = props.route.params.contact.phone;
  const email = props.route.params.contact.email;
  const address = props.route.params.contact.address;
  // const available = props.route.params.contact.available;
  const verified = props.route.params.contact.verified;
  const company = props.route.params.contact.company;
  const price = props.route.params.price;
  const stock = props.route.params.stock;
  const barCode = props.route.params.barCode;
  const id = props.route.params.contact.id;
  const type = props.route.params.type;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: " ",
    });
  });

  var renderAvailability = (verified: boolean) => {
    if (verified) {
      return (
        <View
          style={{
            width: 80,
            height: 30,
            borderRadius: 10,
            backgroundColor: "#23ff67",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
            Verified
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: 120,
            height: 30,
            borderRadius: 10,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Unverified
          </Text>
        </View>
      );
    }
  };

  var renderEditButton = (available: boolean) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Edit-Contact", {
            shoe: image,
            name: name,
            bio: bio,
            phone: phone,
            verified: verified,
            email: email,
            company: company,
            available: available,
            address: address,
            id: id,
            type: type,
          });
        }}
      >
        <View
          style={{
            width: 150,
            height: 40,
            marginTop: 25,
            alignSelf: "center",
            borderRadius: 15,
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Edit Contact
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  var renderDetails = () => {
    return (
      <View
        style={{
          width: width * 0.9,
          marginBottom: 10,
          marginLeft: 20,
          marginTop: 30,
          borderRadius: 20,
          backgroundColor: "white",
          paddingVertical: 20,
        }}
      >
        <View style={{ flexDirection: "column", width: width * 0.8 }}>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginBottom: 3,
                marginLeft: 20,
                flex: 1,
              }}
            >
              {name}
            </Text>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                Linking.openURL(`tel:${phone}`);
              }}
            >
              <Icon name="call" size={30} color={colors.primary} />
              <Text style={{ color: colors.primary }}>{phone}</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "normal",
              fontStyle: "italic",
              marginLeft: 20,
              marginTop: 10,
              color: "#666666",
            }}
          >
            {bio}
          </Text>

          <Text
            style={{
              fontSize: 16,
              marginLeft: 20,
              marginTop: 15,
              color: "grey",
            }}
          >
            {"Email"}
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            {email}
          </Text>

          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,
              marginTop: 10,
              color: "grey",
            }}
          >
            {"Company"}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 20,
              color: "black",
            }}
          >
            {"Company: " + company}
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: "grey",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            {"Address"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
              marginLeft: 20,
            }}
          >
            {address}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 20 }}>
            <View style={{ flexDirection: "row", marginLeft: 0 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "900",
                  marginTop: 5,
                  fontStyle: "italic",
                  color: "green",
                }}
              >
                {"Status: "}
              </Text>
              {renderAvailability(verified)}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
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
            <Image
              source={{ uri: image }}
              style={{ width: width, height: width * 0.8 }}
            />
          </View>
          {renderDetails()}
          {renderEditButton(verified)}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ContactDescription;
