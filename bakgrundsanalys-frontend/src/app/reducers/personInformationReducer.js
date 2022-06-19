import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
  name: "personInformationReducer",
  initialState: {
    personInfo: [],
  },
  reducers: {
    personInfo: (state, action) => {
      state.personInfo = action.payload;
    },
    isMultiple: (state, action) => {
      state.isMultiple = action.payload;
    },
  },
});

export const {
  actions: personInformationActions,
  reducer: personInformationReducer,
} = servicesSlice;
