import { Navigate, Outlet } from "react-router-dom";

//rutas protegidas

export const AdminRoute = () => {
  const userData = localStorage.getItem("token");
  if (userData) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};
