import { StyleSheet, Text, View } from "react-native";

import Main from "./src/Main";
import { UserProvider } from "./src/context/UserContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <UserProvider>
          <Main />
        </UserProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
