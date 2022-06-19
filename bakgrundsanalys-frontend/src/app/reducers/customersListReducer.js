import { createSlice } from "@reduxjs/toolkit";

const customerListSlice = createSlice({
  name: "customersListReducer",
  initialState: {
    isFetching: false,
    customersList: { meta: { total: 0 }, data: [] },
  },
  reducers: {
    fetchCustomerList: (state) => {
      state.isFetching = true;
    },
    customersInfo: (state, action) => {
      state.isFetching = false;
      state.customersList = action.payload;
    },
  },
});

export const { actions: customerListActions, reducer: customersListReducer } =
  customerListSlice;
