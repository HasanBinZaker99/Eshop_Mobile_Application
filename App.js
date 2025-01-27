import { StyleSheet, View, LogBox } from "react-native";

import ProductContainer from "./Screens/Products/ProductContainer";
import AppHeader from "./Shared/Header";
LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <ProductContainer />
    </View>
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
