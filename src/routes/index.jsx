import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import Signup from "../pages/signup";
import ForgetPassword from "../pages/forgetpassword";
import SetPassword from "../pages/setpassword";
import PrivateRoute from "../private";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />{" "}
      </PrivateRoute>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Signup /> },
  { path: "/forget", element: <ForgetPassword /> },
  { path: "/set", element: <SetPassword /> },
]);

export default router;
