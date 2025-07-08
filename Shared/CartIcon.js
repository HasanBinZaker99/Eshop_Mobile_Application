import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <View style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </View>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    height: 25,
    borderRadius: 12.5, // to make it circular
    backgroundColor: "red", // you can change this to the color you need
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white", // ensure the text is visible on the red background
  },
});

export default connect(mapStateToProps)(CartIcon);
