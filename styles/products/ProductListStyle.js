import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  touchableContainer: {
    width: "50%",
    padding: 10, // Add spacing between cards
  },
  cardContainer: {
    width: width / 2 - 20, // Adjust width to include padding
    backgroundColor: "#fff", // Add a clean background
    borderRadius: 10, // Round corners
    overflow: "hidden", // Clip content to the rounded corners
    elevation: 2, // Add shadow for depth
  },
});

export default styles;