import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Alert } from "@mui/material";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
// img/svg import
import logo from "../../assets/svgs/logo.svg";
import icon1 from "../../assets/svgs/facebook.svg";
import icon2 from "../../assets/svgs/google.svg";
import icon3 from "../../assets/svgs/apple.svg";
import forget from "../../assets/imgs/forget.png";

const forgetScheme = z.object({
  email: z.string().email("invalid email address"),
});

const ForgetPassword = () => {
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgetScheme) });

  const onSubmit = async (data) => {
    try {
      const response = await forgotPassword(data.email);
      setError(response.message);
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <section className="section py-[20px]">
      <div className="container flex flex-col gap-[20px]">
        <Link to={"/"}>
          {" "}
          <img src={logo} alt="" />
        </Link>
        <div className="reset_img grid grid-cols-2 gap-[20px]">
          <div className="flex flex-col justify-center items-start gap-[20px]">
            <Link
              to={"/login"}
              className="font-medium text-sm text-[#313131] flex justify-center items-center gap-[4px]"
            >
              <ArrowBack className="text-[10px]" />
              Back to login
            </Link>

            <h1 className="font-semibold text-3xl text-[#313131]">
              Forgot your password?
            </h1>
            <p className="font-normal text-base text-[#313131] opacity-75">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[15px] w-full"
            >
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <Button
                type="submit"
                variant="contained"
                size="large"
                className="!bg-[#515DEF]"
              >
                Submit
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
            <img src={forget} alt="img" className="h-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ForgetPassword;
