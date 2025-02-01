import { LogBox } from "react-native";

import ProductContainer from "./Screens/Products/ProductContainer";
import AppHeader from "./Shared/Header";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <NavigationContainer>
      <AppHeader />
      <Main />
    </NavigationContainer>
  );
}
