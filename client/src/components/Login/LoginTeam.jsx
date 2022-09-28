import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useDispatch } from 'react-redux';
import { setUserTeam } from "../../redux/user"; 
import styles from "./login.module.scss";

const LoginTeam = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if(auth.teamAccessToken) navigate('/login');
  }, [auth])

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post(`/api/auth/team/login`, JSON.stringify({ teamName, password }),
      {
        headers: { 'Content-Type': 'application/json' },
        "Authorization": `Bearer ${auth.teamAccessToken}`,
        withCredentials: true
      })
      .then((res) => {
        dispatch(setUserTeam(res.data?.teamName))
        setAuth(auth => ({...auth, teamAccessToken: res.data?.accessToken}));
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className="m-3 text-center">Team Login</h1>
      {error && <p className="mt-2 mb-2 text-center text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="teamname">
            <input
              id="teamname"
              className="form-control"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
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

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Aren't part of a team? <Link to="/team/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginTeam;