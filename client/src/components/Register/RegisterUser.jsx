import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { setUser } from "../../redux/user";
import PublicNavbar from "../Navbars/PublicNavbar/PublicNavbar";
import styles from "./register.module.scss";

const RegisterUser = () => {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.userAccessToken) {
      navigate("/dashboard");
    }
  }, [auth]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const IsValid = (input) => {
    if (input.length >= 6 && input.length <= 15) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!IsValid(password)) {
      setError("Passwords must be between 6 and 15 characters.");
      return;
    }
    if (!IsValid(username)) {
      setError("Usernames must be between 6 and 15 characters.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }
    axios
      .post(`/api/auth/user/register`, JSON.stringify({ username, password }), {
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
          <h1>Register User</h1>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <div>
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
            <div>
              <label htmlFor="repeat-password">
                <input
                  type="password"
                  id="repeat-password"
                  placeholder="Repeat Password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  maxLength={15}
                />
              </label>
            </div>
            <button type="submit">Sign in</button>
            <div>
              <p>
                Already a member? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
