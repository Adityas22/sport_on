// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Jika ada token
  return <Outlet />;
};

export default ProtectedRoute;
