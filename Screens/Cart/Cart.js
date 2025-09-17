import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import {
  Box,
  Text,
  Heading,
  VStack,
  Center,
  HStack,
  Image,
  Button,
  ButtonText,
  ScrollView,
} from "@gluestack-ui/themed";
var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    total += cart.product.price;
  });
  const hasItems = props.cartItems && props.cartItems.length > 0;
  const confirmRemove = (item) => {
    const name = item?.product?.name ?? "this item";
    Alert.alert(
      "Remove item?",
      `Do you want to remove ${name} from the cart?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => props.removeFromCart(item),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Box flex={1} bg="white">
      {hasItems ? (
        <>
          <SwipeListView
            contentContainerStyle={{
              paddingHorizontal: 5,
              paddingVertical: 12,
            }}
            data={props.cartItems}
            renderItem={({ item }) => <CartItem item={item} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => confirmRemove(data.item)}
                >
                  <Icon name="trash" color={"white"} size={24} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />

          <HStack
            justifyContent="space-between"
            alignItems="center"
            bg="$backgroundLight100"
            p="$4"
            borderTopWidth={1}
            borderColor="$borderLight300"
            mt="$4"
          >
            <Text fontSize="$lg" fontWeight="bold" color="$textDark900">
              ${total}
            </Text>

            <Button
              size="md"
              variant="outline"
              action="secondary"
              onPress={() => props.clearCart()}
            >
              <ButtonText>Clear</ButtonText>
            </Button>

            <Button
              size="md"
              action="primary"
              onPress={() => props.navigation.navigate("Checkout")}
            >
              <ButtonText>Checkout</ButtonText>
            </Button>
          </HStack>
        </>
      ) : (
        <Center flex={1} px="$6">
          <VStack space="sm" alignItems="center">
            <Heading size="lg">Your cart is empty</Heading>
            <Text textAlign="center" color="$textLight500">
              Add products to your cart to get started
            </Text>
          </VStack>
        </Center>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItemsFromRedux,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#D4D4D8",
  },
  hiddenButton: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    backgroundColor: "red",
    height: "100%",
    width: 60,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
