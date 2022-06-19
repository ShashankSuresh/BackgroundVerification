import { createSlice } from "@reduxjs/toolkit";

const orderSummarySlice = createSlice({
  name: "orderSummaryReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchOrderSummary: (state) => {
      state.isFetching = true;
    },
    fetchOrderSummarySuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchOrderSummaryFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const { action: orderSummaryActions, reducer: orderSummaryReducer } =
  orderSummarySlice;
