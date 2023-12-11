import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../config/global";
import { EmployeesScreenStyles } from "./styles/EmployeesScreenStyles";
import EmployeeCard from "./components/EmployeeCard";
import AddEmployeeButton from "./components/AddEmployeeButton";
import NewEmployee from "./components/NewEmployee";
import { UserContext } from "../../context/UserContext";
import { handleGetEmployees } from "../../api-endpoints/employee-endpoint";

const EmployeesScreen = () => {
  const {
    employees,
    setEmployees,
    user,
    setEmployeePermissions,
    employeePermissions,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const getEmployees = async () => {
    const { uid } = user;
    const employees = await handleGetEmployees(uid);
    setEmployees(employees);
    employees.forEach((employee: any) => {
      setEmployeePermissions((prevState: any) => {
        return {
          ...prevState,
          [employee.id]: employee.permissions,
        };
      });
    });
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Employees",
      headerBackTitle: "Home",
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.primary,
    });
    getEmployees();
  }, []);
  return (
    <View style={EmployeesScreenStyles.background}>
      <NewEmployee />
      <ScrollView>
        {employees.map((employee: any) => (
          <EmployeeCard
            key={employee.id}
            FirstName={employee.FirstName}
            LastName={employee.LastName}
            phone={employee.PhoneNumber}
            id={employee.id}
            permissions={employee.permissions}
          />
        ))}
      </ScrollView>
      <AddEmployeeButton />
    </View>
  );
};

export default EmployeesScreen;
