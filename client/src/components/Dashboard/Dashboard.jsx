import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";
import Projects from "../Projects/Projects";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if(!auth.userAccessToken){
      logout();
      navigate('/team/login');
    }
  }, [auth])

  return (
    <main className={styles.main}>
      <div>Dashboard</div>
      <Projects />
    </main>
  );
};

export default Dashboard;
