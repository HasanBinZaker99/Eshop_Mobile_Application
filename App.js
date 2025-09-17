import React from "react";
import { LogBox } from "react-native";

import AppHeader from "./Shared/Header";
import Main from "./Navigators/Main";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";

// ✅ Gluestack UI (official packages)
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Provider store={store}>
        <Auth>
          <NavigationContainer>
            <AppHeader />
            <Main />
            <Toast />
          </NavigationContainer>
        </Auth>
      </Provider>
    </GluestackUIProvider>
  );
}
