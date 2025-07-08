import { legacy_createStore as createStore, combineReducers } from "redux";
import cartItems from "./Reducers/cartItem"; // ✅ Ensure correct path

const reducers = combineReducers({
  cartItems: cartItems, // ✅ Match this with mapStateToProps in Cart.js
});

const store = createStore(reducers); // ✅ No middleware, plain Redux store
export default store;
