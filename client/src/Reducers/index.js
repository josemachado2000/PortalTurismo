import { combineReducers } from "redux";
import basketReducer from "./basketReducer";
// import productsReducer from "./productsReducer";

export default combineReducers({
  // products: productsReducer,
  basketState: basketReducer,
});
