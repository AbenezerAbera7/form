import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Dimensions,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import db from "../../auth/useAuthentication";
import { handleCreateContact } from "../../api-endpoints/contact-endpoint";

const { width, height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { ContactsContext } from "../../context/ContactsContext";
import { UserContext } from "../../context/UserContext";

const NewContact = (props: any) => {
  const [contacts, setContacts] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setRefresh } = useContext(ContactsContext);
  const { user } = useContext(UserContext);
  const { uid } = user;
  const type = props.route.params.contactType;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "New Contact",
      headerStyle: {
        backgroundColor: "#ccffff",
      },
    });
  });
  const [newContact, setNewContact] = useState({
    id: "",
    contactName: "",
    description: "",
    image: "",
    phone: "",
    email: "",
    address: "",
    company: "",
    verified: true,
  });

  useEffect(() => {}, []);

  const handleInputChange = (field: any, value: any) => {
    setNewContact({
      ...newContact,
      [field]: value,
    });
  };

  const inputter = (field: any, value: any, placeholder: any) => {
    return (
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
            color: "#007777",
            marginLeft: width * 0.05,
          }}
        >
          {placeholder}
        </Text>
        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            fontSize: 16,
            width: width * 0.7,
            marginLeft: width * 0.05,
            marginRight: 10,
            marginBottom: width * 0.05,
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={(value) => handleInputChange(field, value)}
        />
      </View>
    );
  };

  const handleSubmit = async (something: any) => {
    console.log("submitting new contact");
    if (loading) {
      return;
    }
    setLoading(true);
    if (image != "") {
      const imageLink: any = await uploadToFirebase(image, image, () => {});
      newContact.image = imageLink.downloadUrl;
    }
    const response = await handleCreateContact(newContact, uid, type);
    if (response) {
      Alert.alert("Contact created successfully.");
      setRefresh(true);
      navigation.goBack();
    }
    setLoading(false);
  };

  const uploadToFirebase = async (uri: any, name: any, onProgress: any) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `Contacts/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderImagePicker = () => {
    if (image) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 20,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {/*   <Pressable style={styles.button} 
             onPress= {() =>uploadToFirebase(image, name, onProgress )} 
             >
              <Text style={styles.text}>{"Upload"}</Text>
            </Pressable> */}

            <Pressable style={styles.buttonRed} onPress={() => setImage("")}>
              <Text style={styles.text}>{"Cancel"}</Text>
            </Pressable>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={pickImage}>
          <View
            style={{
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
              flexDirection: "column",
              width: width * 0.5,
              height: width * 0.5,
              borderRadius: 20,
              backgroundColor: "transparent",
              borderColor: "white",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 20,
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 15,
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../assets/images/empty.jpg")}
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined,
                  borderRadius: 20,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                color: "#007777",
                alignSelf: "center",
              }}
            >
              {"Upload Image"}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ScrollView>
      <View>
        <Text
          style={{
            fontStyle: "italic",
            fontSize: 20,
            fontWeight: "900",
            color: "#555555",
            marginLeft: width * 0.1,
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          Fill out the following fields
        </Text>

        {renderImagePicker()}
        {inputter("contactName", newContact.contactName, "Contact Name")}
        {inputter("description", newContact.description, "Bio")}
        {inputter("phone", newContact.phone, "Phone Number")}
        {inputter("email", newContact.email, "Email")}
        {inputter("address", newContact.address, "Address")}
        {inputter("company", newContact.company, "Company")}
        <Text style={{ fontSize: 20, fontWeight: "900", alignSelf: "center" }}>
          Verification
        </Text>
        <View style={{ alignContent: "center", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignContent: "space-between",
              justifyContent: "center",
              width: width * 0.7,
              alignSelf: "center",
              marginBottom: 25,
            }}
          >
            <TouchableOpacity
              onPress={() => handleInputChange("verified", true)}
              style={{ marginTop: 20, marginLeft: -20 }}
            >
              <View
                style={{
                  width: width * 0.3,
                  borderRadius: 10,
                  backgroundColor: newContact.verified ? "#23ff49" : "gray",
                  height: width * 0.1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "900",
                    fontFamily: "System",
                    color: newContact.verified ? "black" : "white",
                    alignSelf: "center",
                  }}
                >
                  {"Verified"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleInputChange("verified", false)}
              style={{ marginTop: 20, marginLeft: 20 }}
            >
              <View
                style={{
                  width: width * 0.3,
                  borderRadius: 10,
                  backgroundColor: !newContact.verified ? "red" : "gray",
                  height: width * 0.1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "900",
                    fontFamily: "System",
                    color: "white",
                    alignSelf: "center",
                  }}
                >
                  {"Unverified"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit("")}
          style={{ alignSelf: "center", marginTop: 20, marginBottom: 20 }}
        >
          <View
            style={{
              width: width * 0.4,
              borderRadius: 10,
              backgroundColor: loading ? "gray" : "black",
              height: width * 0.12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "900",
                color: "white",
                alignSelf: "center",
              }}
            >
              {loading ? "Creating..." : "Create Contact"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewContact;

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
