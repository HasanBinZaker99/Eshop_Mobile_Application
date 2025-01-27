import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from "react-native";

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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
  },
  badgeContainer: {
    marginHorizontal: 5,
  },
  badge: {
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "red",
    fontSize: 14,
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

export default CategoryFilter;
