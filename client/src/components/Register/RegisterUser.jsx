import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { setUser } from "../../redux/user";
import styles from "./register.module.scss";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.userAccessToken) {
      navigate("/");
    }
  }, [auth]);

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
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className="m-3 text-center">Register User</h1>
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
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="repeat-password">
            <input
              type="password"
              id="repeat-password"
              className="form-control"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              maxLength={15}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Already a member? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
