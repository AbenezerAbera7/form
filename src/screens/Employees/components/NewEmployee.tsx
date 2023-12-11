import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import { UserContext } from "../../../context/UserContext";
import { NewEmployeeStyles } from "../styles/NewEmployeeStyles";
import {
  handleCreateEmployee,
  handleGetEmployees,
} from "../../../api-endpoints/employee-endpoint";
import { colors } from "../../../config/global";

const { width } = Dimensions.get("window");

const Permissions = {
  sellproduct: { name: "Sell a Product", value: false },
  addproduct: { name: "Add a product to inventory", value: false },
  modifyproduct: { name: "Modify product details", value: false },
  viewstatistics: { name: "View statistics", value: false },
  viewbalance: { name: "View current balance", value: false },
  flagproduct: { name: "Flag a product", value: false },
  generatefinancialreports: {
    name: "Generate financial reports",
    value: false,
  },
  viewtransactionhistory: { name: "View transaction history", value: false },
};

const NewEmployee = () => {
  const {
    newEmployeeModalVisible,
    setNewEmployeeModalVisible,
    user,
    employees,
    setEmployees,
    setEmployeePermissions,
  } = useContext(UserContext);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
  const reset = () => {
    setFirstName("");
    setLastName("");
    setNumber("");
    setError("");
    setLoading(false);
  };

  const handleAddEmployee = async () => {
    setLoading(true);
    setError("");
    if (FirstName === "" || number === "" || LastName === "") {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      const { uid } = user;
      if (
        await handleCreateEmployee(
          {
            FirstName: FirstName,
            LastName: LastName,
            PhoneNumber: number,
            permissions: Permissions,
          },
          uid
        )
      ) {
        reset();
        await getEmployees();
        setNewEmployeeModalVisible(false);
      } else {
        setError("Something went wrong");
      }
      setLoading(false);
      return;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <Modal
      isVisible={newEmployeeModalVisible}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      style={{
        width: width * 0.9,
        marginLeft: "auto",
        marginRight: "auto",
      }}
      // coverScreen={false}
      onBackdropPress={() => {
        reset();
        setNewEmployeeModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            minHeight: "25%",
            backgroundColor: "#efefef",
            borderRadius: 30,
          }}
        >
          <Text style={NewEmployeeStyles.text}>
            🎉 Let's add a new member to the team
          </Text>
          <View style={NewEmployeeStyles.inputContainer}>
            <TextInput
              onChangeText={(x) => setFirstName(x)}
              placeholder="First Name"
              style={NewEmployeeStyles.input}
            />
          </View>
          <View style={NewEmployeeStyles.inputContainer}>
            <TextInput
              onChangeText={(x) => setLastName(x)}
              placeholder="Last Name"
              style={NewEmployeeStyles.input}
            />
          </View>

          <View style={NewEmployeeStyles.inputContainer}>
            <TextInput
              onChangeText={(x) => setNumber(x)}
              placeholder="Phone Number"
              keyboardType="numeric"
              style={NewEmployeeStyles.input}
            />
          </View>
          <Text style={NewEmployeeStyles.error}>{error}</Text>
          <TouchableOpacity
            style={NewEmployeeStyles.addButton}
            onPress={() => {
              handleAddEmployee();
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={NewEmployeeStyles.addText}>Add</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewEmployee;
