import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import db from "../../auth/useAuthentication";
import shp from "../../api-endpoints/shop-endpoint";

const NewShop = () => {
  const [shops, setShops] = useState([]);
  const [NewShop, setNewShop] = useState({
    id: "",
    shopName: "",
    description: "",
    barcode: "",
    stock: 0,
    price: 0,
    availability: true,
  });

  useEffect(() => {
    // Load shops from Firestore on mount
    const unsubscribe = db.collection("shops").onSnapshot((snapshot: any) => {
      const NewShops = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShops(NewShops);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (field: any, value: any) => {
    setNewShop({
      ...NewShop,
      [field]: value,
    });
  };

  return (
    <View>
      <Text>New shop:</Text>
      <TextInput
        placeholder="ID"
        value={NewShop.id}
        onChangeText={(value) => handleInputChange("id", value)}
      />
      <TextInput
        placeholder="shop Name"
        value={NewShop.shopName}
        onChangeText={(value) => handleInputChange("shopName", value)}
      />
      <TextInput
        placeholder="Description"
        value={NewShop.description}
        onChangeText={(value) => handleInputChange("description", value)}
      />
      <TextInput
        placeholder="Barcode"
        value={NewShop.barcode}
        onChangeText={(value) => handleInputChange("barcode", value)}
      />
      <TextInput
        placeholder="Stock"
        keyboardType="numeric"
        value={NewShop.stock.toString()}
        onChangeText={(value) => handleInputChange("stock", parseInt(value))}
      />
      <TextInput
        placeholder="Price"
        keyboardType="decimal-pad"
        value={NewShop.price.toString()}
        onChangeText={(value) => handleInputChange("price", parseFloat(value))}
      />
      <Text>Availability:</Text>
      <View>
        <Button
          title="Available"
          onPress={() => handleInputChange("availability", true)}
          color={NewShop.availability ? "green" : "gray"}
        />
        <Button
          title="Out of Stock"
          onPress={() => handleInputChange("availability", false)}
          color={!NewShop.availability ? "red" : "gray"}
        />
      </View>
      <Button
        title="Create shop"
        onPress={() => shp.handleCreateShop(NewShop)}
      />

      <Button
        title="Update shop"
        onPress={() => shp.handleUpdateShop(NewShop.id, NewShop)}
      />
    </View>
  );
};

export default NewShop;
