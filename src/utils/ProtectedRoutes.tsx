import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const userData = localStorage.getItem("token");

  if (!userData) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
