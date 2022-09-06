import axios from "axios";
import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"

const useLogout = () => {
    const { setAuth } = useContext(AuthContext);

    const logout = async () => {
        setAuth({});
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