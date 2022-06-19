import { createSlice } from "@reduxjs/toolkit";

const klarnaSlice = createSlice({
  name: "klarnaReducer",
  initialState: {
    allSSNInfo: [],
    klarnaInfo: {},
    ordersInfo: [],
  },
  reducers: {
    allSSN: (state, action) => {
      state.allSSNInfo = action.payload;
    },
    klarnaInfo: (state, action) => {
      state.klarnaInfo = action.payload;
    },
    ordersInfo: (state, action) => {
      state.ordersInfo = action.payload;
    },
  },
});

export const { actions: klarnaActions, reducer: klarnaReducer } = klarnaSlice;
