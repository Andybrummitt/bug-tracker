import React from "react";
import styles from "./authLayout.module.scss";

const AuthLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <div className={styles.container}>
        <ul className={styles.instructions}>
          <li>
            <span className="text-danger">1.</span> Create a Team and Users
          </li>
          <li>
            <span className="text-danger">2.</span> Add a Project
          </li>
          <li>
            <span className="text-danger">3.</span> Gain Ticket Organization!
          </li>
        </ul>
        <div className="d-flex flex-wrap">
          <WrappedComponent {...props} />
          <div className={styles.mobileExampleImg}>
            <img src="/iphone-12-screen_v2.png" alt="mobile-example" />
          </div>
          <div className={styles.desktopExample}>
            <img src="/mac-screen_v2.png" alt="desktop-example" />
          </div>
        </div>
      </div>
    );
  };
};

export default AuthLayout;
