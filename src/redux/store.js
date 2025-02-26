import { configureStore } from "@reduxjs/tocolkit";
import authReducer from "./auth";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
