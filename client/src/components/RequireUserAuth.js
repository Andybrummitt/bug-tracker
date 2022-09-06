import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const RequireUserAuth = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (
        auth?.userAccessToken ? <Outlet /> : <Navigate to="/user/login" state={{ from: location }} replace />
    )
}

export default RequireUserAuth;