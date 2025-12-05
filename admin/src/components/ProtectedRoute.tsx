import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.auth);

  // If token exists, user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render nested routes
};

export default ProtectedRoute;
