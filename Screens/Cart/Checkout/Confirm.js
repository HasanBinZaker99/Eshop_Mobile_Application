import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Text,
  Image,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const finalOrder = props.route.params;
  const [productUpdate, setProductUpdate] = useState([]);

  useEffect(() => {
    if (finalOrder) {
      getProducts(finalOrder);
    }
    return () => {
      setProductUpdate([]);
    };
  }, [props]);

  const getProducts = (x) => {
    const order = x.order.order;
    if (order) {
      const requests = order.orderItems.map((cart) =>
        axios.get(`${baseURL}products/${cart.product}`)
      );
      Promise.all(requests)
        .then((responses) => {
          const products = responses.map((res) => res.data);
          setProductUpdate(products);
        })
        .catch((e) => console.log(e));
    }
  };

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("CartScreen");
          }, 500);
        }
      })
      .catch(() => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>Confirm Order</Text>
        {props.route.params && (
          <View style={styles.orderBox}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={styles.addressBox}>
              <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
              <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
              <Text>City: {finalOrder.order.order.city}</Text>
              <Text>Zip Code: {finalOrder.order.order.zip}</Text>
              <Text>Country: {finalOrder.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {productUpdate.map((item) => (
              <View style={styles.productRow} key={item._id}>
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>$ {item.price}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Place Order" onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    minHeight: height,
    padding: 8,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    margin: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: "center",
  },
  orderBox: {
    borderWidth: 1,
    borderColor: "orange",
    padding: 10,
    width: "100%",
  },
  addressBox: {
    marginVertical: 8,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: "cover",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    color: "green",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
