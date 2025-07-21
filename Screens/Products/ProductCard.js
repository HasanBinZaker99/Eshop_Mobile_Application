import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from "react-native";
import { connect } from "react-redux";
import styles from "../../styles/products/ProductCardStyle";
var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button
            title={"Add"}
            color={"green"}
            onPress={() => {
              props.addItemToCart({ ...props });
            }}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unvailable</Text>
      )}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          product,
          quantity: 1,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
