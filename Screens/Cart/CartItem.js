import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import styles from "../../styles/Carts/CartItemStyle";

const CartItem = ({ item }) => {
  const data = item.product;

  return (
    <View style={styles.listItem}>
      <Image
        source={{
          uri: data.image
            ? data.image
            : "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        }}
        style={styles.thumbnail}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.productName}>{data.name}</Text>
      </View>
      <Text style={styles.productPrice}>${data.price}</Text>
    </View>
  );
};

export default CartItem;
