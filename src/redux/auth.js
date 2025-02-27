import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = { email: action.payload.email };
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    signup(state, action) {
      state.user = action.payload;
      state.isAuthenticated = false;  
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { login, signup, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
