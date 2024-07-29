import { Navigate, Outlet } from "react-router-dom";
import { user } from "../schema/schema";

export function ProtectedRoutes() {
  return user ? <Outlet /> : <Navigate to="/" />
}