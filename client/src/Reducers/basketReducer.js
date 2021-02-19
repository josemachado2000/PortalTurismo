import {
  ADD_PRODUCT_BASKET,
  GET_NUMBERS_BASKET,
  REMOVE_PRODUCT_BASKET,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  CLEAR_BASKET,
  GET_PRODUCTS_DB,
} from "../Actions/types";
import { getProductsDB } from "../Actions/getProductsAction";
import { defineState } from "redux-localstore";

const iniState = {
  basketNumbers: 0,
  products: getProductsDB,
  cart: [],
};

const initialState = defineState(iniState)("basketState");

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_DB:
      return { ...state, products: action.payload };
    case ADD_PRODUCT_BASKET:
      const prod = state.products.find(
        (prod) => prod.idProduto === action.payload.idProduto
      );
      const inCart = state.cart.find((prod) =>
        prod.idProduto === action.payload.idProduto ? true : false
      );
      return {
        ...state,
        basketNumbers: state.basketNumbers + 1,
        cart: inCart
          ? state.cart.map((prod) =>
              prod.idProduto === action.payload.idProduto
                ? { ...prod, quantity: prod.quantity + 1 }
                : prod
            )
          : [...state.cart, { ...prod, quantity: 1 }],
        // cartCost: state.cartCost + state.products[action.payload].preco,
        // products: {
        //   ...state.products,
        //   [action.payload]: addQuantity,
        // },
      };
    case GET_NUMBERS_BASKET:
      return {
        ...state,
      };
    case REMOVE_PRODUCT_BASKET:
      return {
        ...state,
        basketNumbers: state.basketNumbers - action.payload.quantity,
        cart: state.cart.filter(
          (prod) => prod.idProduto !== action.payload.idProduto
        ),
      };
    case DECREASE_PRODUCT_QUANTITY:
      if (action.payload.quantity === 0) {
        return {
          ...state,
          cart: state.cart.map((prod) =>
            prod.idProduto === action.payload.idProduto
              ? { ...prod, quantity: (action.payload.quantity = 0) }
              : prod
          ),
        };
      } else {
        return {
          ...state,
          basketNumbers: state.basketNumbers - 1,
          cart: state.cart.map((prod) =>
            prod.idProduto === action.payload.idProduto
              ? { ...prod, quantity: (action.payload.quantity -= 1) }
              : prod
          ),
        };
      }
    case INCREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        basketNumbers: state.basketNumbers + 1,
        cart: state.cart.map((prod) =>
          prod.idProduto === action.payload.idProduto
            ? { ...prod, quantity: (action.payload.quantity += 1) }
            : prod
        ),
      };
    case CLEAR_BASKET:
      return {
        ...state,
        basketNumbers: 0,
        cart: [],
      };
    default:
      return state;
  }
};
