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
import { contactDetailStyles } from "./styles/contactDetails";
const { width, height } = Dimensions.get("window");

const ContactDetails = (props: any) => {
  const navigation = useNavigation<any>();
  const image = props.route.params.contact.image;
  const name = props.route.params.contact.contactName;
  const bio = props.route.params.contact.description;
  const phone = props.route.params.contact.phone;
  const email = props.route.params.contact.email;
  const address = props.route.params.contact.address;
  const verified = props.route.params.contact.verified;
  const company = props.route.params.contact.company;
  const price = props.route.params.price;
  const stock = props.route.params.stock;
  const barCode = props.route.params.barCode;
  const id = props.route.params.contact.id;
  const type = props.route.params.type;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View style={contactDetailStyles.background}>
      <View style={contactDetailStyles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name="keyboard-backspace"
            size={30}
            color="white"
            style={contactDetailStyles.backButton}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={contactDetailStyles.editButton}
          onPress={() => {
            navigation.navigate("Edit-Contact", {
              shoe: image,
              name: name,
              bio: bio,
              phone: phone,
              verified: verified,
              email: email,
              company: company,
              address: address,
              id: id,
              type: type,
            });
          }}
        >
          <Text style={contactDetailStyles.editButtonText}>Edit Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={contactDetailStyles.contactContainer}>
        <View style={contactDetailStyles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={contactDetailStyles.image} />
          ) : (
            <Icon
              name="person"
              size={width * 0.5}
              color="white"
              style={contactDetailStyles.image}
            />
          )}
        </View>
        <View style={contactDetailStyles.nameContainer}>
          <Text style={contactDetailStyles.nameText}>{name}</Text>
          {verified ? (
            <Icon
              name="verified"
              size={20}
              color={colors.primary}
              style={{ marginLeft: 5 }}
            />
          ) : null}
        </View>

        <View style={contactDetailStyles.makeContactContainer}>
          <TouchableOpacity
            style={contactDetailStyles.makeContactButton}
            onPress={() => {
              Linking.openURL(`tel:${phone}`);
            }}
          >
            <Icon name="call" size={30} color={colors.primary} />
            <Text style={contactDetailStyles.makeContactText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={contactDetailStyles.makeContactButton}
            onPress={() => {
              // link to sms
              Linking.openURL(`sms:${phone}`);
            }}
          >
            <Icon name="message" size={30} color={colors.primary} />
            <Text style={contactDetailStyles.makeContactText}>Message</Text>
          </TouchableOpacity>
        </View>

        <View style={contactDetailStyles.details}>
          <ScrollView>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginTop: 15,
                color: "grey",
              }}
            >
              {"Mobile"}
            </Text>
            <View
              style={{
                borderColor: "grey",
                borderBottomWidth: 1,
                width: width * 0.8,
                marginLeft: 20,
              }}
            ></View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              {phone}
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
            <View
              style={{
                borderColor: "grey",
                borderBottomWidth: 1,
                width: width * 0.8,
                marginLeft: 20,
              }}
            ></View>

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
            <View
              style={{
                borderColor: "grey",
                borderBottomWidth: 1,
                width: width * 0.8,
                marginLeft: 20,
              }}
            ></View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 20,
                color: "black",
              }}
            >
              {company}
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
            <View
              style={{
                borderColor: "grey",
                borderBottomWidth: 1,
                width: width * 0.8,
                marginLeft: 20,
              }}
            ></View>
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
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ContactDetails;
