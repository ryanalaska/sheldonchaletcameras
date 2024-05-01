import useAuth, { useInitializeAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

function GuestGuard({ children }) {
  useInitializeAuth();
  const { isAuthenticated, isInitialized } = useAuth();
  if (isAuthenticated && isInitialized) return <Navigate to="/home" replace={true} />;

  return children;
}

export default GuestGuard;
