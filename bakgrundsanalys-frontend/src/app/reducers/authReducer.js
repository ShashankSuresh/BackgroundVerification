import { createSlice } from "@reduxjs/toolkit";
import { READ, WRITE } from "@utils/constant";

const formatPayload = (payload) => {
  const { role = [], permissions = [] } = payload;
  const { name: userRole = "" } = role && role[0];
  const permissionsCopy = permissions;
  let rights = {};
  if (Array.isArray(permissions)) {
    permissions &&
      permissions.map((obj) => {
        const { name = "" } = obj;
        if (name.includes(WRITE)) {
          rights[name.split(`${WRITE}-`)[1]] = WRITE;
        }
        if (name.includes(READ)) {
          rights[name.split(`${READ}-`)[1]] = READ;
        }
      });
  } else {
    rights = permissions;
  }
  payload.permissionsCopy = permissionsCopy;
  payload.role = userRole;
  payload.permissions = rights;
  return payload;
};

const authSlice = createSlice({
  name: "authReducer",
  initialState: {
    isFetching: false,
    userInfo: {},
  },
  reducers: {
    fetchAuth: (state) => {
      state.isFetching = true;
    },
    storeUserInfo: (state, action) => {
      const { payload } = action;

      state.isFetching = false;
      state.userInfo = formatPayload(payload);
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
