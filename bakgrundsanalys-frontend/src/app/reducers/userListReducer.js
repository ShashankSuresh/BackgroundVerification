import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userListReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchUserList: (state) => {
      state.isFetching = true;
    },
    fetchUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchUserListFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const { action: userListActions, reducer: userListReducer } =
  userListSlice;
