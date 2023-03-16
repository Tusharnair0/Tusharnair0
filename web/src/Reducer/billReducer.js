import {
  BILL_REDUCER_LOAD_BILL,
  BILL_REDUCER_CREATE_BILL,
} from "../Context/constant";

export const billReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case BILL_REDUCER_LOAD_BILL:
      return { ...state, bill: payload, billLoading: false };
      case BILL_REDUCER_CREATE_BILL:
        console.log(state);
        const billList = state.bill || [];
        const list = billList.push(payload);
        return { ...state, bill: list, billLoading: false };
    default:
      return state;
  }
};
