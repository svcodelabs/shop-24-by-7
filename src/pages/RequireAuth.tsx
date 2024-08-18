import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { FaSpinner } from "react-icons/fa";

const RequireAuth = () => {
  const { auth, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="absolute top-[50%] left-[50%]">
        <FaSpinner size={36} className="text-purple-500" />
      </div>
    );
  }

  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
