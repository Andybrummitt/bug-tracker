import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const { username, team } = useSelector((state) => state.user);

  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/team/login");
  };

  return (
    <nav className={styles.nav}>
      <li>{username ? <Link to="/">Bug-Tracker</Link> : <p>Bug-Tracker</p>}</li>
      <li>{username ? <Link to="/tickets">Tickets</Link> : null}</li>
      <li>
        <div className={styles.userInfoContainer}>
          {username ? (
            <p>
              Logged in as <Link to="/account">{username}</Link>
            </p>
          ) : null}
          <p>
            Team: <Link to="/account">{team}</Link>
          </p>
        </div>
        <button onClick={signOut}>Sign Out</button>
      </li>
    </nav>
  );
};

export default Navbar;
