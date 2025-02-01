import React from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;

  return (
    <TouchableOpacity
      style={styles.touchableContainer}
      onPress={() =>
        props.navigation.navigate("Product Detail", { item: item })
      }
    >
      <View style={styles.cardContainer}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

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

export default ProductList;
