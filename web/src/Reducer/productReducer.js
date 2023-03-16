import {
  PRODUCT_REDUCER_PRODUCT,
  ADD_PRODUCT,
  PRODUCT_REDUCER_FAIL,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  FIND_PRODUCT,
  PRODUCT_REDUCER_CART,
  FILTER_PRODUCT,
  PRODUCT_REDUCER_CART_REMOVE,
  PRODUCT_REDUCER_PRODUCT_RATING,
  PRODUCT_REDUCER_PRODUCT_RATING_REMOVE,
  PRODUCT_REDUCER_PRODUCT_RECOMMEND,
} from "../Context/constant";

export const productReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_REDUCER_PRODUCT:
      return { ...state, product: payload, productLoading: false };
    case PRODUCT_REDUCER_CART:
      return { ...state, cart: payload, productLoading: false };
    case PRODUCT_REDUCER_CART_REMOVE:
      return { ...state, cart: [], productLoading: false };
      case FILTER_PRODUCT:
      return { ...state, product: payload };
      case PRODUCT_REDUCER_PRODUCT_RATING:
        return { ...state, productLoading: false, productRating: payload };
      case PRODUCT_REDUCER_PRODUCT_RATING_REMOVE:
        const data = state.productRating.filter((value, idx) => {
          if (value._id !== payload) {
            return value;
          }
        });
        return { ...state, productLoading: false, productRating: data };
      case PRODUCT_REDUCER_PRODUCT_RECOMMEND:
        return { ...state, productRecommend: payload, productLoading: false };
    default:
      return state;
  }
};
