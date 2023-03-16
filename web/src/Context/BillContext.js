import { createContext, useReducer, useEffect, useContext } from "react";
import { billReducer } from "../Reducer/billReducer";
import {
  apiUrl,
  BILL_REDUCER_CREATE_BILL,
  BILL_REDUCER_LOAD_BILL,
  UPDATE_BILL,
} from "./constant";
import axios from "axios";

export const BillContext = createContext();
const BillContextProvider = ({ children }) => {
  const [billState, dispatch] = useReducer(billReducer, {
    billLoading: true,
    bill: [],
  });

  const loadBill = async () => {
    try {
      console.log("load Data");
      let response = await axios.get(`${apiUrl}/bill/billUser`);
      dispatch({
        type: BILL_REDUCER_LOAD_BILL,
        payload: response.data.Bills,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: BILL_REDUCER_LOAD_BILL,
        payload: { billLoading: true, bill: [] },
      });
    }
  };

  const createBill = async (products, total) => {
    try {
      let response = await axios.post(`${apiUrl}/payment/`, {
        products: products,
        total: total,
      });

      if (response.data.success) {
        localStorage.removeItem("items");
        window.location = response.data.forwardLink;
      }
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: BILL_REDUCER_CREATE_BILL,
        payload: { billLoading: true, bill: [] },
      });
    }
  };

  useEffect(() => {
    loadBill();
  }, [billState.billLoading]);

  const billContextData = {
    billState,
    loadBill,
    createBill,
  };

  return (
    <BillContext.Provider value={billContextData}>
      {children}
    </BillContext.Provider>
  );
};

export default BillContextProvider;
