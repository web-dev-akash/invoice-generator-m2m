import { ADD_CUSTOMER_DETAILS, ADD_ITEMS, ERROR, LOADING } from "./actionTypes";

export const getLoading = () => ({
  type: LOADING,
});

export const getError = () => ({
  type: ERROR,
});

export const setUserDetails = (payload) => ({
  type: ADD_CUSTOMER_DETAILS,
  payload,
});

export const addItems = (payload) => ({
  type: ADD_ITEMS,
  payload,
});
