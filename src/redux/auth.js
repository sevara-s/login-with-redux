import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthed = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthed = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
