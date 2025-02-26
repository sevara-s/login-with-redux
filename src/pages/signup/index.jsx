import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";
import {Link,useNavigate} from "react-router-dom"
import { Button, TextField } from "@mui/material";

import logo from "../../assets/svgs/logo.svg";
import icon1 from "../../assets/svgs/facebook.svg";
import icon2 from "../../assets/svgs/google.svg";
import icon3 from "../../assets/svgs/apple.svg";
import loginimg from "../../assets/imgs/login.png";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const Signup = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data; // Remove confirmPassword before sending
      await registerUser(userData);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return(
    <>
    
    
    </>
  )
};
export default Signup;
