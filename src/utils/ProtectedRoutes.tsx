import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { getUserData } from "../redux/userSlice";

export const ProtectedRoutes = () => {
  const userData = useAppSelector(getUserData);

  if (!userData.authToken) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
