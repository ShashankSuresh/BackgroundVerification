import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
  name: "servicesReducer",
  initialState: {
    isFetching: false,
    servicesInfo: {},
  },
  reducers: {
    fetchServices: (state) => {
      state.isFetching = true;
    },
    servicesInfo: (state, action) => {
      state.isFetching = false;
      state.servicesInfo = action.payload;
    },
  },
});

export const { actions: servicesActions, reducer: servicesReducer } =
  servicesSlice;
