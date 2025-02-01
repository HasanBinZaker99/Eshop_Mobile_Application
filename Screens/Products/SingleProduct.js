import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

const SingleProduct = (props) => {
  const [item] = useState(props.route.params.item);
  const [availability] = useState("In Stock"); // Example availability text

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availability}
            </Text>
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              props.addItemToCart(item.id);
              alert(
                `${item.name} added to Cart\nGo to your cart to complete order`
              );
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  price: {
    fontSize: 24,
    color: "red",
  },
  addButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default SingleProduct;
