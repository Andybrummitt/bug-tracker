import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { setUserTeam } from "../../redux/user";
import PublicNavbar from "../Navbars/PublicNavbar/PublicNavbar";
import styles from "./login.module.scss";

const LoginTeam = () => {
  const inputRef = useRef(null);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth.teamAccessToken) navigate("/login");
  }, [auth]);

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post(`/api/auth/team/login`, JSON.stringify({ teamName, password }), {
        headers: { "Content-Type": "application/json" },
        Authorization: `Bearer ${auth.teamAccessToken}`,
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUserTeam(res.data?.teamName));
        setAuth((auth) => ({
          ...auth,
          teamAccessToken: res.data?.accessToken,
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
          <h1 className={styles.title}>Team Login</h1>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="teamname">
                <input
                  ref={inputRef}
                  id="teamname"
                  placeholder="Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
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
              <button type="submit">
                <span>Sign in</span>
              </button>
            </div>
            <div>
              <p>
                Aren't part of a team? <Link to="/team/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginTeam;
