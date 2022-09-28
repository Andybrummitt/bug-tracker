import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { setUser } from "../../redux/user";
import styles from "./login.module.scss";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.userAccessToken) navigate("/");
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post(`/api/auth/user/login`, JSON.stringify({ username, password }), {
        headers: {
          Authorization: `Bearer ${auth.teamAccessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUser(res.data?.username));
        setAuth((auth) => ({
          ...auth,
          userAccessToken: res.data?.accessToken,
        }));
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className="m-3 text-center">Login User</h1>
      {error && <p className="mt-2 mb-2 text-center text-danger">{error}</p>}
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
