import { StyleSheet, Text, View } from "react-native";

import Main from "./src/Main";
import { UserProvider } from "./src/context/UserContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { ProductsProvider } from "./src/context/ProductsContext";
import { ActionsModalProvider } from "./src/context/ActionsContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProductsProvider>
        <PortalProvider>
          <UserProvider>
            <ActionsModalProvider>
              <Main />
            </ActionsModalProvider>
          </UserProvider>
        </PortalProvider>
      </ProductsProvider>
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
