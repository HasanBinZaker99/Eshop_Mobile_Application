import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import AuthGlobal from "../../../Context/store/AuthGlobal";

const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {
  const insets = useSafeAreaInsets();
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState([]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setOrderItems(props.cartItems || []);
    if (context.stateUser?.isAuthenticated) {
      setUser(context.stateUser.user.sub);
    } else {
      props.navigation.navigate("Cart");
    }
  }, []);

  const openCountryPicker = () => setShowCountryModal(true);
  const closeCountryPicker = () => setShowCountryModal(false);

  const checkOut = () => {
    if (!phone || !address || !city || !zip || !country) {
      alert("Please fill out all required fields.");
      return;
    }
    const order = {
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
    props.navigation.navigate("Payment", { order });
  };

  const bottomSpacer = insets.bottom + 120;

  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraHeight={220}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomSpacer },
        ]}
        style={styles.root}
      >
        <View style={styles.headerGap} />
        <Text style={styles.sectionTitle}>Shipping Address</Text>

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#b9b9b9"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Shipping Address 1"
            placeholderTextColor="#b9b9b9"
            value={address}
            onChangeText={setAddress}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Shipping Address 2"
            placeholderTextColor="#b9b9b9"
            value={address2}
            onChangeText={setAddress2}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#b9b9b9"
            value={city}
            onChangeText={setCity}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            placeholderTextColor="#b9b9b9"
            value={zip}
            onChangeText={setZip}
            keyboardType="number-pad"
            returnKeyType="done"
          />

          {/* Country trigger link */}
          <TouchableOpacity
            onPress={openCountryPicker}
            style={styles.countryLinkWrap}
          >
            <Text style={styles.countryLink}>
              {country ? country : "Select your country"}{" "}
              <Text style={styles.downArrow}>▾</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {/* Confirm button (small, centered) */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity onPress={checkOut} style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Country picker as a modal "sheet" */}
      <Modal
        visible={showCountryModal}
        transparent
        animationType="slide"
        onRequestClose={closeCountryPicker}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[styles.modalSheet, { paddingBottom: insets.bottom + 10 }]}
          >
            <Text style={styles.modalTitle}>Choose Country</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={country}
                onValueChange={(v) => setCountry(v)}
                itemStyle={
                  Platform.OS === "ios" ? styles.pickerItemIOS : undefined
                }
              >
                {countries.map((c) => (
                  <Picker.Item key={c.code} label={c.name} value={c.name} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              onPress={closeCountryPicker}
              style={styles.modalDoneBtn}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const ORANGE = "#f3a026"; // input border color
const BG = "#F2F3F5";

const styles = StyleSheet.create({
  root: {
    backgroundColor: BG,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGap: {
    height: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,
  },
  formCard: {
    backgroundColor: BG,
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: ORANGE,
    borderWidth: 2,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    // soft shadow like in the screenshot
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  countryLinkWrap: {
    alignItems: "center",
    marginTop: 6,
  },
  countryLink: {
    color: "#1E6FE8",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  downArrow: {
    fontSize: 16,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  confirmBtn: {
    backgroundColor: "#2fa968",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  // Modal "bottom sheet" styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  pickerWrap: {
    maxHeight: 260,
  },
  pickerItemIOS: {
    fontSize: 16,
  },
  modalDoneBtn: {
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 6,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#1E6FE8",
  },
  modalDoneText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

export default connect(mapStateToProps)(Checkout);
