import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "orderDetailsReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchOrderDetails: (state) => {
      state.isFetching = true;
    },
    fetchOrderDetailsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchOrderDetailsFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const { action: orderDetailsActions, reducer: orderDetailsReducer } =
  orderDetailsSlice;
