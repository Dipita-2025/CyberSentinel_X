import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  permissions: [],
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.permissions = action.payload.permissions ?? [];
      state.isAuthenticated = true;
      state.status = "succeeded";
      state.error = null;
    },

    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },

    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },

    setAuthError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },

    logout: (state) => {
      state.user = null;
      state.permissions = [];
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  setPermissions,
  setAuthStatus,
  setAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
