import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";


// img/svg import
import logo from "../../assets/svgs/logo.svg";
import icon1 from "../../assets/svgs/facebook.svg";
import icon2 from "../../assets/svgs/google.svg";
import icon3 from "../../assets/svgs/apple.svg";
import loginimg from "../../assets/imgs/login.png";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser } = useAuth();
  const [error, setError] = useState("");
  const { loading, error: authError } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data.email, data.password);
      if (user) {
        navigate("/"); 
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <section className="section py-[20px]">
      <div className="container flex flex-col gap-[50px]">
        <Link to="/">
          <img src={logo} alt="Travelwise Logo" />
        </Link>

        <div className="login_and_img grid grid-cols-2 gap-[25px]">
          <div className="login_side flex flex-col gap-[20px]">
            <h1 className="font-semibold text-3xl text-[#313131]">Login</h1>
            <p className="font-normal text-base text-[#313131] opacity-75">
              Login to access your Travelwise account
            </p>

            {error && <Alert severity="error">{error}</Alert>}
            {authError && <Alert severity="error">{authError}</Alert>}

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
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />

              <div className="flex justify-between items-center gap-[10px]">
                <div className="remember flex items-center gap-[5px]">
                  <input id="me1" type="checkbox" />
                  <label
                    htmlFor="me1"
                    className="font-[500] text-[14px] text-[#313131]"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forget"
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
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <p className="font-medium text-sm text-center w-full text-[#313131]">
                Don’t have an account?{" "}
                <Link to="/register" className="font-semibold text-[#ff8682]">
                  Sign up
                </Link>
              </p>

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
            </form>
          </div>

          <div className="flex justify-center items-center">
            <img src={loginimg} alt="Login" className="h-[580px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;