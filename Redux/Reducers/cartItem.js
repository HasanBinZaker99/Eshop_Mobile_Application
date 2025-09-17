import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

const cartItemsFromReducer = (state = [], action) => {
  // state — the current cart items (array)

  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    /*
Take the old cart (state).
Add the new product (action.payload).
Return a new array with both.
*/
    case REMOVE_FROM_CART:
      return state.filter(
        (cartItemsFromReducer) => cartItemsFromReducer !== action.payload
      );
    /*
Go through every item in the cart.
Keep everything except the one that matches action.payload.
*/
    case CLEAR_CART:
      return (state = []);
  }
  return state;
  /*
If the action type doesn’t match any case → do nothing.
Just return the current cart unchanged.
*/
};

export default cartItemsFromReducer;
