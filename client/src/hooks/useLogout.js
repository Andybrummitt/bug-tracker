import axios from "axios";
import { useContext } from "react"
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthProvider"
import { setUser, setUserTeam } from "../redux/user";

const useLogout = () => {
    const { setAuth } = useContext(AuthContext);
    const dispatch = useDispatch();

    const logout = async () => {
        setAuth({});
        dispatch(setUser(''));
        dispatch(setUserTeam(''));
        
        try {
            const response = await axios('/api/auth/user/logout', {
                withCredentials: true
            });
        }
        catch(err){
            console.error(err);
        }
    }
    return logout;
}

export default useLogout;