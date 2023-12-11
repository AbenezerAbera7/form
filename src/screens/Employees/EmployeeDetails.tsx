import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { colors } from "../../config/global";
import { EmployeeDetailsStyles } from "./styles/EmployeeDetailsStyles";

import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PermissionCard from "./components/PermissionCard";
import { handleUpdatePermissions } from "../../api-endpoints/employee-endpoint";
import { UserContext } from "../../context/UserContext";
const { width, height } = Dimensions.get("window");

const ListOfPermissions = [
  "Sell a Product",
  "Add a product to inventory",
  "Modify product details",
  "View statistics",
  "View current balance",
  "Flag a product",
  "Generate financial reports",
  "View transaction history",
];

const Permissions = {
  sellproduct: "Sell a Product",
  addproduct: "Add a product to inventory",
  modifyproduct: "Modify product details",
  viewstatistics: "View statistics",
  viewbalance: "View current balance",
  flagproduct: "Flag a product",
  generatefinancialreports: "Generate financial reports",
  viewtransactionhistory: "View transaction history",
};

const EmployeeDetails = (props: any) => {
  const navigation = useNavigation<any>();
  const name = `${props.route.params.FirstName} ${props.route.params.LastName}`;
  const phone = props.route.params.phone;
  const id = props.route.params.id;
  const permissions = props.route.params.permissions;
  const { user } = useContext(UserContext);
  const { uid } = user;
  const {
    employees,
    setEmployees,
    employeePermissions,
    setEmployeePermissions,
  } = useContext(UserContext);

  useEffect(() => {}, [employeePermissions]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View style={EmployeeDetailsStyles.background}>
      <View style={EmployeeDetailsStyles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name="keyboard-backspace"
            size={30}
            color="white"
            style={EmployeeDetailsStyles.backButton}
          />
        </TouchableOpacity>
      </View>

      <View style={EmployeeDetailsStyles.contactContainer}>
        <View style={EmployeeDetailsStyles.imageContainer}>
          <Icon
            name="person"
            size={width * 0.5}
            color={colors.white}
            style={EmployeeDetailsStyles.image}
          />
        </View>

        <View style={EmployeeDetailsStyles.nameContainer}>
          <Text style={EmployeeDetailsStyles.nameText}>{name}</Text>
        </View>

        <View style={EmployeeDetailsStyles.details}>
          <ScrollView
            style={{
              maxHeight: height * 0.5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginTop: 15,
                color: "grey",
              }}
            >
              {"Mobile"}
            </Text>
            <View
              style={{
                borderColor: "grey",
                borderBottomWidth: 1,
                width: width * 0.8,
                marginLeft: 20,
              }}
            ></View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              {phone}
            </Text>

            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginTop: 15,
                color: "grey",
              }}
            >
              {"Sign up code"}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                // marginTop: 15,
                color: "red",
              }}
            >
              {"Please share this code with the employee.\nLong press to copy."}
            </Text>
            <View
              style={{
                borderColor: "grey",
                borderBottomWidth: 1,
                width: width * 0.8,
                marginLeft: 20,
              }}
            ></View>
            <Text
              selectable={true}
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              {`${id}_${uid}`}
            </Text>

            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginTop: 15,
                color: "grey",
              }}
            >
              {"Permissions"}
            </Text>

            {Object.keys(Permissions).map((key: string) => {
              return (
                <PermissionCard
                  permission={Permissions[key as keyof typeof Permissions]}
                  employeeId={id}
                  permissionKey={key}
                  key={key}
                />
              );
            })}
            <TouchableOpacity
              style={EmployeeDetailsStyles.confirmButton}
              onPress={() => {
                handleUpdatePermissions(
                  { permissions: employeePermissions[id] },
                  uid,
                  id
                );
                navigation.goBack();
              }}
            >
              <Text style={EmployeeDetailsStyles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default EmployeeDetails;
