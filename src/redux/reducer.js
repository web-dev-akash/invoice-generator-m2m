import { ADD_CUSTOMER_DETAILS, ADD_ITEMS, ERROR, LOADING } from "./actionTypes";

const initialState = {
  loading: false,
  error: false,
  invoiceNo: "",
  customer: {},
  items: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case ADD_CUSTOMER_DETAILS: {
      return {
        loading: false,
        error: false,
        ...state,
        customer: payload,
      };
    }
    case ADD_ITEMS: {
      return {
        loading: false,
        error: false,
        ...state,
        items: payload,
      };
    }
    default: {
      return state;
    }
  }
};
