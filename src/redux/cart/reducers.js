import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  CHANGE_CART_ITEM,
  SET_CART,
} from "./actions";

const initState = {
  cart: [],
};

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newItem = action.payload;
      let newCart = [];
      if (state.cart.findIndex((item) => item.id === newItem.id) !== -1) {
        newCart = state.cart.map((item) => {
          if (item.id === newItem.id) {
            const quantity = item.quantity + newItem.quantity;
            return { ...item, quantity };
          } else return item;
        });
      } else {
        newCart = [...state.cart, newItem];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return {
        cart: newCart,
      };
    }
    case REMOVE_FROM_CART: {
      const targetId = action.payload.id;
      const newCart = state.cart.filter(
        (item) => parseInt(item.id) !== targetId
      );

      localStorage.setItem("cart", JSON.stringify(newCart));
      return {
        cart: newCart,
      };
    }
    case EMPTY_CART: {
      const newCart = [];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }

    case CHANGE_CART_ITEM: {
      const newItem = action.payload;
      const newCart = state.cart.map((item) => {
        if (parseInt(item.id) === newItem.id) {
          return newItem;
        } else return item;
      });

      localStorage.setItem("cart", JSON.stringify(newCart));
      return {
        cart: newCart,
      };
    }

    case SET_CART: {
      return {
        cart: action.payload,
      };
    }

    default:
      return state;
  }
};
