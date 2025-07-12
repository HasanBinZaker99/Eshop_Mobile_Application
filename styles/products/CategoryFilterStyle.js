import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
  },
  badgeContainer: {
    marginHorizontal: 5,
  },
  badge: {
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "red",
    fontSize: 14,
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

export default styles;