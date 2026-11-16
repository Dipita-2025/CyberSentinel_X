import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: { username: "Jhon Doe", role: "Analyst" },
  isLogin: false,
};

const Authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isLogin = true;
    },
    logout: (state, action) => {
      state.userData = null;
      state.isLogin = false;
    },
  },
});

export const { login, logout } = Authslice.actions;
export default Authslice.reducer;
