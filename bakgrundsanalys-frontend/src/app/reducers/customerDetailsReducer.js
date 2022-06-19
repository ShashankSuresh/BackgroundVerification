import { createSlice } from "@reduxjs/toolkit";

const customerDetailsSlice = createSlice({
  name: "customerDetailsReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchCustomerDetails: (state) => {
      state.isFetching = true;
    },
    fetchCustomerDetailsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchCustomerDetailsFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  action: customerDetailsActions,
  reducer: customerDetailsReducer,
} = customerDetailsSlice;
