import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const RequireTeamAuth = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (
        auth?.teamAccessToken ? <Outlet /> : <Navigate to="/team/login" state={{ from: location }} replace />
    )
}

export default RequireTeamAuth;