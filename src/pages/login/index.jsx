import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Login } from "@mui/icons-material";
import { TextField, Button, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { z } from "zod";
import { login } from "../../redux/auth";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
};
export default Login;
