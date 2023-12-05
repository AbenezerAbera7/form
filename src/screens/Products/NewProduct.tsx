import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import db from "../../auth/useAuthentication";
import {
  handleAddTransaction,
  handleCreateProduct,
} from "../../api-endpoints/product-endpoint";
import Icon from "react-native-vector-icons/FontAwesome";
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
import { ProductsContext } from "../../context/ProductsContext";

const NewProduct = (props: any) => {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { uid } = user;
  const { setRefresh } = useContext(ProductsContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "New Product",
      headerStyle: {
        backgroundColor: "#ccffff",
      },
    });
  });
  const [newProduct, setNewProduct] = useState({
    id: "",
    productName: "",
    description: "",
    barcode: "",
    stock: 0,
    image: "",
    price: 0,
    availability: true,
    creating: false,
    entry: "",
    production: "",
    expiry: "",
    purchasePrice: "",
  });

  useEffect(() => {
    // Load products from Firestore on mount
    /*  const unsubscribe = db.collection('products')
        .onSnapshot((snapshot: any) => {
          const newProducts = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(newProducts);
        });
  
      return () => unsubscribe(); */
  }, []);

  const handleInputChange = (field: any, value: any) => {
    setNewProduct({
      ...newProduct,
      [field]: value,
    });
  };

  const inputter = (field: any, value: any, placeholder: any, header: any) => {
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
            color: "#007777",
            marginLeft: width * 0.05,
          }}
        >
          {header}
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

  const uploadToFirebase = async (uri: any, name: any, onProgress: any) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `Products/${name}`);

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

  const handleSubmit = async (something: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log("submitting new product");
    if (image != "") {
      const imageLink: any = await uploadToFirebase(image, image, () => {});
      newProduct.image = imageLink.downloadUrl;
      newProduct.description =
        "Stylish and comfortable shoes, perfect for those seeking both fashion and functionality. Crafted with precision and attention to detail, these shoes redefine excellence in footwear.";
    }
    const response = await handleCreateProduct(newProduct, uid);

    if (response) {
      const transaction = {
        type: "purchase",
        amount: newProduct.purchasePrice,
        date: new Date().toDateString(),
        product: newProduct.productName,
        productID: response,
        quantity: newProduct.stock,
        unitPrice: newProduct.purchasePrice,
        expiry: newProduct.expiry,
        production: newProduct.production,
      };
      const res = await handleAddTransaction(transaction, uid, response);
      Alert.alert("Product created successfully.");
      setRefresh(true);
      navigation.goBack();
    }
    setLoading(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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
      <View style={{ alignContent: "center", justifyContent: "center" }}>
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

        {/* <TextInput
          placeholder="Product Name"
          value={newProduct.productName}
          onChangeText={(value) => handleInputChange('productName', value)}
        /> */}
        {renderImagePicker()}
        {inputter(
          "productName",
          newProduct.productName,
          "Product Name",
          "Product Name"
        )}
        {inputter(
          "description",
          newProduct.description,
          "Description",
          "Description"
        )}
        {inputter("barcode", newProduct.barcode, "Barcode", "Barcode")}
        {inputter("stock", newProduct.stock, "Stock", "Stock")}
        {inputter(
          "purchasePrice",
          newProduct.purchasePrice,
          "How much did you buy it for?",
          "Purchase Price (unit)"
        )}
        {inputter(
          "price",
          newProduct.price,
          "Price (How much are you selling it for?)",
          "Price (unit)"
        )}
        {/* {inputter("entry", newProduct.entry, "Entry Date", "Entry Date")} */}
        {inputter(
          "production",
          newProduct.production,
          "Production Date",
          "Production Date"
        )}
        {inputter("expiry", newProduct.expiry, "Expiry Date", "Expiry Date")}
        <Text style={{ fontSize: 20, fontWeight: "900", alignSelf: "center" }}>
          Availability
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
              onPress={() => handleInputChange("availability", true)}
              style={{ marginTop: 20, marginLeft: -20 }}
            >
              <View
                style={{
                  width: width * 0.3,
                  borderRadius: 10,
                  backgroundColor: newProduct.availability ? "#23ff49" : "gray",
                  height: width * 0.1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "900",
                    fontFamily: "System",
                    color: newProduct.availability ? "black" : "white",
                    alignSelf: "center",
                  }}
                >
                  {"Available"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleInputChange("availability", false)}
              style={{ marginTop: 20, marginLeft: 20 }}
            >
              <View
                style={{
                  width: width * 0.3,
                  borderRadius: 10,
                  backgroundColor: !newProduct.availability ? "red" : "gray",
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
                  {"Out of Stock"}
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
              {loading ? "Creating..." : "Create Product"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
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

export default NewProduct;
