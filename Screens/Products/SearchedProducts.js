import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
} from "react-native";

const { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productsFiltered } = props;

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        style={styles.avatar}
        source={{
          uri: item.image
            ? item.image
            : "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        }}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {productsFiltered.length > 0 ? (
        <FlatList
          data={productsFiltered}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.$oid}
        />
      ) : (
        <View style={styles.center}>
          <Text style={styles.noProductText}>
            No Products match the selected criteria
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 10, // Add spacing
    backgroundColor: "#f9f9f9", // Light background for contrast
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 15, // Add vertical spacing
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // Fully circular
    marginRight: 15,
    backgroundColor: "#eaeaea", // Placeholder background
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

export default SearchedProduct;
