import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { z } from "zod";
import { login, logout } from "../../redux/auth";
import { Link, useNavigate } from "react-router-dom";

// img/svg import
import logo from "../../assets/svgs/logo.svg";
import icon1 from "../../assets/svgs/facebook.svg";
import icon2 from "../../assets/svgs/google.svg";
import icon3 from "../../assets/svgs/apple.svg";
import loginimg from "../../assets/imgs/login.png";

const loginScheme = z.object({
  email: z.string().email("wrong email address"),
  password: z.string().min(6, "password must contain at least 6 characteres"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginScheme) });

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section className="section py-[20px]">
        <div className="container flex flex-col gap-[50px]">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>

          <div className="login_and_img grid grid-cols-2 gap-[25px]">
            <div className="login_side flex flex-col gap-[20px]">
              <h1 className="font-semibold text-3xl text-[#313131]">Login</h1>
              <p className="font-normal text-base text-[#313131] opacity-75">
                Login to access your travelwise account
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[15px] w-full"
              >
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <div className="flex justify-between items-center gap-[10px]">
                  <div className="remember flex items-center gap-[5px]">
                    <input id="me1" type="checkbox" />
                    <label htmlFor="me1 font-[500] text-[14px] text-[#313131]">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to={"forget"}
                    className="font-[500] text-[14px] text-[#ff8682]"
                  >
                    Forgot Password
                  </Link>
                </div>
                <Button
                  variant="contained"
                  size="large"
                  className="!bg-[#515DEF]"
                  type="submit"
                >
                  Login
                </Button>

                <p className="font-medium text-sm text-center w-full text-[#313131]">
                  Don’t have an account?{" "}
                  <Link to="/register" className="font-semibold text-[#ff8682]">
                    Sign up
                  </Link>
                </p>
                <p className="text-center w-full font-normal text-sm text-[#313131] opacity-50">
                  {" "}
                  Or login with
                </p>
                <div className="grid grid-cols-3 gap-[10px] w-full">
                  <Button variant="outlined" className="!py-[10px]">
                    <img src={icon1} />
                  </Button>

                  <Button variant="outlined" className="!py-[10px]">
                    <img src={icon2} />
                  </Button>

                  <Button variant="outlined" className="!py-[10px]">
                    <img src={icon3} />
                  </Button>
                </div>
              </form>
            </div>

            <div className="flex justify-center items-center">
              <img src={loginimg} alt="img" className="h-[580px]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LoginPage;
