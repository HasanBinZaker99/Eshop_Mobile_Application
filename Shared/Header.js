import React from "react";
import { Image, SafeAreaView, View } from "react-native";
import styles from "../styles/Shared/HeaderStyle";

const AppHeader = () => {
  return (
    <SafeAreaView style={styles.AppHeader}>
      <Image
        source={require("../assets/Logo.png")}
        resizeMode="contain"
        style={{ height: 50 }}
      />
    </SafeAreaView>
  );
};

export default AppHeader;
