import { PUT_LOGIN_DATA, REMOVE_LOGIN_DATA } from "./actions";

const initState = {
  username: "",
  token: "",
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case PUT_LOGIN_DATA: {
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
      };
    }
    case REMOVE_LOGIN_DATA: {
      return {
        ...state,
        username: "",
        token: "",
      };
    }

    default:
      return state;
  }
};
