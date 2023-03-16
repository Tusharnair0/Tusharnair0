import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

import { productReducer } from "../Reducer/productReducer";
import {
  PRODUCT_REDUCER_PRODUCT,
  apiUrl,
  PRODUCT_REDUCER_CART,
  PRODUCT_REDUCER_CART_REMOVE,
  FILTER_PRODUCT,
  PRODUCT_REDUCER_PRODUCT_RATING,
  PRODUCT_REDUCER_PRODUCT_RATING_REMOVE,
  PRODUCT_REDUCER_PRODUCT_RECOMMEND,

} from "./constant";

export const ProductContext = createContext();
const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(productReducer, {
    productSelect: null,
    productLoading: true,
    product: [],
    cart: [],
    productRating: [],
    productRecommend: [],
  });

  const getProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/`);
      if (response.data.success) {
        dispatch({
          type: PRODUCT_REDUCER_PRODUCT,
          payload: response.data.Products,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const filterProducts = async (query) => {
    const response = await axios.post(`${apiUrl}/products/filter/${query}`);
    if (response.data.success) {
      console.log(response.data.Products);
      dispatch({
        type: FILTER_PRODUCT,
        payload: response.data.Products,
      });
    }
  };

  const getSingleProduct = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/products/${id}`);
      if (response.data.success) {
        dispatch({
          type: PRODUCT_REDUCER_PRODUCT,
          payload: response.data.Products,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const ratingProduct = async (product_id, score) => {
    try {
      const response = await axios.post(`${apiUrl}/ratings/`, {
        product_id: product_id,
        score: score,
      });
      if (response.data.success) {
        dispatch({
          type: PRODUCT_REDUCER_PRODUCT_RATING_REMOVE,
          payload: product_id,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const getRecommendProduct = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/products/recommend/${id}`);
      if (response.data.success) {
        dispatch({
          type: PRODUCT_REDUCER_PRODUCT_RECOMMEND,
          payload: response.data.Products,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const getNotRatingProduct = async () => {
    // not-rating
    try {
      const response = await axios.get(`${apiUrl}/products/rating/not-rating`);
      if (response.data.success) {
        dispatch({
          type: PRODUCT_REDUCER_PRODUCT_RATING,
          payload: response.data.Products,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const getCartProduct = async (items) => {
    console.log("cartProduct");
    try {
      const response = await axios.post(`${apiUrl}/products/items`, {
        items: items,
      });
      if (response.data.success) {
        console.log(response.data.Products);
        dispatch({
          type: PRODUCT_REDUCER_CART,
          payload: response.data.Products,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  const removeCart = async () => {
    dispatch({
      type: PRODUCT_REDUCER_CART_REMOVE,
    });
  };

  useEffect(() => {
    getProducts();
  }, [productState.productLoading]);

  const productContextData = {
    productState,
    getProducts,
    getSingleProduct,
    getCartProduct,
    removeCart,
    filterProducts,
    getNotRatingProduct,
    ratingProduct,
    getRecommendProduct,
  };

  //return provider
  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
