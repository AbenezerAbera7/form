import { View, Text } from "react-native";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface userContextType {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  showOnboarding: boolean;
  setShowOnboarding: Dispatch<SetStateAction<boolean>>;
  businessDetails: any;
  setBusinessDetails: Dispatch<SetStateAction<any>>;
  employees: any;
  setEmployees: Dispatch<SetStateAction<any>>;
  newEmployeeModalVisible: boolean;
  setNewEmployeeModalVisible: Dispatch<SetStateAction<boolean>>;
  employeePermissions: any;
  setEmployeePermissions: Dispatch<SetStateAction<any>>;
}

const defaultUserContext = {
  user: null,
  setUser: () => {},
  showOnboarding: false,
  setShowOnboarding: () => {},
  businessDetails: null,
  setBusinessDetails: () => {},
  employees: [],
  setEmployees: () => {},
  newEmployeeModalVisible: false,
  setNewEmployeeModalVisible: () => {},
  employeePermissions: {},
  setEmployeePermissions: () => {},
} as userContextType;

const UserContext = createContext(defaultUserContext);

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({});
  const [employees, setEmployees] = useState([]);
  const [newEmployeeModalVisible, setNewEmployeeModalVisible] = useState(false);
  const [employeePermissions, setEmployeePermissions] = useState({});
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        showOnboarding,
        setShowOnboarding,
        businessDetails,
        setBusinessDetails,
        employees,
        setEmployees,
        newEmployeeModalVisible,
        setNewEmployeeModalVisible,
        employeePermissions,
        setEmployeePermissions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
