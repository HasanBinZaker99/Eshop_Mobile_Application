import { LogBox } from "react-native";

import ProductContainer from "./Screens/Products/ProductContainer";
import AppHeader from "./Shared/Header";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";
import Toast from "react-native-toast-message";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
// Context API
import Auth from "./Context/store/Auth";

// Navigatiors

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <AppHeader />
          <Main />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
