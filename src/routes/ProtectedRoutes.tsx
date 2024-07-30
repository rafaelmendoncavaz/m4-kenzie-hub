import { Navigate, Outlet } from "react-router-dom";
import { useAPIStore } from "../context/context";

export function ProtectedRoutes() {

  const { user } = useAPIStore((store) => store)

  return user ? <Outlet /> : <Navigate to="/" />
}