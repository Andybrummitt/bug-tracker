import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { setUser } from "../../redux/user";
import PublicNavbar from "../Navbars/PublicNavbar/PublicNavbar";
import styles from "./login.module.scss";

const LoginUser = () => {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.userAccessToken) navigate("/dashboard");
  }, [auth]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
        setError(err.response.data);
      });
  };

  return (
    <div>
      <PublicNavbar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Login User</h1>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <h4>Demo User Login:</h4>
              <p>Username: DemoUser</p>
              <p>Password: 123456</p>
            </div>
            <div>
              <label htmlFor="username">
                <input
                  ref={inputRef}
                  type="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={15}
                />
              </label>
            </div>
            <div className="form-outline mb-4">
              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
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
            <button type="submit">Sign in</button>
            <div>
              <p>
                Not a member? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
