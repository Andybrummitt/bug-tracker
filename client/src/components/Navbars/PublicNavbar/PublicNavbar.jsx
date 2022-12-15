import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./publicNavbar.module.scss";

const PublicNavbar = () => {
  let location = useLocation();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <span>Bug-Tracker</span>
        </li>
        {/* IF IN LANDING PAGE DISPLAY LINKS */}
        <li>
          {location.pathname === "/" ? (
            <div className={styles.authLinks}>
              <button>
                <a href="/team/register">SIGN UP</a>
              </button>
              <button>
                <a href="/team/login">LOG IN</a>
              </button>
            </div>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
