import { LogBox } from "react-native";

import ProductContainer from "./Screens/Products/ProductContainer";
import AppHeader from "./Shared/Header";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppHeader />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
