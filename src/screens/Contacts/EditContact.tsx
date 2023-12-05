import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Image,
  Alert,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import db from "../../auth/useAuthentication";
import { handleUpdateContact } from "../../api-endpoints/contact-endpoint";

const { width, height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { UserContext } from "../../context/UserContext";
import { ContactsContext } from "../../context/ContactsContext";

const EditContact = (props: any) => {
  const [contacts, setContacts] = useState([]);
  const [image, setImage] = useState(props.route.params.shoe);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const shoe = props.route.params.shoe;
  const name = props.route.params.name;
  const bio = props.route.params.bio;
  const phone = props.route.params.phone;
  const email = props.route.params.email;
  const address = props.route.params.address;
  const verified = props.route.params.verified;
  const company = props.route.params.company;
  const id = props.route.params.id;
  const type = props.route.params.type;
  const { user } = useContext(UserContext);
  const { uid } = user;
  const { setRefresh } = useContext(ContactsContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Edit Contact",
      headerStyle: {
        backgroundColor: "#ccffff",
      },
    });
  });
  const [newContact, setNewContact] = useState({
    id: id,
    contactName: name,
    description: bio,
    barcode: "",
    phone: phone,
    image: image,
    company: company,
    email: email,
    verified: verified,
    address: address,
    creating: false,
  });

  useEffect(() => {
    // Load contacts from Firestore on mount
    /*  const unsubscribe = db.collection('contacts')
        .onSnapshot((snapshot: any) => {
          const newContacts = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(newContacts);
        });
  
      return () => unsubscribe(); */
  }, []);

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
    setLoading(true);
    if (image != "") {
      const imageLink: any = await uploadToFirebase(image, image, () => {});
      newContact.image = imageLink.downloadUrl;
    }

    const response = await handleUpdateContact(newContact, uid, type);
    if (response) {
      setLoading(false);
      setRefresh(true);
      Alert.alert("Contact updated successfully.");
      props.navigation.navigate("Contact");
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
        {inputter("bio", newContact.description, "Bio")}
        {inputter("phone", newContact.phone, "Phone Number")}
        {inputter("email", newContact.email, "Email")}
        {inputter("company", newContact.company, "Company")}
        {inputter("address", newContact.address, "Address")}
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
              {loading ? "Updating..." : "Update Contact"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditContact;

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
