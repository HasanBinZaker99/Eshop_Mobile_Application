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

/* 
Notes:
createStore → builds the store (the big data box).
combineReducers → if we have multiple reducers (cart, user, products), we combine them into one.
applyMiddleware → allows extra tools (like async actions) to work with Redux.

Thunk is a helper that lets us write async code in Redux (like fetching products from an API).
rootReducer (all the rules for updating state).
applyMiddleware(thunk) (so async actions are allowed).
*/
