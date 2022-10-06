import React, { useContext, useState } from "react";
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
      <h2 className="text-center m-3">Projects</h2>
      <p className="text-success text-center">
        {successMessage && successMessage}
      </p>
      <p className="text-danger text-center">{error && error.message}</p>
      <div className="table-responsive">
        <table className={`table table-bordered table-dark ${styles.table}`}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return (
                <tr key={uuidv4()}>
                  <th scope="row">{project.title}</th>
                  <td>{project.description}</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary mr-1"
                        onClick={() => handleViewProject(project)}
                      >
                        View Project
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProject(project)}
                      >
                        Delete Project
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
