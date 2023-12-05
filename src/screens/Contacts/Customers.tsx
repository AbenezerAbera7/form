import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Linking,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/MaterialIcons";
import { constant } from "../../styles/constantscreen";
import { handleGetContacts } from "../../api-endpoints/contact-endpoint";
import { ContactsContext } from "../../context/ContactsContext";
import { UserContext } from "../../context/UserContext";
import { contactScreenStyles } from "./styles/constactscreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../config/global";
import AddContactButton from "./components/AddContactButton";

const Customers = (props: any) => {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [loadedData, setLoadedData] = useState(false);
  const { refresh, setRefresh } = useContext(ContactsContext);
  const { user } = useContext(UserContext);
  const { uid } = user;

  useEffect(() => {
    getContacts();
  }, [refresh]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const searchContacts = (list: any) => {
    if (!list) {
      return [];
    }

    if (text == "") {
      return list.filter((itemx: any, idx: any) => {
        return true;
      });
    } else {
      return list.filter((itemx: any, idx: any) => {
        var name = itemx.contactName ? itemx.contactName.toLowerCase() : "";
        var phone = itemx.phone ? itemx.phone.toLowerCase() : "";
        var address = itemx.address ? itemx.address.toLowerCase() : "";
        var company = itemx.company ? itemx.company.toLowerCase() : "";

        var canRet = false;
        canRet =
          name.includes(text.toLowerCase()) ||
          phone.includes(text.toLowerCase()) ||
          address.includes(text.toLowerCase()) ||
          company.includes(text.toLowerCase());

        return canRet;
      });
    }
  };

  const renderContactWidget = (contact: any, idx: any) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
        }}
        onPress={() => {
          // props.navigation.navigate("Contact-Description", {
          //   contact: contact,
          // });
          props.navigation.navigate("Contact-Details", {
            contact: contact,
            type: "Customers",
          });
        }}
        key={idx}
      >
        <View
          style={{
            width: width * 0.95,
            minHeight: width * 0.2,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: "white",
            shadowOpacity: 0.2,
            elevation: 20,
            shadowRadius: 8,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            {contact.image !== "" ? (
              <Image
                source={{ uri: contact.image }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginHorizontal: 10,
                }}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={50}
                color={colors.primary}
                style={{ marginHorizontal: 10 }}
              />
            )}

            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 3,
                    color: "black",
                  }}
                >
                  {contact.contactName}
                </Text>
                {contact.verified ? (
                  <Icon
                    name="verified"
                    size={20}
                    style={{ marginLeft: 5 }}
                    color={colors.primary}
                  />
                ) : null}
              </View>
              <Text
                style={{
                  width: width * 0.45,
                  fontSize: 14,
                  fontStyle: "italic",
                  color: "black",
                }}
              >
                {contact.company}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                justifyContent: "flex-end",
                marginRight: 10,
              }}
              onPress={() => {
                Linking.openURL(`tel:${contact.phone}`);
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="call-outline" size={15} color="#23ff67" />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "normal",
                    fontStyle: "italic",
                    color: "black",
                    marginLeft: 5,
                  }}
                >
                  {contact.phone}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  var getContacts = async () => {
    setLoadingData(true);
    const contacts = await handleGetContacts(uid, "Customers");
    setContacts(contacts);
    setLoadedData(true);
    setLoadingData(false);
    setRefresh(false);
  };
  const renderItem = ({ item, index }: { item: any; index: any }) => {
    return renderContactWidget(item, index);
  };

  return (
    <View style={contactScreenStyles.background}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <View style={contactScreenStyles.searchBackground}>
          <Icon
            name="person-search"
            size={25}
            color={colors.primary}
            style={{
              marginLeft: 10,
            }}
          />
          <TextInput
            value={text}
            placeholder="Search (by name or phone number)"
            onChangeText={(x) => setText(x)}
            style={styles.input}
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
      {searchContacts(contacts).length == 0 ? (
        loadingData ? (
          <View
            style={{
              width: width,
              height: height * 0.1,
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
              {contacts.length == 0
                ? "Start connecting! Add your first contacts"
                : ""}
            </Text>
          </View>
        )
      ) : (
        // <ScrollView style={{ marginTop: 5, paddingBottom: 250 }}>
        //   {searchContacts(contacts).map((contact: any, idx: any) => {
        //     return renderContactWidget(contact, idx);
        //   })}
        // </ScrollView>
        <FlatList
          data={searchContacts(contacts)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 200 }}
          style={{ marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AddContactButton contactType="Customers" />
    </View>
  );
};

export default Customers;

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
