import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { locationMapViewStyles } from "./styles/locationMapView";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { googleAPI } from "../../../backend/google";
import { LocationModalContext } from "../../../context/LocationContext";
import LocationModal from "./LocationModal";
import { UserContext } from "../../../context/UserContext";

const LocationMapView = (props: { location: Location.LocationObject }) => {
  const { location } = props;
  const [mapRef, setMapRef] = useState<MapView>();
  const [region, setRegion] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [marker, setMarker] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  const { setLocationModalVisible } = useContext(LocationModalContext);
  const { setBusinessDetails, businessDetails } = useContext(UserContext);

  const handleConfirm = () => {
    setLocationModalVisible(true);
    setBusinessDetails({ ...businessDetails, location: marker });
  };

  const handleRegionChangeFromSearch = (lat: number, long: number) => {
    mapRef?.animateToRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  const handleRegionChange = (region: any) => {
    setMarker({
      latitude: region.latitude,
      longitude: region.longitude,
    });

    setRegion({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  return (
    <View style={locationMapViewStyles.background}>
      {location ? (
        <View style={locationMapViewStyles.background}>
          <MapView
            ref={(ref: MapView) => {
              setMapRef(ref);
            }}
            style={locationMapViewStyles.mapView}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            onRegionChange={(region) => handleRegionChange(region)}
          >
            <Marker coordinate={marker} />
          </MapView>
          <View style={locationMapViewStyles.searchContainer}>
            <GooglePlacesAutocomplete
              styles={{
                textInput: locationMapViewStyles.searchBar,
                poweredContainer: { display: "none" },
              }}
              fetchDetails={true}
              placeholder="Search here"
              query={{ key: googleAPI }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                handleRegionChangeFromSearch(
                  details ? details.geometry.location.lat : region.latitude,
                  details ? details.geometry.location.lng : region.longitude
                );
              }}
            />
          </View>
          <View style={locationMapViewStyles.confirmButtonContainer}>
            <TouchableOpacity
              style={locationMapViewStyles.confirmButton}
              onPress={() => {
                handleConfirm();
              }}
            >
              <Text style={locationMapViewStyles.confirmButtonText}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
          <LocationModal />
        </View>
      ) : null}
    </View>
  );
};

export default LocationMapView;
