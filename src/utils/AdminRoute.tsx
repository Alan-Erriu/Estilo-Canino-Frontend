import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { getUserData } from "../redux/userSlice";
//rutas protegidas

export const AdminRoute = () => {
  const userData = useAppSelector(getUserData);

  if (userData.role === "administrador") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};
