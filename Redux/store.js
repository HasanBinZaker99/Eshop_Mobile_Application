import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import cartItemsFromReducer from "./Reducers/cartItem";

const rootReducer = combineReducers({
  cartItemsFromRedux: cartItemsFromReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
