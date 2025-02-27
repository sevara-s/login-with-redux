import axios from "axios";
import { useDispatch } from "react-redux";
import { login, signup, logout } from "../redux/auth";
import Cookies from "js-cookie";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;  

const useAuth = () => {
  const dispatch = useDispatch();

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });

      if (data.token) {
        Cookies.set("authToken", data.token, { expires: 7 }); 
        Cookies.set("userEmail", data.email, { expires: 7 });

        dispatch(login({ token: data.token, email: data.email }));
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
      const { data } = await axios.post(`${API_URL}/signup`, userData);

      if (data) {
        dispatch(signup(data));
      }

      return data;  
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logoutUser = () => {
    // Remove cookies
    Cookies.remove("authToken");
    Cookies.remove("userEmail");

    
    dispatch(logout());
  };

  const forgotPassword = async (email) => {
    try {
      const { data } = await axios.post(`${API_URL}/forgot-password`, { email });
      return data;  
    } catch (error) {
      console.error(
        "Forgot Password Error:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to send reset link"
      );
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const { data } = await axios.post(`${API_URL}/reset-password`, {
        token,
        newPassword,
      });
      return data;  
    } catch (error) {
      console.error(
        "Reset Password Error:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  };

  return { loginUser, logoutUser, registerUser, forgotPassword, resetPassword };
};

export default useAuth;