import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("userEmail") || null,
  token: Cookies.get("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.email;
      state.token = action.payload.token;
      Cookies.set("authToken", action.payload.token, { expires: 7 });
      Cookies.set("userEmail", action.payload.email, { expires: 7 });
    },
    signup: (state, action) => {
      state.user = action.payload.email;
      state.token = action.payload.token;
      Cookies.set("authToken", action.payload.token, { expires: 7 });
      Cookies.set("userEmail", action.payload.email, { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("authToken");
      Cookies.remove("userEmail");
    },
  },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;

