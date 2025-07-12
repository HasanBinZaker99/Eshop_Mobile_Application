import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  cartContent: {
    flex: 1,
    padding: 20,
  },
  cartTitle: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 15,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowBack: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  deleteButton: {
    width: 75,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: 75,
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
