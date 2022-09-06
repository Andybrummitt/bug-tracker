import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";
import axios from "axios";

const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ error, setError ] = useState('');
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if(auth.userAccessToken) navigate('/');
  }, [auth])

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post(
        `/api/auth/user/login`,
        JSON.stringify({ username, password }),
          {
            headers: {
              'Authorization': `Bearer ${auth.teamAccessToken}`,
              'Content-Type': "application/json",
            },
            withCredentials: true,
          }
        )
      .then((res) => {
        setAuth(auth => ({...auth, userAccessToken: res.data?.accessToken}));
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  }

  const signOut = async () => {
    await logout();
    navigate('/team/login')
  } 

  return (
    <div>
      <button onClick={signOut}>Logout of Team</button>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="username">
            <input
              type="username"
              id="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={15}
            />
          </label>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={15}
            />
          </label>
        </div>

        <div className="row mb-4">
          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
