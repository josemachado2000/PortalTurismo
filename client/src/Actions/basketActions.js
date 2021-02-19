import {
  ADD_PRODUCT_BASKET,
  GET_NUMBERS_BASKET,
  REMOVE_PRODUCT_BASKET,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  CLEAR_BASKET,
} from "./types";

export const getNumbers = () => {
  return (dispath) => {
    console.log("Getting all Basket Numbers");
    dispath({
      type: GET_NUMBERS_BASKET,
    });
  };
};

export const addBasket = (product) => {
  console.log(product);
  return (dispath) => {
    console.log("Adding Product to Basket");
    dispath({
      type: ADD_PRODUCT_BASKET,
      payload: product,
    });
  };
};

export const removeProductBasket = (product) => {
  console.log(product);
  return (dispath) => {
    console.log("Removing Product from Basket");
    dispath({
      type: REMOVE_PRODUCT_BASKET,
      payload: product,
    });
  };
};

export const adjustProductQuantity = (product, action) => {
  console.log(product, action);
  return (dispath) => {
    console.log("Adjusting Product Quantity");
    dispath({
      type:
        action === "DECREASE"
          ? DECREASE_PRODUCT_QUANTITY
          : INCREASE_PRODUCT_QUANTITY,
      payload: product,
    });
  };
};

export const clearBasket = () => {
  return (dispath) => {
    console.log("Empty basket");
    dispath({
      type: CLEAR_BASKET,
    });
  };
};
