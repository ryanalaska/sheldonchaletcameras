import useAuth, { useInitializeAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  useInitializeAuth();
  const { isAuthenticated, isInitialized } = useAuth();
  if (!isAuthenticated && isInitialized) return <Navigate to="/login" replace={true} />;

  return children;
}

export default AuthGuard;
