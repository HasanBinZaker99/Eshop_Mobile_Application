import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: "#eaeaea",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },
  productDescription: {
    color: "#757575",
    fontSize: 14,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noProductText: {
    fontSize: 16,
    color: "#757575",
  },
});

export default styles;
