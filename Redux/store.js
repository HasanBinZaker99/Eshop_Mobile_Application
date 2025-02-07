import { legacy_createStore as createStore, combineReducers } from "redux";
import cartItems from "./Reducers/cartItem"; // Ensure this path is correct

// Combine reducers
const reducers = combineReducers({
  cartItems,
});

// Create Redux store without any middleware or DevTools
const store = createStore(reducers);

export default store;
