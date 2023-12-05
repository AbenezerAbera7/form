import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocationStyles } from "./styles/getLocation";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import LocationMapView from "./LocationMapView";
import { colors } from "../../../config/global";

const GetLocationScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };
    getLocation();
  }, []);

  return (
    <View style={getLocationStyles.background}>
      {location ? (
        <LocationMapView location={location} />
      ) : (
        <View style={getLocationStyles.loadingContainer}>
          <ActivityIndicator
            style={getLocationStyles.loading}
            size="large"
            color={colors.primary}
          />
          <Text style={getLocationStyles.loadingText}>
            Let's pinpoint your business location 📍✨
          </Text>
        </View>
      )}
    </View>
  );
};

export default GetLocationScreen;
