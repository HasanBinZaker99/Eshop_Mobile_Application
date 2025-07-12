import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/products/SearchedProductsStyle";

const SearchedProduct = (props) => {
  const { productsFiltered, navigation } = props;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product Detail", { item: item });
      }}
    >
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
    </TouchableOpacity>
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

export default SearchedProduct;
