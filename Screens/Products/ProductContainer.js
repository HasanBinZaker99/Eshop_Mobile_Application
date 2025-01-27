import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import { ScrollView } from "react-native";

var { height } = Dimensions.get("window");
const data = require("../../assets/data/products.json");
const productCategories = require("../../assets/data/categories.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productCategories);
    setActive(-1);
    setInitialState(data);
    setProductsCtg(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = (text) => {
    setSearchText(text); // Update the search text state
    if (text.trim() === "") {
      setProductsFiltered(products); // Reset to all products
      setFocus(false); // Exit search mode when input is empty
    } else {
      setProductsFiltered(
        products.filter((i) =>
          i.name.toLowerCase().includes(text.toLowerCase())
        )
      );
      setFocus(true); // Stay in search mode when there's text
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setProductsFiltered(products);
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    if (ctg === "all") {
      setProductsCtg(initialState);
      setActive(-1);
    } else {
      setProductsCtg(products.filter((i) => i.category.$oid === ctg));
      setActive(ctg);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3", paddingTop: 50 }}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onFocus={() => setFocus(true)} // Enter search mode
          onChangeText={searchProduct} // Filter products as user types
        />
        {focus && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close" size={20} color="gray" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {focus ? (
        <View>
          <SearchedProduct productsFiltered={productsFiltered} />
        </View>
      ) : (
        <ScrollView>
          {/* Banner */}
          <View>
            <Banner />
          </View>

          {/* Category Filter */}
          <View>
            <CategoryFilter
              categories={categories}
              CategoryFilter={changeCtg}
              active={active}
              setActive={setActive}
            />
          </View>

          {/* Products List */}
          {productsCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {productsCtg.map((item) => {
                return <ProductList key={item._id.$oid} item={item} />;
              })}
            </View>
          ) : (
            <View style={[styles.center, { height: height / 2 }]}>
              <Text>No products found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#f3f3f3",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: "black",
  },
  icon: {
    paddingHorizontal: 5,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
