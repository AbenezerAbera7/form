import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/FontAwesome";
import { constant } from "../../styles/constantscreen";
import { handleGetContacts } from "../../api-endpoints/contact-endpoint";
import { ContactsContext } from "../../context/ContactsContext";
import { UserContext } from "../../context/UserContext";
import { contactScreenStyles } from "./styles/constactscreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Vendors from "./Vendors";
import Customers from "./Customers";
import { colors } from "../../config/global";
import AddContactButton from "./components/AddContactButton";

const Tab = createMaterialTopTabNavigator();

const ContactScreen = (props: any) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: colors.white,
      }}
    >
      <Tab.Navigator
        screenOptions={() => {
          return {
            tabBarStyle: {
              alignSelf: "center",
              width: "50%",
              borderRadius: 100,
              borderColor: "blue",
              backgroundColor: "white",
              elevation: 10,
              shadowOpacity: 0.4,
              shadowRadius: 10,
              marginTop: height * 0.08,
              // shadowColor: colors.primary,
            },
            tabBarIndicatorStyle: {
              height: "80%",
              top: "10%",
              bottom: "10%",
              width: "45%",
              left: "2.5%",
              borderRadius: 100,
              backgroundColor: colors.primary,
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "black",
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "bold",
            },
            // swipeEnabled: false,
          };
        }}
      >
        <Tab.Screen name="Vendors" component={Vendors} />
        <Tab.Screen name="Customers" component={Customers} />
      </Tab.Navigator>
      {/* <AddContactButton /> */}
    </View>
  );
};

export default ContactScreen;
