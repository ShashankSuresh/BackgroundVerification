import { createSlice } from "@reduxjs/toolkit";

const assignmentDetailsSlice = createSlice({
  name: "assignmentDetailsReducer",
  initialState: {
    isFetching: true,
    error: undefined,
  },
  reducers: {
    fetchAssignmentDetails: (state) => {
      state.isFetching = true;
    },
    fetchAssignmentDetailsSuccess: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    fetchAssignmentDetailsFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  action: assignmentDetailsActions,
  reducer: assignmentDetailsReducer,
} = assignmentDetailsSlice;
