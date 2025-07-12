import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginLeft: 10,
  },
});

export default styles;
