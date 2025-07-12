import React, { useEffect, useState } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import * as actions from "../../Redux/Actions/cartActions";
import { SwipeListView } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/Carts/CartStyle";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState(props.cartItems);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartItems(props.cartItems);

    let newTotal = 0;
    props.cartItems.forEach((cart) => {
      newTotal += cart.product.price;
    });
    setTotal(newTotal);
  }, [props.cartItems]);

  const handleDelete = (productId) => {
    props.removeFromCart({ product: { _id: productId } });
  };

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(data.item.product._id)}
      >
        <Ionicons name="trash" color="white" size={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {cartItems && cartItems.length > 0 ? (
        <>
          <View style={styles.cartContent}>
            <Text style={styles.cartTitle}>Cart</Text>

            <SwipeListView
              data={cartItems}
              keyExtractor={(item) => item.product._id}
              renderItem={({ item }) => <CartItem item={item} />}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75} // Left swipe
              rightOpenValue={-75} // Right swipe
              stopLeftSwipe={75}
              stopRightSwipe={-75}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
            />
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.bottomRow}>
              <Text style={styles.productPrice}>
                Total: ${total.toFixed(2)}
              </Text>
              <Button
                title="Clear"
                color="red"
                onPress={() => props.clearCart()}
              />
              <Button
                title="Checkout"
                color="green"
                onPress={() => props.navigation.navigate("Checkout")}
              />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.empty}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
