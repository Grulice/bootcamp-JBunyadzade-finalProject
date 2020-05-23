import { combineReducers } from "redux";
import { commonReducer } from "./common/reducers";
import { authReducer } from "./auth/reducers";
import { cartReducer } from "./cart/reducers";

export default combineReducers({
  common: commonReducer,
  auth: authReducer,
  cart: cartReducer,
});
