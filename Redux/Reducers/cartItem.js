import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

const cartItems = (state = [], action) => {
  // state — the current cart items (array)

  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.find(
        (cartItem) => cartItem.product._id === action.payload.product._id
      );

      if (existingItem) {
        return state.map((cartItem) =>
          cartItem.product._id === action.payload.product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...state, { product: action.payload.product, quantity: 1 }];
      }

    case REMOVE_FROM_CART:
      return state.filter(
        (cartItem) => cartItem.product._id !== action.payload.product._id
      );

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};

export default cartItems;
