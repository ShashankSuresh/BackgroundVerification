import { createSlice } from "@reduxjs/toolkit";

const orderListSlice = createSlice({
  name: "orderListReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchOrderList: (state) => {
      state.isFetching = true;
    },
    fetchOrderListSuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchOrderListFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const { action: orderListSActions, reducer: orderListReducer } =
  orderListSlice;
