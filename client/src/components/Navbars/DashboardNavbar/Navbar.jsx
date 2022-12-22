import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";
import '../../_variables.scss';
import bugTrackerLogo from "../../../images/bug-tracker-logo-black.png";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">
            <div className={styles.logoContainer}>
              <img src={bugTrackerLogo} alt="logo" />
            </div>
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/dashboard">Projects</NavLink>
        </li>
        <li>
          <NavLink to="/tickets">Tickets</NavLink>
        </li>
        <li>
          <NavLink to="/account">Account</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
