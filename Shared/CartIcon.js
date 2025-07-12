import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../styles/Shared/CartIconStyle";

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

export default connect(mapStateToProps)(CartIcon);
