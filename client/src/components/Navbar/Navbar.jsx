import React from "react";
import { AiFillBug } from "react-icons/ai";
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
        <div className={styles.userInfoContainer}>
          {username ? (
            <>
              <p>Logged in as {username}</p>
              <Link to="/account"> Manage Account</Link>
            </>
          ) : team ? (
            <>
              <p>Team: {team}</p>
              <Link to="/account">Manage Account</Link>
            </>
          ) : null}
        </div>
      <ul className={styles.navLinks}>
        <li>
          {username ? (
            <Link to="/">
              <div className={styles.title}>
                <AiFillBug />
                <span>Bug - Tracker</span>
              </div>
            </Link>
          ) : (
            <div className={styles.title}>
              <AiFillBug />
            </div>
          )}
        </li>
        {team ? (
          <li>{username ? <Link to="/tickets">Tickets</Link> : null}</li>
        ) : null}
        <li>{team ? <button onClick={signOut}>Sign Out</button> : null}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
