import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import cartItems from "./Reducers/cartItem"; // ✅ Ensure correct path

const rootReducer = combineReducers({
  cartItems,
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // ✅ No middleware, plain Redux store
export default store;
