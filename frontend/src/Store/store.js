import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import notificationReducer from "./Slice/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
});

export default store;
