import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "error",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "error";
    },

    clearNotification: (state) => {
      state.message = "";
      state.type = "error";
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
