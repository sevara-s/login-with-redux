import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

import logo from "../../assets/svgs/logo.svg";
import icon1 from "../../assets/svgs/facebook.svg";
import icon2 from "../../assets/svgs/google.svg";
import icon3 from "../../assets/svgs/apple.svg";
import signup from "../../assets/imgs/signup.png";

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
      const { confirmPassword, ...userData } = data;  
      await registerUser(userData);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section className="section py-[20px]">
        <div className="container flex flex-col gap-[25px]">
          <Link to={"/"}>
            <img  src={logo} alt="" />
          </Link>

          {/* img and sign up */}

          <div className="img_sign_up grid grid-cols-2 gap-[20px] items-center ">
            <div className="flex justify-center items-center">
              <img src={signup} className="h-[600px]" />
            </div>

            {/* sign up side */}
            <div className="sign_up flex flex-col justify-center items-start gap-[25px] ">
              <h1 className="font-semibold text-3xl text-[#313131]">Sign up</h1>
              <p className="font-normal text-base text-[#313131] opacity-75">
                Let’s get you all set up so you can access your personal
                account.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" w-full flex flex-col gap-[20px]"
              >
                {/* first name and last name */}
                <div className="grid grid-cols-2 gap-[20px]">
                  <TextField
                    fullWidth
                    id="firstname"
                    name="firstname"
                    label="First name"
                    variant="outlined"
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.password?.message}
                    size="small"
                    required
                  />
                  <TextField
                    fullWidth
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    variant="outlined"
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    required
                    size="small"
                  />
                </div>
                {/* email and num*/}
                <div className="grid grid-cols-2 gap-[20px]">
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    size="small"
                    required
                  />
                  <TextField
                    fullWidth
                    id="number"
                    name="number"
                    label="Phone Number"
                    variant="outlined"
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    required
                    size="small"
                  />
                </div>

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  size="small"
                  required
                />
                <TextField
                  fullWidth
                  id="confirm"
                  name="confirm"
                  label="Confirm password"
                  variant="outlined"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  required
                  size="small"
                />

                <div className="remember flex items-center gap-[5px]">
                  <input id="me1" type="checkbox" />
                  <label
                    htmlFor="me1"
                    className="font-[500] text-[14px] text-[#313131]"
                  >
                    I agree all the
                    <span className="font-semibold text-[#ff8682] cursor-pointer">
                      Terms
                    </span>
                    and{" "}
                    <span className="font-semibold text-[#ff8682] cursor-pointer">
                      Privacy Policies
                    </span>
                  </label>
                </div>
                <Button
                  className="!bg-[#515DEF]"
                  size="large"
                  type="submit"
                  variant="container"
                >
                  Create account
                </Button>
              </form>

              <p className="font-medium text-sm text-center w-full text-[#313131]">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-[#ff8682]">
                  {" "}
                  Login
                </Link>
                <p className="text-center w-full font-normal text-sm text-[#313131] opacity-50">
                  Or Sign up with
                </p>
                <div className="grid grid-cols-3 gap-[10px] w-full">
                  <Button variant="outlined" className="!py-[10px]">
                    <img src={icon1} alt="Facebook" />
                  </Button>
                  <Button variant="outlined" className="!py-[10px]">
                    <img src={icon2} alt="Google" />
                  </Button>
                  <Button variant="outlined" className="!py-[10px]">
                    <img src={icon3} alt="Apple" />
                  </Button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;
