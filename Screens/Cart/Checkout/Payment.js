import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Picker,
} from "react-native";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your payment method</Text>
      <FlatList
        data={methods}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => setSelected(item.value)}
          >
            <Text style={styles.methodText}>{item.name}</Text>
            <View style={styles.radioCircle}>
              {selected === item.value && <View style={styles.selectedRb} />}
            </View>
          </TouchableOpacity>
        )}
      />

      {selected === 3 && (
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={card}
            onValueChange={(itemValue) => setCard(itemValue)}
            style={styles.picker}
          >
            {paymentCards.map((c) => (
              <Picker.Item key={c.name} label={c.name} value={c.name} />
            ))}
          </Picker>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Confirm"
          onPress={() => props.navigation.navigate("Confirm", { order })}
        />
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  methodText: {
    fontSize: 16,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  pickerWrapper: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: width - 40,
  },
  buttonContainer: {
    marginTop: 60,
    alignSelf: "center",
  },
});

export default Payment;
