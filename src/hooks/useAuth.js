import axios from "axios";
import { useDispatch } from "react-redux";
import { login,signup } from "../redux/auth";
import Cookies from "js-cookie";

const API_URL = `${import.meta.env.VITE_API_URL}/login`;

const useAuth = () => {
  const dispatch = useDispatch();

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(API_URL, { email, password });

      if (data.token) {
        Cookies.set("authToken", data.token, { expires: 7 });
        Cookies.set("userEmail", data.email, { expires: 7 });

        dispatch(login(data));
      }

      return data;
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      const user = response.data;

      if (user) {
        dispatch(signup(user));
      }

      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logoutUser = () => {
    Cookies.remove("authToken");
    Cookies.remove("userEmail");
    dispatch(logout());
  };

  return { loginUser, logoutUser,registerUser };
};

export default useAuth;
