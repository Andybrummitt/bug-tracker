import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import useLogout from "../../hooks/useLogout";
import styles from "./manageAccount.module.scss";

const ManageAccount = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [error, setError] = useState("");

  const apiCall = useAxiosWithAuth();

  const signOut = async () => {
    await logout();
    navigate("/team/login");
  };

  const deleteTeam = () => {
    setError("");

    apiCall({
      url: `/api/auth/team`,
      method: `delete`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => signOut())
      .catch((err) => {
        setError(err);
      });
  };

  const deleteUser = () => {
    setError("");

    apiCall({
      url: `/api/auth/user`,
      method: `delete`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => signOut())
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className="text-center m-2">Manage Account</h2>
      {error && <p className="text-danger text-center m-3">{error}</p>}
      <div className={styles.container}>
        <h4 className="text-center m-2">Delete account</h4>
        <p className="text-warning text-center m-2">
          <strong>Warning:</strong>This action cannot be undone! This user will
          be deleted.
        </p>
        <button className="btn btn-danger m-2" onClick={deleteUser}>
          Delete User
        </button>
      </div>
      <div className={styles.container}>
        <h4 className="text-center m-2">Delete Team</h4>
        <p className="text-warning text-center m-2">
          <strong>Warning:</strong>This action cannot be undone! All of the the
          team's users, tickets and projects will be deleted!
        </p>
        <button className="btn btn-danger m-2" onClick={deleteTeam}>
          Delete Team
        </button>
      </div>
    </div>
  );
};

export default ManageAccount;
