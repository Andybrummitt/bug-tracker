import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { setUserTeam } from "../../redux/user";

const RegisterTeam = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordIsValid = (password) => {
    if (password.length >= 6 && password.length <= 15) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (auth.teamAccessToken) navigate("/login");
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!passwordIsValid(password)) {
      setError("Passwords must be between 6 and 15 characters.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }
    axios
      .post(`/api/auth/team/register`, JSON.stringify({ teamName, password }), {
        headers: { "Content-Type": "application/json" },
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
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <div>
      <h1>Register Team</h1>
      {error && <p className="text-danger">{error}</p>}
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
            Already part of a team? <Link to="/team/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterTeam;
