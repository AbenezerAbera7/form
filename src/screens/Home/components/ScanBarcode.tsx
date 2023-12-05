import { View, Text, TouchableOpacity } from "react-native";
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { scanBarcodeStyles } from "../styles/scanBarcode";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ModalContext } from "../../../context/ModalContext";

const ScanBarcode = (props: any) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const { modalVisible, setModalVisible, setBarcode } =
    useContext(ModalContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermission();

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleBarCodeScanned = ({ type, data }: any) => {
    setModalVisible(true);
    setScanned(true);
    setBarcode(data);
    navigation.goBack();
  };
  return (
    <View style={scanBarcodeStyles.background}>
      <TouchableOpacity
        style={scanBarcodeStyles.cancel}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="ios-arrow-back" size={40} color="white" />
      </TouchableOpacity>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={scanBarcodeStyles.camera}
      />
    </View>
  );
};

export default ScanBarcode;
