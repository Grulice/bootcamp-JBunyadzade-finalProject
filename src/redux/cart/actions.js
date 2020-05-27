export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const EMPTY_CART = "EMPTY_CART";
export const CHANGE_CART_ITEM = "CHANGE_CART_ITEM";
export const SET_CART = "SET_CART";

export const addToCart = (id, quantity, price) => {
  return {
    type: ADD_TO_CART,
    payload: { id, quantity, price },
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { id },
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export const changeCartItem = (id, quantity, price) => {
  return {
    type: CHANGE_CART_ITEM,
    payload: { id, quantity, price },
  };
};

export const setCart = (cart) => {
  return {
    type: SET_CART,
    payload: cart,
  };
};
