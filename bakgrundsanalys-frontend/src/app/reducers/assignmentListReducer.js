import { createSlice } from "@reduxjs/toolkit";

const assignmentListSlice = createSlice({
  name: "assignmentListReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchAssignmentList: (state) => {
      state.isFetching = true;
    },
    fetchAssignmentListSuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchAssignmentListFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const { action: assignmentListActions, reducer: assignmentListReducer } =
  assignmentListSlice;
