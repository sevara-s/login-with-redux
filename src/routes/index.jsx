import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login";
import Signup from "../pages/signup";

const router = createBrowserRouter([{ path: "/", element: <LoginPage /> },{path:"/register",element:<Signup/>}]);

export default router;
