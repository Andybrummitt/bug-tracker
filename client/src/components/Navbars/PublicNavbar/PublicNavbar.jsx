import React from "react";
import { Link, useLocation } from "react-router-dom";
import bugTrackerLogo from "../../../images/bug-tracker-logo-black.png";
import styles from "./publicNavbar.module.scss";

const PublicNavbar = () => {
  let location = useLocation();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">
            <div className={styles.logoContainer}>
              <img src={bugTrackerLogo} alt="logo" />
            </div>
          </Link>
        </li>
        {/* IF IN LANDING PAGE DISPLAY LINKS */}
        <li>
          {location.pathname === "/" ? (
            <div className={styles.authLinks}>
              <button>
                <Link to="/team/register">Sign Up</Link>
              </button>
              <button>
                <Link to="/team/login">Log In</Link>
              </button>
            </div>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
