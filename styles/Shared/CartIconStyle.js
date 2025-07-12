import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  badge: {
    width: 25,
    height: 25,
    borderRadius: 12.5, // to make it circular
    backgroundColor: "red", // you can change this to the color you need
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white", // ensure the text is visible on the red background
  },
});

export default styles;
