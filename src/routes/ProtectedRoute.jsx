
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const homePath =
      user.role === "instructor"
        ? "/instructor/dashboard"
        : "/student/dashboard";

    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
