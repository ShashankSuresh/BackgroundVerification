import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchSearch: (state) => {
      state.isFetching = true;
    },
    fetchSearchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchSearchFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const { action: searchActions, reducer: searchReducer } = searchSlice;
