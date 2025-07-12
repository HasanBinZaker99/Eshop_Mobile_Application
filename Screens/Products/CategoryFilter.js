import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from "react-native";
import styles from "../../styles/products/CategoryFilterStyle";
const CategoryFilter = (props) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {/* Static Dummy Categories */}
      <TouchableOpacity
        key="dummy1"
        onPress={() => {
          props.CategoryFilter("all");
          props.setActive(-1);
        }}
        style={styles.badgeContainer}
      >
        <View
          style={[
            styles.badge,
            props.active === -1 ? styles.active : styles.inactive,
          ]}
        >
          <Text style={styles.badgeText}>All</Text>
        </View>
      </TouchableOpacity>

      {/* Dynamic Categories */}
      {props.categories &&
        props.categories.map((item, index) => (
          <TouchableOpacity
            key={item._id.$oid}
            onPress={() => {
              props.CategoryFilter(item._id.$oid);
              props.setActive(index + 1); // Adjusting active index
            }}
            style={styles.badgeContainer}
          >
            <View
              style={[
                styles.badge,
                props.active === index + 1 ? styles.active : styles.inactive,
              ]}
            >
              <Text style={styles.badgeText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default CategoryFilter;
