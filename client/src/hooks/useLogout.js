import axios from "axios";
import { useContext } from "react"
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthProvider"
import { setUser, setUserTeam } from "../redux/user";

const useLogout = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const dispatch = useDispatch();
    let token = auth.userAccessToken;

    const logout = async () => {       
        try {
            const response = await axios.get('/api/auth/user/logout', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                withCredentials: true
                }
            });
            setAuth({});
            dispatch(setUser(''));
            dispatch(setUserTeam(''));
            console.log(response)
        }
        catch(err){ 
            console.error(err);
        }
    }
    return logout;
}

export default useLogout;