import axios from "axios";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthProvider";
import { setUser, setUserTeam } from "../redux/user";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.post("/api/auth/user/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, userAccessToken: response.data.accessToken };
    });
    dispatch(setUser(response.data.username));
    dispatch(setUserTeam(response.data.userTeam));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
