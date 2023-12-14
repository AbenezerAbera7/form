import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/Home/HomeScreen";
import ProductScreen from "../screens/Products/ProductsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDescription from "../screens/Products/ProductDescription";
import NewProduct from "../screens/Products/NewProduct";
import ContactDescription from "../screens/Contacts/ContactDescription";
import NewContact from "../screens/Contacts/NewContact";
import EditProduct from "../screens/Products/EditProduct";
import EditContact from "../screens/Contacts/EditContact";
import ContactScreen from "../screens/Contacts/ContactsScreen";
import ITRDetailedView from "../screens/Home/components/Analytics/InventoryTurnoverRatio/ITRDetailedView";
import ScanBarcode from "../screens/Home/components/ScanBarcode";
import { ModalProvider } from "../context/ModalContext";
import Notifications from "../screens/Notifications/Notifications";
import { ProductsProvider } from "../context/ProductsContext";
import { ContactsProvider } from "../context/ContactsContext";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { LocationModalProvider } from "../context/LocationContext";
import StatsScreen from "../screens/Statistics/StatsScreen";
import { colors } from "../config/global";
import ContactDetails from "../screens/Contacts/ContactDetails";
import { View, Text } from "react-native";

import ActionsModal from "../screens/Actions/components/ActionsModal";
import CustomTabBarButton from "../screens/Actions/CustomTabBarButton";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import EmployeesScreen from "../screens/Employees/EmployeesScreen";
import EmployeeDetails from "../screens/Employees/EmployeeDetails";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <Tab.Navigator
          screenOptions={({ route }) => {
            type materialIconName = keyof typeof Ionicons.glyphMap;

            let iconName: materialIconName;
            return {
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Home") {
                  iconName = "home";
                } else if (route.name === "Products") {
                  iconName = "cube-outline";
                } else if (route.name === "Statistics") {
                  iconName = "stats-chart-outline";
                } else if (route.name === "Contacts") {
                  iconName = "people-outline";
                } else if (route.name === "Actions") {
                  iconName = "add-outline";
                  size = 40;
                  // color = colors.primary;
                }

                return (
                  <View>
                    <Ionicons
                      name={iconName}
                      size={size}
                      color={color}
                      style={{ alignSelf: "center", top: 5, left: 1 }}
                    />
                    <Text style={{ color: color, fontSize: 10 }}>
                      {route.name === "Actions" ? "" : route.name}
                    </Text>
                  </View>
                );
              },
              tabBarActiveTintColor: colors.bottomBarActive,
              tabBarInactiveTintColor: colors.bottomBarInactive,
              tabBarShowLabel: false,
              tabBarStyle: {
                backgroundColor: colors.white,
                borderTopWidth: 1,
                borderTopColor: "rgba(0,0,0,0.1)",
              },
            };
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreenStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Products"
            component={ProductsStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Actions"
            component={ActionsModal}
            options={{
              headerShown: false,
              tabBarButton: (props) => {
                return <CustomTabBarButton {...props} />;
              },
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            name="Statistics"
            component={StatsScreenStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Contacts"
            component={ContactStack}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default UserStack;

export function ProductsStack() {
  return (
    <Stack.Navigator initialRouteName="Product">
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Product-Description" component={ProductDescription} />
      <Stack.Screen name="New-Product" component={NewProduct} />
      <Stack.Screen name="Edit-Product" component={EditProduct} />
    </Stack.Navigator>
  );
}

export function ContactStack() {
  return (
    <ContactsProvider>
      <Stack.Navigator initialRouteName="Contact">
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen
          name="Contact-Description"
          component={ContactDescription}
        />
        <Stack.Screen name="New-Contact" component={NewContact} />
        <Stack.Screen name="Edit-Contact" component={EditContact} />
        <Stack.Screen name="Contact-Details" component={ContactDetails} />
      </Stack.Navigator>
    </ContactsProvider>
  );
}

export const HomeScreenStack = () => {
  return (
    <ModalProvider>
      <LocationModalProvider>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ITRDetailedView" component={ITRDetailedView} />
          <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
          <Stack.Screen name="notifications" component={Notifications} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Employees" component={EmployeesScreen} />
          <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
        </Stack.Navigator>
      </LocationModalProvider>
    </ModalProvider>
  );
};

export const StatsScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="StatsScreen">
      <Stack.Screen name="StatsScreen" component={StatsScreen} />
    </Stack.Navigator>
  );
};
