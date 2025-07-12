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
import styles from "../../styles/products/SingleProductStyle";

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

export default SingleProduct;
