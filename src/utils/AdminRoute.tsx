import { Navigate, Outlet } from "react-router-dom";

// Rutas protegidas para administradores
export const AdminRoute = () => {
  const userData = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Verificar si el usuario está logeado y tiene el rol de administrador
  if (userData && userRole === "administrador") {
    return <Outlet />;
  }

  // Si no cumple con los requisitos, redirigir al inicio
  return <Navigate to="/" />;
};
