import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";
import styles from "../../styles/products/ProductListStyle";

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

export default ProductList;
