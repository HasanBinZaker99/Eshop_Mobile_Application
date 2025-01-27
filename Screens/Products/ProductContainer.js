import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
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
    setProductsFiltered(data); // Initially display all products
    setFocus(false);
    setCategories(productCategories);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = (text) => {
    setSearchText(text); // Update the searchText state
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
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category.$oid === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3", paddingTop: 50 }}>
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
        <View>
          <View>
            <Banner />
          </View>
          <View>
            <CategoryFilter
              categories={categories}
              CategoryFilter={changeCtg}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
          </View>
          <FlatList
            keyboardShouldPersistTaps="handled"
            numColumns={2}
            data={products}
            renderItem={({ item }) => <ProductList key={item.id} item={item} />}
            keyExtractor={(item) => item.name}
          />
        </View>
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: "black",
  },
  icon: {
    paddingHorizontal: 5,
  },
  container: {
    marginTop: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ProductContainer;
