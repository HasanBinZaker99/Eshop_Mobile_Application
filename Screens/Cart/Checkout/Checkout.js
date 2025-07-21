import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import { connect } from "react-redux";

const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.sub);
    } else {
      props.navigation.navigate("Cart");
      console.log("U.N.L, Redirecting to cart");
    }

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    if (!phone || !address || !city || !zip || !country) {
      alert("Please fill out all required fields.");
      return;
    }

    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      user,
      zip,
    };

    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Shipping Address</Text>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Shipping Address 1"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Shipping Address 2"
              value={address2}
              onChangeText={(text) => setAddress2(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={(text) => setCity(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              value={zip}
              keyboardType="numeric"
              onChangeText={(text) => setZip(text)}
            />

            <Picker
              selectedValue={country}
              onValueChange={(value) => setCountry(value)}
              style={styles.picker}
            >
              {countries.map((c) => (
                <Picker.Item key={c.code} label={c.name} value={c.name} />
              ))}
            </Picker>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.buttonContainerFixed}>
        <TouchableOpacity style={styles.confirmButton} onPress={checkOut}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    paddingBottom: 100,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  buttonContainerFixed: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
