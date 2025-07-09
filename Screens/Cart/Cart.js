import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import * as actions from "../../Redux/Actions/cartActions";
import { SwipeListView } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  cartContent: {
    flex: 1,
    padding: 20,
  },
  cartTitle: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 15,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowBack: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  deleteButton: {
    width: 75,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: 75,
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
