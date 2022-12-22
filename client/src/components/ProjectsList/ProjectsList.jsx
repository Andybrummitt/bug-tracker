import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import styles from "./projectsList.module.scss";

const ProjectsList = ({ projects, setProjects }) => {
  const [error, setError] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");
  const apiCall = useAxiosWithAuth();

  const navigate = useNavigate();

  const handleViewProject = (project) => {
    navigate(`/${project.title}`);
  };

  const deleteProject = (project) => {
    setSuccessMessage("");
    setError("");
    apiCall({
      url: `/api/projects/${project._id}`,
      method: `delete`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        const projectId = res.data;
        setProjects((projects) =>
          projects.filter((project) => project._id !== projectId)
        );
        setSuccessMessage("Project Deleted");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      <h1 className="text-center-padded">Projects</h1>
      <p>{successMessage && successMessage}</p>
      <p>{error && error.message}</p>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Project</th>
              <th scope="col">View</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return (
                <tr key={uuidv4()}>
                  <td>{project.title}</td>
                  <td>
                    <div>
                      <button onClick={() => handleViewProject(project)}>
                        Open
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className={styles.deleteButtonContainer}>
                      <button onClick={() => deleteProject(project)}>
                        &nbsp;X&nbsp;
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsList;
