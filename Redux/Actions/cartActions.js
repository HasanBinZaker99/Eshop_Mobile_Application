import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

export const addToCart = (product) => (dispatch) => {
  if (!product) {
    console.error(
      "addToCart Error: Product data is missing or invalid",
      product
    );
    return;
  }

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product,
    },
  });
};

export const removeFromCart = (product) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: product,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
