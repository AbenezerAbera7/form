import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SettingCard from "./components/SettingCard";
import { settingsScreenStyles } from "./styles/settingsScreenStyles";
import { colors } from "../../config/global";
import { getAuth, signOut } from "firebase/auth";

const SettingsScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Settings",
      headerBackTitle: "Home",
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.primary,
    });
  }, []);
  return (
    <View style={settingsScreenStyles.background}>
      <ScrollView>
        <SettingCard title="Account" iconName="account" />
        <SettingCard
          title="Employees"
          iconName="account-supervisor"
          route="Employees"
        />
        <SettingCard title="Currency" iconName="cash-marker" />
        <SettingCard
          title="Notifications"
          iconName="bell"
          route="notifications"
        />
        <SettingCard title="Appearance" iconName="format-paint" />
        <SettingCard title="Contact Us" iconName="tooltip-cellphone" />
        <SettingCard title="About" iconName="information-outline" />
        <TouchableOpacity
          style={settingsScreenStyles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={settingsScreenStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
