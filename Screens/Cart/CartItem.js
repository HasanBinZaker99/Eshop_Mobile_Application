import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { connect } from "react-redux";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  console.log("Cart Items:", props.cartItems); // Debugging

  const [cartItems, setCartItems] = useState(props.cartItems);

  useEffect(() => {
    setCartItems(props.cartItems);
  }, [props.cartItems]);

  return (
    <View style={styles.container}>
      {cartItems && cartItems.length > 0 ? (
        <View>
          <Text
            style={{ alignSelf: "center", fontSize: 24, fontWeight: "bold" }}
          >
            Cart
          </Text>
          <FlatList
            data={props.cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Image
                  source={{
                    uri: item.product.image
                      ? item.product.image
                      : "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
                  }}
                  style={styles.thumbnail}
                />
                <View style={styles.body}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <Text style={styles.productPrice}>${item.product.price}</Text>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  body: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "green",
  },
});

const mapStateToProps = (state) => ({
  cartItems: state.cart ? state.cart.cartItems : [], // ✅ Safe fallback
});

export default connect(mapStateToProps, null)(Cart);
