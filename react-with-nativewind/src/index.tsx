import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashScreen from "./routes/SplashScreen";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";
import OtpVerification from "./routes/OtpVerification";
import CreatePassword from "./routes/CreatePassword";
import { Provider } from "./provider";
import { Box } from "./components/box";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  // {
  //   path: "/login",
  //   element: <SignIn />,
  // },
  // {
  //   path: "/signup",
  //   element: <SignUp />,
  // },
  // {
  //   path: "/forgot-password",
  //   element: <ForgotPassword />,
  // },
  // {
  //   path: "/verify-otp",
  //   element: <OtpVerification />,
  // },
  // {
  //   path: "/create-password",
  //   element: <CreatePassword />,
  // },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
);
