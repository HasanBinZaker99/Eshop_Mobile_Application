import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import cartItems from "./Reducers/cartItem";

const rootReducer = combineReducers({
  cartItems,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
