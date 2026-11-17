import { createSlice } from "@reduxjs/toolkit";

const savedToken =
  typeof window === "undefined"
    ? null
    : window.localStorage.getItem("accessToken");

const initialState = {
  userData: null,
  token: savedToken,
  isLogin: Boolean(savedToken),
};

const Authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = {
        username: action.payload.username,
        role: action.payload.role,
      };
      state.token = action.payload.access_token;
      state.isLogin = true;
    },
    setCurrentUser: (state, action) => {
      state.userData = {
        username: action.payload.username,
        role: action.payload.role,
      };
      state.isLogin = true;
    },
    logout: (state) => {
      state.userData = null;
      state.token = null;
      state.isLogin = false;
    },
  },
});

export const { login, setCurrentUser, logout } = Authslice.actions;
export default Authslice.reducer;
