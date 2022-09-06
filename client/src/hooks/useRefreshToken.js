import axios from "axios";
import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"

const useRefreshToken = () => {
    const {setAuth} = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.post('/api/auth/user/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {...prev, userAccessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;