import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Load from .env

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.get(API_URL);
      const foundUser = data.find(user => user.email === email && user.password === password);
      
      if (!foundUser) throw new Error("Invalid email or password");
      
      setUser(foundUser);
      return foundUser;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const signupUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.get(API_URL);
      const existingUser = data.find(user => user.email === userData.email);
      
      if (existingUser) throw new Error("Email already in use");

      const response = await axios.post(API_URL, userData);
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const forgetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.get(API_URL);
      const user = data.find(user => user.email === email);
      
      if (!user) throw new Error("Email not found");

      const resetToken = Math.floor(100000 + Math.random() * 900000);
      await axios.put(`${API_URL}/${user.id}`, { resetToken });

      return resetToken;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setNewPassword = async (email, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.get(API_URL);
      const user = data.find(user => user.email === email);
      
      if (!user) throw new Error("User not found");

      await axios.put(`${API_URL}/${user.id}`, { password: newPassword, resetToken: null });
      return "Password reset successfully";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, signupUser, forgetPassword, setNewPassword, user, loading, error };
};

export default useAuth;
