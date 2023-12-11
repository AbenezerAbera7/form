import { View, Text, TouchableOpacity, Switch } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { PermissionCardStyles } from "../styles/PermissionCardStyles";
import { colors } from "../../../config/global";
import { UserContext } from "../../../context/UserContext";

interface PermissionCardProps {
  permission: string;
  employeeId: string;
  permissionKey: string;
}

const PermissionCard = ({
  permission,
  employeeId,
  permissionKey,
}: PermissionCardProps) => {
  const { setEmployeePermissions, employeePermissions } =
    useContext(UserContext);
  const [isEnabled, setIsEnabled] = useState(
    employeePermissions[employeeId][permissionKey].value
  );

  const handleUpdatePermissions = (value: any) => {
    setEmployeePermissions((prevState: any) => {
      return {
        ...prevState,
        [employeeId]: {
          ...prevState[employeeId],
          [permissionKey]: {
            ...prevState[employeeId][permissionKey],
            value: value,
          },
        },
      };
    });
  };

  const toggleSwitch = (value: any) => {
    setIsEnabled(value);
    handleUpdatePermissions(value);
  };

  return (
    <View style={PermissionCardStyles.background}>
      <Text style={PermissionCardStyles.text}>{permission}</Text>
      <Switch
        trackColor={{ false: "#767577", true: colors.primary }}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default PermissionCard;
