import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
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
      <Link to="/dashboard">
        <h2 className={styles.title}>Bug - Tracker</h2>
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/dashboard">Projects</Link>
        </li>
        <li>
          <Link to="/tickets">Tickets</Link>
        </li>
        <li>
          <Link to="/account"> Manage Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
