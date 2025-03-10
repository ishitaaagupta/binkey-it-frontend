import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchPage from "../pages/SearchPage";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerfication";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/userMenuMobile"
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path : 'login',
        element : <Login/>
    },
    {
        path : "register",
        element : <Register/>
      },
      {
          path : "forgot-password",
          element : <ForgotPassword/>
      },
      {
        path : "verification-otp",
        element : <OtpVerification/>
    },
    {
        path : "reset-password",
        element : <ResetPassword/>
    },
    {
      path : "user",
      element : <UserMenuMobile/>
  },
  {
    path : "dashboard",
    element : <Dashboard/>,
    children : [
        {
            path : "profile",
            element : <Profile/>
        },
        {
          path:"MyOrders",
          element:<MyOrders/>
        }
      ]
    },
    ],
  },
]);

export default router;
