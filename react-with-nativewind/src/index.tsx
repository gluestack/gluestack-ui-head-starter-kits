import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashScreen from "./routes/SplashScreen";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";
import OtpVerification from "./routes/OtpVerification";
import CreatePassword from "./routes/CreatePassword";
import {GluestackUIProvider} from './components/gluestack-ui-provider';
// import { useColorScheme } from "nativewind";
// import { GluestackUIProvider } from "@gluestack-ui/themed";
// import { config } from "./gluestack-ui.config";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <SplashScreen />,
//   },
//   {
//     path: "/login",
//     element: <SignIn />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />,
//   },
//   {
//     path: "/verify-otp",
//     element: <OtpVerification />,
//   },
//   {
//     path: "/create-password",
//     element: <CreatePassword />,
//   },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// const {colorScheme}=useColorScheme()
root.render(
  <>
    {/* <GluestackUIProvider config={config}> */}
    <GluestackUIProvider mode='light'>
      {/* <Box className='bg-red-500 w-20 h-20'></Box> */}
      <>TEST</>
      {/* <RouterProvider router={router} /> */}
    {/* </GluestackUIProvider> */}
    </GluestackUIProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
