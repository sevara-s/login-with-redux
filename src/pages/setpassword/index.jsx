import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Alert } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";

import logo from "../../assets/svgs/logo.svg";
import icon1 from "../../assets/svgs/facebook.svg";
import icon2 from "../../assets/svgs/google.svg";
import icon3 from "../../assets/svgs/apple.svg";
import signup from "../../assets/imgs/signup.png";

// Zod schema with confirm password validation
const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must contain at least 6 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"], // Path to show error message
  });

const SetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword(token, data.newPassword);
      setSuccess(response.message);
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <section className="section py-[20px] h-[100vh]">
      <div className="container flex flex-col gap-[20px]">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="grid grid-cols-2 gap-[25px]">
          <div className="flex flex-col justify-center items-start gap-[20px]">
            <h1 className="font-semibold text-3xl text-[#313131]">
              Set a password
            </h1>
            <p className="font-normal text-base text-[#313131] opacity-75">
              Your previous password has been reset. Please set a new password for
              your account.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[15px] w-full"
            >
              <TextField
                label="New Password"
                type="password"
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                fullWidth
              />
              <TextField
                label="Confirm New Password"
                type="password"
                {...register("confirmNewPassword")}
                error={!!errors.confirmNewPassword}
                helperText={errors.confirmNewPassword?.message}
                fullWidth
              />

              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <Button
                type="submit"
                variant="contained"
                size="large"
                className="!bg-[#515DEF]"
              >
                Set Password
              </Button>
            </form>

            <p className="text-center w-full font-normal text-sm text-[#313131] opacity-50">
              Or login with
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
          </div>

          <div className="flex justify-center items-center">
            <img src={signup} alt="Signup" className="h-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetPassword;