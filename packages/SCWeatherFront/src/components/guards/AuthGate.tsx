import useAuth, { useInitializeAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function AuthGate() {

  const {isAuthenticated, isInitialized} = useAuth()
  useInitializeAuth();

  if(!isInitialized)
    return <></>

  return (
    <>
      {!isAuthenticated ? <Navigate to="/login" replace={true} /> : <Navigate to="/home" replace={true} />}
    </>
  );
}

export default AuthGate;
