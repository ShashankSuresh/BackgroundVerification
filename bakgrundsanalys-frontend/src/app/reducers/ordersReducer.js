import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "ordersReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchOrders: (state) => {
      state.isFetching = true;
    },
    fetchOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchOrdersFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const { action: ordersActions, reducer: ordersReducer } = ordersSlice;
