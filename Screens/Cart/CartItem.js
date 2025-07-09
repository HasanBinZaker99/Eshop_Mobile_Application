import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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

export default CartItem;
