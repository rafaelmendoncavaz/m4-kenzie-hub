import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/sign-in/SignIn";
import { SignUp } from "../pages/sign-up/SignUp";
import { Home } from "../pages/home/Home";
import { ProtectedRoutes } from "./ProtectedRoutes";

export function MainRoutes() {

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<ProtectedRoutes />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}