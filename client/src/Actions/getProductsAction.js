import axios from "axios";
import { GET_PRODUCTS_DB } from "./types";

export const getProductsDB = () => {
  return async (dispath) => {
    console.log("Getting all Products from DB");
    const products = await axios.get("http://localhost:5000/produtos");
    dispath({
      type: GET_PRODUCTS_DB,
      payload: products.data,
    });
  };
};
